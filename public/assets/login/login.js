const loginForm = document.getElementById("login-form");

const loginButton = document.getElementById("login-form-submit");

const loginErrorMsg = document.getElementById("login-error-msg");



loginButton.addEventListener("click", (e) => {

    e.preventDefault();

    const username = loginForm.username.value;

    const password = loginForm.password.value;


    if (username === "admin"&& password === "admin") {

        window.open("lang.html","_self")
        alert("Rotate Your Phone to Go Setting Control Panel");

    } else {

        alert("Wrong username or password.");

    }

})