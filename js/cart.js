var cartInfo = [];
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                cartInfo = resultObj.data;
    
    
                let htmlContentToAppend = "";


    
                for(let i = 0; i < cartInfo.articles.length; i++){
                    let cart = cartInfo.articles[i];
                    


                    htmlContentToAppend += `
                    <tr>
                    <td><img src="` + cart.src + `" width="50px"></td>
                    <td>`+ cart.name +`</td>
                    <td>`+ cart.currency + "" + cart.unitCost +`</td>
                    <td><input style="width:60px;" type="number"  id="productCount" value="` + cart.count +  `"</td>
                    <td><span id="productSubtotal" style="font-weight:bold;"></span></td>
                    </tr>
                    `
                    
                    document.getElementById("articlesWrapper").innerHTML = htmlContentToAppend;
                    document.getElementById("productCount").addEventListener("change", function() {
                        cantidad = this.value;
                        let subtotal = cart.unitCost * cantidad;
                        document.getElementById("productSubtotal").innerHTML = cart.currency + subtotal;
                        document.getElementById("productCostText").innerHTML = cart.currency + subtotal;
                    })

                     

        }
    }
})
})



