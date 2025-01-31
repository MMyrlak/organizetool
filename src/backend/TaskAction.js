import {db} from './firebaseConfig';
import { collection, deleteDoc, doc, setDoc, getDocs, getDoc, updateDoc} from "firebase/firestore";

export const TaskAddAction = async (name, deadline, description, team, taskId, company) => {
    try {
        // Referencja do zadania
        const taskRef = taskId 
            ? doc(db, `${company}`, taskId) 
            : doc(collection(db, `${company}`));

        // Zapisanie lub aktualizacja zadania
        await setDoc(taskRef, {
            name: name,
            description: description,
            deadline: deadline,
            complete: false
        });

        // Pobranie obecnych członków zespołu w bazie danych
        const teamCollectionRef = collection(db, `${company}/${taskRef.id}/team`);
        const currentTeamSnapshot = await getDocs(teamCollectionRef);

        // Przekształcenie snapshotu na listę ID obecnych członków
        const currentTeamIds = currentTeamSnapshot.docs.map(doc => doc.id);

        // Dodawanie lub aktualizacja członków zespołu
        const newTeamIds = team.map(member => member.id);
        for (const member of team) {
            const teamRef = doc(db, `${company}/${taskRef.id}/team`, member.id);
            await setDoc(teamRef, { ...member, complete: false });
        }

        // Usuwanie członków zespołu, którzy nie są już na liście
        for (const currentId of currentTeamIds) {
            if (!newTeamIds.includes(currentId)) {
                const teamRefToDelete = doc(db, `${company}/${taskRef.id}/team`, currentId);
                await deleteDoc(teamRefToDelete);
            }
        }
    } catch (error) {
        console.error("Błąd podczas dodawania, aktualizacji lub usuwania członków zespołu: ", error);
    }
};

export const deleteTaskAction = async (id, company) => {
    const taskRef = doc(db, company, id);
    const teamCollectionRef = collection(db, company, id, 'team');

    try {
        // Pobieranie i usuwanie dokumentów z podkolekcji 'team'
        const teamDocsSnapshot = await getDocs(teamCollectionRef);
        const deletePromises = teamDocsSnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        // Usuwanie głównego dokumentu po usunięciu podkolekcji
        await deleteDoc(taskRef);
        window.location.reload();
    } catch (error) {
        console.error("Error deleting task and subcollection: ", error);
    }
}

export const acceptMemberTast = async (company, id, uid) => {
    const taskRef = doc(db, company, id, 'team', uid);
    try {
        const taskkDocSnap = await getDoc(taskRef);
        const memberCompleteStatus = !taskkDocSnap.data().complete;
        await updateDoc(taskRef, {complete: memberCompleteStatus});
        return true;
    }catch (error){
        console.error("Error : ", error);
        return false;
    }
}

export const acceptFullTask = async (company, id) => {
    const taskRef = doc(db, company, id);
    try {
        await updateDoc(taskRef, {complete: true});
        return true
    }catch (error){
        console.error("Error : ", error);
        return false;
    }
}

export const returnFullTask = async (company, id) => {
    const taskRef = doc(db, company, id);
    try {
        await updateDoc(taskRef, {complete: false});
        return true
    }catch (error){
        console.error("Error : ", error);
        return false;
    }
}