function loginView(props) {

    let email = "";
    let password = "";

    return (
        <div>
            <h1>Login or create an account!</h1>

            <div className="signUp">
                <input type="text" onChange={emailInputACB} PlaceHolder="E-mail"></input>
                <input type="password" onChange={passwordInputACB} PlaceHolder="Password"></input>
                <button onClick={signInACB}>Login</button>
                <button onClick={signUpACB}>Create account</button>
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
        console.log(password)
        console.log(email)
    }

    function signUpACB() {
        props.onSignUp(email, password)
        console.log(password)
        console.log(email)
    }
}

export default loginView;