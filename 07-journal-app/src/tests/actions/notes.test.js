import { deleteDoc, doc } from 'firebase/firestore/lite';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {
        uid: 'test_uid'
    }
})

describe("Tests inside file 'notes.test.js'", () => {

    test("'startNewNote' action must create a new note and set it as an active", async() => {
        
        await store.dispatch(startNewNote());

        const actions = store.getActions();

        // Delete the document created from database
        const uid = store.getState().auth.uid;
        const docRef = await doc(db, `${uid}/journal/notes/${actions[0].payload.id}`);
        await deleteDoc(docRef);

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

    })
})