
var userData = document.getElementById("dataUsuario")

    
    var nombrData = document.getElementById("nombrData");
    var apellData = document.getElementById("apellData");
    var telData = document.getElementById("telData");
    var paisData = document.getElementById("paisData");
    

    userData.addEventListener("submit",function(event){
        event.preventDefault();
        let usuarioData = Array(
        {
            nombre : nombrData.value,
            apellido :  apellData.value,
            telefono : telData.value,
            pais : paisData.value, 
        }
        )
    ;
        window.localStorage.setItem("usuarioData",JSON.stringify(usuarioData));
        alert("Los cambios han sido guardados!")
        location.reload()
    });


function datos(){

    var userString = localStorage.getItem("usuarioData");
    var userObj = JSON.parse(userString);
    var userNombre = userObj[0].nombre;
    var userApellido = userObj[0].apellido;
    var userTelefono = userObj[0].telefono;
    var userPais = userObj[0].pais;
    
// var nombre = localStorage.getItem('usuarioData').split(",")[0];
// var nombreClean = nombre.replace(/[\]")}[{(]/g, '');
// var nombreOK = nombreClean.replace("nombre:","");

// var apellido = localStorage.getItem('usuarioData').split(",")[1];
// var apellidoClean = apellido.replace(/[\]")}[{(]/g, '');
// var apellidoOK = apellidoClean.replace("apellido:","");

// var telefono = localStorage.getItem('usuarioData').split(",")[2];
// var telefonoClean = telefono.replace(/[\]")}[{(]/g, '');
// var telefonoOk = telefonoClean.replace("telefono:","");

// var pais = localStorage.getItem('usuarioData').split(",")[3];
// var paisClean = pais.replace(/[\]")}[{(]/g, '');
// var paisOk = paisClean.replace("pais:","");





document.getElementById("nombrData").value = userNombre;
document.getElementById("apellData").value = userApellido;
document.getElementById("telData").value = userTelefono;
document.getElementById("paisData").value = userPais;

    document.getElementById("nombreYapellido").innerText = userNombre + " " + userApellido;
    document.getElementById("paisProfile").innerText = userPais;


    };

// function update(){

    // userData.addEventListener("submit",function(){

        // var userString = localStorage.getItem("usuarioData");
        // var userObj = JSON.parse(userString);
        // var userNombre = userObj[0].nombre;
        // var userApellido = userObj[0].apellido;
        // var userPais = userObj[0].pais;
        // var nombre = localStorage.getItem('usuarioData').split(",")[0];
        // var nombreClean = nombre.replace(/[\]")}[{(]/g, '');
        // var nombreOK = nombreClean.replace("nombre:","");
        
        // var apellido = localStorage.getItem('usuarioData').split(",")[1];
        // var apellidoClean = apellido.replace(/[\]")}[{(]/g, '');
        // var apellidoOK = apellidoClean.replace("apellido:","");
        
        // var pais = localStorage.getItem('usuarioData').split(",")[3];
        // var paisClean = pais.replace(/[\]")}[{(]/g, '');
        // var paisOk = paisClean.replace("pais:","");

    // document.getElementById("nombreYapellido").innerText = userNombre + " " + userApellido;
    // document.getElementById("paisProfile").innerText = userPais;

    

    // })
// };

$("#profileImage").click(function(e) {
    $("#imageUpload").click();
});

function fasterPreview( uploader ) {
    if ( uploader.files && uploader.files[0] ){
          $('#profileImage').attr('src', 
             window.URL.createObjectURL(uploader.files[0]) );
    }
}

$("#imageUpload").change(function(){
    fasterPreview( this );
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    datos();
    // update();


}); 