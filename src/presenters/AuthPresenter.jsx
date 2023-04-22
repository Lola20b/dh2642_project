import AuthView from "../views/AuthView";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js'

import firebaseConfig from "../firebaseConfig.js";


// Initialise firebase
const app= initializeApp(firebaseConfig);

const auth = getAuth()

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
                console.log(errorMessage)
            });
        }

        function onSignInACB(email, password) {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("hejsan")
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                console.log("tjo")
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.message)
                console.log(error.code)
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