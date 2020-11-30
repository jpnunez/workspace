let productCost = 0;
let productCount = 0;
let comissionPercentage = 0.13;
let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let cart = [];

function showCart(){
    let htmlContentToAppend = "";


    
                for(let i = 0; i < cartInfo.articles.length; i++){
                    let cart = cartInfo.articles[i];
                    
                  


                    htmlContentToAppend += `
                    <tr>
                    <td><img src="` + cart.src + `" width="50px"></td>
                    <td>`+ cart.name +`</td>
                    <td><span id="productCurrency">`+ cart.currency + " " + `</span><span id="unitCost">` + cart.unitCost + ` </span></td>
                    <td><input style="width:60px;" type="number" min="0" id="productCountInput" value="` + cart.count +  `"</td>
                    <td><span id="productSubtotal" style="font-weight:bold;"></span></td>
                    </tr>
                    `
                    
                    document.getElementById("articlesWrapper").innerHTML = htmlContentToAppend;
}
}


//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){
    let subTotalHTML = document.getElementById("productSubtotal");
    let unitProductCostHTML = document.getElementById("productCostText");
    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");
    let unitCostHTML = document.getElementById("unitCost").innerText;   
    let productCountHTML = document.getElementById("productCountInput").value

    let subtotal = productCountHTML * parseInt(unitCostHTML,10);

    let subTotalToShow = MONEY_SYMBOL + "" + subtotal;
    let unitCostToShow = MONEY_SYMBOL + subtotal;
    let comissionToShow = MONEY_SYMBOL + "" + Math.round(comissionPercentage * subtotal);
    let totalCostToShow = MONEY_SYMBOL + ((subtotal + (Math.round(comissionPercentage * subtotal))));
    
    
    subTotalHTML.innerHTML = subTotalToShow;
    unitProductCostHTML.innerHTML = unitCostToShow ;
    comissionCostHTML.innerHTML = comissionToShow;
    totalCostHTML.innerHTML = totalCostToShow;
}

function start (){
    let productCost = document.getElementById("unitCost").innerText;
            let productCount = document.getElementById("productCountInput").value;
            let subTotalHTML = document.getElementById("productSubtotal");

            let unitCostHTML = document.getElementById("productCostText");     
            let envioHTML = document.getElementById("comissionText");
            let totalCostHTML = document.getElementById("totalCostText");


            let subtotal = productCount * parseInt(productCost ,10);
            let envio = 0.13 * subtotal;
            let subTotalToShow = MONEY_SYMBOL + "" + subtotal;
            let envioToShow = MONEY_SYMBOL + envio;
            let totalToShow = MONEY_SYMBOL + (subtotal + envio);

            subTotalHTML.innerHTML = subTotalToShow;
            unitCostHTML.innerHTML = subTotalToShow;
            envioHTML.innerHTML = envioToShow;
            totalCostHTML.innerHTML = totalToShow;
};

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
            



    document.getElementById("productCountInput").addEventListener("change", function(){
        productCount = this.value;
        updateTotalCosts();
    });

    document.getElementById("unitCost").addEventListener("change", function(){
        productCost = this.value;
        updateTotalCosts();
    });

    document.getElementById("goldradio").addEventListener("change", function(){
        comissionPercentage = 0.13;
        updateTotalCosts();
    });
    
    document.getElementById("premiumradio").addEventListener("change", function(){
        comissionPercentage = 0.07;
        updateTotalCosts();
    });

    document.getElementById("standardradio").addEventListener("change", function(){
        comissionPercentage = 0.03;
        updateTotalCosts();
    });

    getJSONData(CART_BUY_URL).then(function(resultObj){
        cartBuy = resultObj.data;
        formulario = document.getElementById("cart-info")
        formulario.addEventListener("submit",function(){

            alert(cartBuy.msg)
        })

        
        
       
            

        })

    

}}
    )
});
