function loginView(props) {

    let email = "";
    let password = "";

    return (
        <div class="boxAndTextLogin">

            <div class="welcomeMusiceja">
                <p class='WelcomeMusicejaText'>WELCOME TO MUSICEJA</p>
            </div>
            <div class="login">
                <h1>Login or Create an Account</h1>
                <h3>E-mail Address</h3>
                <input class="emailInput" type="text" onChange={emailInputACB} PlaceHolder="Enter E-mail"></input>
                <h3>Password</h3>
                <input class="passwordInput" type="password" onChange={passwordInputACB} PlaceHolder="Enter Password"></input>
                <button class="signInButton" onClick={signInACB}>Login</button>
                <button class="signUpButton" onClick={signUpACB}>Create Account</button>
                <p class='loginErrortext'>{props.error}</p>
            </div>


           

        </div>
        
    );

    function emailInputACB(e) {
        email = e.target.value;
    }

    function passwordInputACB(e) {
        password = e.target.value;
    }

    function signInACB() {
        props.onSignIn(email, password)
    }

    function signUpACB() {
        props.onSignUp(email, password);

    }
}

export default loginView;