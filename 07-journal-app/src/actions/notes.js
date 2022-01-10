import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore/lite";
import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        
        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime()
        }

        const doc = await addDoc(collection(db, `${ uid }`, "journal/notes"),{
            title: '',
            body: '',
            date: new Date().getTime()
        });

        dispatch(setActiveNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote));
    }
};

export const setActiveNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
});

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: [...notes]
});

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
};

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;

        if(!note.imageUrl) {
            delete note.imageUrl;
        }

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);

        await updateDoc(noteRef, noteToFirestore);

        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire("Saved", note.title, "success");
    }
};

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        
        const {active} = getState().notes;

        Swal.fire({
            title: "Uploading...",
            text: "Please wait...",
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload(file);
        active.imageUrl = fileUrl;  
        
        dispatch(startSaveNote(active));
    }
};

export const startDelete = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your note has been deleted.',
                'success'
              );

              const noteRef = await doc(db, `${uid}/journal/notes/${id}`);
              await deleteDoc(noteRef);
              dispatch(deleteNote(id));
            }
          })
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: {
        id
    }
})

export const cleanNotes = () => ({
    type: types.notesLogoutCleaning
})