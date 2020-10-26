var cartInfo = [];
var radios = [];
var currency = "UYU";


function showCart(){
    let htmlContentToAppend = "";


    
                for(let i = 0; i < cartInfo.articles.length; i++){
                    let cart = cartInfo.articles[i];
                    
                  


                    htmlContentToAppend += `
                    <tr>
                    <td><img src="` + cart.src + `" width="50px"></td>
                    <td>`+ cart.name +`</td>
                    <td>`+ cart.currency + "" + `<span id="unitCost">` + cart.unitCost + ` </span></td>
                    <td><input style="width:60px;" type="number" min="0" id="productCount" value="` + cart.count +  `"</td>
                    <td><span id="productSubtotal" style="font-weight:bold;"></span></td>
                    </tr>
                    `
                    
                    document.getElementById("articlesWrapper").innerHTML = htmlContentToAppend;
}
}



function start(){
    document.getElementById("productCount").addEventListener("change", calculos);
    }



function calculos(){
    var cantidad =this.value;
    var precio = document.getElementById("unitCost").innerText;

    var radios = document.getElementsByName("publicationType")
    var radios_value
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          // do whatever you want with the checked radio
          radios_value = radios[i].value;
          
          }
        };
      
    
   
    var sub = (cantidad * precio);  
    var envio = Math.round(radios_value * sub);
    var total = envio + sub;
    document.getElementById("comissionText").innerHTML = currency + " " + envio;
    document.getElementById("productSubtotal").innerHTML = currency + " " + sub;
    document.getElementById("productCostText").innerHTML = currency + " " +  sub;
    document.getElementById("totalCostText").innerHTML = currency + " " + total;

    

}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                cartInfo = resultObj.data;  
                
                showCart(cartInfo.articles);
                start();

                getJSONData(CART_BUY_URL).then(function(resultObj){
                    cartBuy = resultObj.data;
                    formulario = document.getElementById("cart-info")
                    formulario.addEventListener("submit",function(){

                        alert(cartBuy.msg)
                    })

                    
                    
                   
                        

                    })
                    
                
            }
    
    })
});



