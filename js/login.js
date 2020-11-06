var registro = document.getElementById("formulario");  
var email = document.getElementById("email");
var pass = document.getElementById("password");

registro.addEventListener("submit",function(event){
    event.preventDefault();
    let usuarios = Array(
    {
        userEmail: email.value,
        contraseña:  pass.value, 
    });

    window.localStorage.setItem("usuario",JSON.stringify(usuarios));
    location.href="index.html";
});
