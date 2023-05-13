import AuthView from "../views/AuthView";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js'

import firebaseConfig from "../firebaseConfig.js";
import { useToast } from "vue-toastification";

// Initialise firebase
const app= initializeApp(firebaseConfig);

const auth = getAuth()

let err = "test"
const toast = useToast();

export default 
{
    name: "Auth",
    setup(){

        //Create account
        function onSignUpACB(email, password) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                err = errorMessage;
                console.log(err)
            });
        }

        // Login
        function onSignInACB(email, password) {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                err = errorMessage;
                toast.error("Failed to login. Please try again!");
                
            });
        }

        return function acb(props){return (
            <div>
                
                {<AuthView 
                    onSignIn={onSignInACB}
                    onSignUp={onSignUpACB}
                    error = {err}

                />}

            </div>
            );

        }
    }
}