function loginView(props) {

    let email = "";
    let password = "";

    return (
        <div>

            <div class="welcomeMusiceja">
                <h1>WELCOME TO MUSICEJA</h1>
                </div>
            <div class="login">
                <h1>Login or Create an Account</h1>
                <h3>E-mail Address</h3>
                <input class="emailInput" type="text" onChange={emailInputACB} PlaceHolder="Enter E-mail"></input>
                <h3>Password</h3>
                <input class="passwordInput" type="password" onChange={passwordInputACB} PlaceHolder="Enter Password"></input>
                <button class="signInButton" onClick={signInACB}>Login</button>
                <button class="signUpButton" onClick={signUpACB}>Create Account</button>
                <h2>{console.log(props.error)}</h2>
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
        props.onSignUp(email, password)
    }
}

export default loginView;