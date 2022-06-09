const loginForm = document.getElementById("login-form");

const loginButton = document.getElementById("login-form-submit");

const loginErrorMsg = document.getElementById("login-error-msg");



loginButton.addEventListener("click", (e) => {

    e.preventDefault();

    const loginData = [
        {
            username: "admin",
            password: "admin"
        },
        {
            username: "Muhammadsmd",
            password: "Samuda22*"
        }]
    const username = loginForm.username.value
    const password = loginForm.password.value
    const login = loginData.find(data => data.username === username && data.password === password)
    console.log (username)
    if(login){
        window.open("lang.html","_self")
        alert("Rotate Your Phone to Go Setting Control Panel");
    } else {
        alert("Username or Password is wrong")  
    }
})