import {db, firebaseConfig, app} from './firebaseConfig.js'
import { getDocs, 
        setDoc, 
        doc, 
        getDoc, 
        collection, 
        query, 
        where, 
        updateDoc, 
        deleteDoc  } from "firebase/firestore";
import { initializeApp } from '@firebase/app'
import { getAuth, 
        onAuthStateChanged, 
        createUserWithEmailAndPassword, 
        signOut, 
        signInWithEmailAndPassword, 
        deleteUser, 
        updateEmail, 
        sendEmailVerification,
        reauthenticateWithCredential, 
        EmailAuthProvider,
        updatePassword} from "firebase/auth";
export const loginUser = async (login, password) => {
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, login, password);
        return !!userCredential.user?.uid;
    } catch (error) {
        console.error("Login error:", error.code, error.message);
        return false;
    }
};
export const logoutUser = async () => {
    const auth = getAuth(app);
    signOut(auth).then(() => {
        return true;
      }).catch((error) => {
        console.log(error);
        return false;
      });
} 
export const getSignedInUser = async () => {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // if(!user.emailVerified){
                //     sendEmailVerification(user);
                //     window.location.href = '/emailverification';
                //     return;
                // };
                const uid = user.uid;
                try {
                    const docRef = doc(db, "user", uid);
                    const userData = await getDoc(docRef);
                    if(userData.data().toRemove){
                        const auth = getAuth();
                        const userToRemove = auth.currentUser;
                        deleteUser(userToRemove).then(() => {
                            console.log("Użytkownik usunięty")
                          }).catch((error) => {
                            console.log(error);
                          });
                        await deleteDoc(doc(db, "user", uid));
                        resolve([false], null, null)
                    };
                    resolve([true, userData.data(), uid]);
                } catch (error) {
                    reject(error);
                }
            } else {
                resolve([false, null, null]);
            }
        });
    });
};
 export const saveUser = async (name, surname, email, phone, role, password, companyName) => {
    try {
        const date = new Date();
        const secondaryApp = initializeApp(firebaseConfig, "Secondary");
        const secondaryAuth = getAuth(secondaryApp); 
        const firebaseUser = await createUserWithEmailAndPassword(secondaryAuth, email, password);
        await sendEmailVerification(firebaseUser.user);
        if(firebaseUser.user.uid) {
            await setDoc(doc(db, "user", firebaseUser.user.uid), {
                userName: name,
                userSurname: surname,
                email: email,
                phoneNumber: phone,
                role: role,
                company: companyName,
                createdAt: date,
                toRemove: false,
                isCompany: false
            });
        }
        await signOut(secondaryAuth);
        return true;
    } catch (error) { 
        return false
    }
};
 export const saveCompany = async (name, email, password) => {
    const date = new Date();
    try {
        const auth = getAuth(app);
        const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);
        if(!firebaseUser.user.uid){return [false, "Błąd przy zapisywanie firmy"]};
        if(firebaseUser.user.uid) {
            await setDoc(doc(db, "user", firebaseUser.user.uid), {
                userName: name,
                email: email,
                role: "Admin",
                company: name,
                createdAt: date,
                toRemove: false,
                isCompany: true,
                phoneNumber: "",
            });
        }
        return [true, null];
    } catch (error) { 
        return [false, error];
    }
 }
export const editUser = async (name,surname,phone,role,id) =>{
    try {
        await updateDoc(doc(db, "user", id), {
            userName: name,
            userSurname: surname,
            phoneNumber: phone,
            role: role
        });
        return true;
    } catch (error) { 
        return false
    }
}
export const editMyUser = async (name, surname, phone, id) => {
    const auth = getAuth(app);
    try {
        // Aktualizacja danych w Firestore
        await updateDoc(doc(db, 'user', id), {
            name: name,
            surname: surname,
            phoneNumber: phone,
            userSurname: surname,
            userName: name
        }).then(()=>{
            window.location.reload();
        });
    } catch (error) {
        console.error("Błąd podczas aktualizacji danych: ", error);
        return false;
    }
};
export const editUserEmail = async (oldEmail, newEmail, password, id) => {
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, oldEmail, password);
        const user = userCredential.user;

        const credential = EmailAuthProvider.credential(oldEmail, password);
        await reauthenticateWithCredential(user, credential);

        await updateEmail(user, newEmail);

        await sendEmailVerification(user);
        await updateDoc(doc(db, 'user', id), {
            email: newEmail
        }).then(()=>{
            window.location.reload();
        });
    } catch (error) {
        return false;
    }
};
export const editUserPassword = async ( email, password, newPassword) => {
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Ponowna autoryzacja
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(user, credential);

        // Zaktualizowanie hasła w Firebase Auth
        await updatePassword(user, newPassword).then(()=>{
            logoutUser();
        })
    }catch (error) {
        return false;
    }
}
export const editCompany = async (phone, email, id) => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    try {
        // Po weryfikacji użytkownik musi się ponownie zalogować lub potwierdzić ręcznie
        await updateEmail(user, email);
        
        // Aktualizacja danych w Firestore
        await updateDoc(doc(db, 'user', id), {
            phoneNumber: phone,
            email: email,
        }).then(()=>{
            window.location.reload();
        });
        return true;
    } catch (error) {
        console.error("Błąd podczas aktualizacji danych: ", error);
        return false;
    }
};
export const getUser = async (company) => {
    let users = [];
    const q = query(collection(db, 'user'), where("company", '==', company), where("isCompany", "==", false));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id, taskRole: "" });
    })
    return(users);
}
export const deleteUserAction = async (id) => {
    try {
        await updateDoc(doc(db, "user", id), {
            toRemove: true,
            company: ""
        });
        return true;
    } catch (error) { 
        return false
    }
}