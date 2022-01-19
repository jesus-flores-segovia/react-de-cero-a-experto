import { deleteDoc, doc, getDoc } from 'firebase/firestore/lite';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';
 
jest.mock("../../helpers/fileUpload", () => ({
    fileUpload: jest.fn(() => {
        return Promise.resolve("test");
    })
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'test_uid'
    },
    notes: {
        active: {
                id: "2jaMS74NH37zUzzBDvxp",
                body: "updating body",
                date: 1642619425877,
                title: "updating title"
        }
    }
}

let store = mockStore(initState);

describe("Tests inside file 'notes.test.js'", () => {

    beforeEach(() => {
        store = mockStore(initState);
    })
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

    test("'startLoadingNotes' must load the notes", async() => {
        
        await store.dispatch(startLoadingNotes());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect(actions[0].payload[0]).toMatchObject(expected);
    })

    test("'startSaveNote' must update the note", async() => {
        
        const note = {
            id: "2jaMS74NH37zUzzBDvxp",
            body: "updating body",
            date: new Date().getTime(),
            title: "updating title"
        }
        
        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();

        expect(actions[0]).toMatchObject({
            type: types.notesUpdated,
            payload: {
                id: "2jaMS74NH37zUzzBDvxp",
                note: note
            }
        });

        const uid = store.getState().auth.uid;
        const docRef = await doc(db, `${uid}/journal/notes/${actions[0].payload.id}`);
        const docSnap = await getDoc(docRef);

        expect(docSnap.data().title).toBe(note.title);
    })

    test("'startUploading' must update the imageUrl of the note", async() => {

        const file = new File([], "image.jpg");

        fileUpload.mockReturnValue('https://test.com/file.jpg');

        await store.dispatch(startUploading(file));

        const uid = store.getState().auth.uid;
        const docRef = await doc(db, `${uid}/journal/notes/2jaMS74NH37zUzzBDvxp`);
        const docSnap = await getDoc(docRef);

        expect(docSnap.data().imageUrl).toBe(fileUpload(file));
    })
})