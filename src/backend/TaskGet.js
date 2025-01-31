import {db} from './firebaseConfig.js'
import { collection, getDocs, query, where } from "firebase/firestore";

export const fetchTasksWithTeam = async (company, uid = null, complete) => {
  try {
    const tasksCollectionRef = collection(db, company);

    // Pobierz wszystkie dokumenty z głównej kolekcji spełniające warunek "complete"
    const filteredQuery = query(tasksCollectionRef, where("complete", "==", complete));
    const tasksSnapshot = await getDocs(filteredQuery);

    let tasks = [];

    for (const doc of tasksSnapshot.docs) {
      const task = { id: doc.id, ...doc.data() };
      const teamCollectionRef = collection(db, `${company}/${task.id}/team`);

      // Pobierz całą podkolekcję "team"
      const teamSnapshot = await getDocs(teamCollectionRef);
      const team = teamSnapshot.docs.map(memberDoc => ({
        id: memberDoc.id,
        ...memberDoc.data(),
      }));

      // Jeśli podano `uid`, filtruj zadania na podstawie obecności użytkownika w `team`
      if (!uid || team.some(member => member.id === uid)) {
        task.team = team; // Dodaj pełną podkolekcję "team" do zadania
        tasks.push(task);
      }
    }

    // Posortuj zadania według deadline
    tasks.sort((a, b) => (a.deadline > b.deadline ? 1 : -1));

    return tasks;
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
    throw error;
  }
};

