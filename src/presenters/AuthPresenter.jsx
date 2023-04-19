import AuthView from "../views/AuthView";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, connectAuthEmulator } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'

//const { getAuth, createUserWithEmailAndPassword}= require( "firebase/auth");

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js'

import firebaseConfig from "../firebaseConfig.js";


// Initialise firebase
const app= initializeApp(firebaseConfig); //rätt att ha det här??

export default 
{
    name: "Auth",
    setup(){

        //Create account
        const auth = getAuth(app);
        
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
                console.log(errorMessage)
            });
        }

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
            });
        }

        return function acb(props){return (
            <div>
                {<AuthView 
                    onSignIn={onSignInACB}
                    onSignUp={onSignUpACB}

                />}

            </div>
            );

        }
    }
}