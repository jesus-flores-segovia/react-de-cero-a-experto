import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { auth, googleAuthProvider } from "../firebase/firebaseConfig";
import { types } from "../types/types"
import { cleanNotes } from "./notes";
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch(err => {
                dispatch(finishLoading());
                Swal.fire("Error", err.message, "error");
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) => {
                dispatch(
                    login(
                        user.uid,
                        user.displayName
                    )
                )
            })
    }
}

export const startRegisterWithEmailPasswordName = (name, email, password) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({user}) => {
                await updateProfile(user, {displayName: name});
                dispatch(login(user.uid, user.displayName));
            })
            .catch(err => {
                Swal.fire("Error", err.message, "error");
            })
    }
}

export const login = (uid, displayName) => ({
        type: types.login,
        payload: {
            uid,
            displayName
        }
});

export const startLogout = () => {
    return async (dispatch) => {
        await signOut(auth);

        dispatch(logout());
        dispatch(cleanNotes());
    }
};

export const logout = () => ({
    type: types.logout
});