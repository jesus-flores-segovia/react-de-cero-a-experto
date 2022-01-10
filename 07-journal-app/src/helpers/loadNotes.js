import { collection, doc, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase/firebaseConfig"

export const loadNotes = async (uid) => {
    
    const notes = [];

    const documentRef = doc(db, `${ uid }`, "journal");
    const collectionRef = collection(documentRef, "notes");
    const documentSnapshot = await getDocs(collectionRef);

    documentSnapshot.forEach((doc) => {
        notes.push({
            id: doc.id,
            ...doc.data()
        })
      });

    return notes;
}