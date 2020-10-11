var product = [];
var relProducts = [];
var productList = [];
var userComments = [];


function showCarousel(array){

    let htmlContentToAppend = "";
    var activar;

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        if (i == 0) {
            activar = "active";
        }    
        else {
            activar = "";
        }

        htmlContentToAppend += `
        <div class="carousel-item ` + activar +`">
                <img class="d-block w-100 alt align-self-center text-center" src="`+ imageSrc +`" alt="First slide">
              </div>

        `
        

        document.getElementById("dinamicCarousel").innerHTML = htmlContentToAppend;
    }
}

function storeRelProducts(array){
    for(let i = 0; i < array.length; i++){
        let srcPosition = array[i];
        relProducts.push(srcPosition);
    }
    console.log(relProducts)
}



function review(){


        var userE = document.getElementById("userEmail");
        var review = document.getElementById("review");
        var rating = document.getElementById("rating");
    
        localStorage.setItem("userE", userE.value);
        localStorage.setItem("review", review.value);
        localStorage.setItem("rating", rating.value);
    
        var getUser = localStorage.getItem("userE");
        var getReview = localStorage.getItem("review");
        var getRating = localStorage.getItem("rating");
        var getDate = new Date().toLocaleString();
    
    
    
            let stars = "";
        
            for( let i = 0; i < getRating; i++)
            {
                stars += `
                    <i class="fa fa-star checked"></i>
                    `;
                }
        
            for( let i = getRating; i < 5; i++)
            {
            stars += `
                <i class="far fa-star"></i>
                `;
                }
    
        var newComment = document.createElement("div");
    
        
        newComment.innerHTML =`
        <div>
        <div class="row">
            <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <span>`+ getUser +` `+ stars +`  </span>
            </div>
            <p class="mb-1">` + getReview+ `</p>
                        <small class="text-muted">` + getDate + `</small>
                        <hr class="my-3">
        </div>
        </div>
        `
    
        document.getElementById("feed").appendChild(newComment);
    
    }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productCostHTML = document.getElementById("productCost");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productsoldCountHTML = document.getElementById("productsoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
        
            productNameHTML.innerHTML = product.name;
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productDescriptionHTML.innerHTML = product.description;
            productsoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = '<a href="category-info.html">' + product.category + '</a>';

            showCarousel(product.images);

           storeRelProducts(product.relatedProducts);

           getJSONData(PRODUCTS_URL).then(function(resultObj){
               if(resultObj.status === "ok"){
                   productList =resultObj.data;

                   let htmlContentToAppend =" ";

                   for (var i = 0; i < relProducts.length; i++){
                       console.log(productList[relProducts[i]]);
                       htmlContentToAppend += `
                       <a href="product-info.html" class="list-group-itemlist-group-item-action">
                           <div class="d-block mb-4 h-100" onclick="showSpinner()">
                                <img src="`+ productList[relProducts[i]].imageSrc +`" class="rounded" alt="` + productList[relProducts[i]].description  +`">
                           <div class="col">
                                <div class="col-md-auto">
                                    <h4 class="mb-1">` + productList[relProducts[i]].name + ` - ` + productList[relProducts[i]].cost + ` `+ productList[relProducts[i]].currency + `</h4>
                                <small class="text-muted">` + productList[relProducts[i]].soldCount + ` artículos vendidos</small>
                                </div>
                                <p class="mb-1" ` + productList[relProducts[i]].description} + `</p>
                                </div>
                            </div>
                       </div>
                       </a>
                       `

                       document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
                   
                    //muestro comentarios
                    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
                        if(resultObj.status==="ok"){
                            userComments = resultObj.data;

                            let feed = "";
                            for (let i = 0; i < userComments.length; i++) {
                            let comments = userComments[i];
        
        
                            let score = comments.score - 1;
                            let stars = "";
                            for (let i = 0; i < 5; i++) {
    
                            if(i <= score){
                            stars += `<i class="fas fa-star checked"></i> `;
                            }else{
                            stars += `<i class="fas fa-star"></i> `;
                            }
            
                            }  
         
                            feed += `
                                    <div>
                                         <div class="row">
                                             <div class="col">
                                                 <div class="d-flex justify-content-between align-items-center">
                                                <span>` + comments.user + ` ` + stars + `</span>
                                                 </div>
                                             <p class="mb-1">` + comments.description + `</p>
                                             <small class="text-muted">` + comments.dateTime + `</small>
                                            <hr class="my-3">
                                        </div>
                                    </div>
                                 </div>
                            </div>
                                `

        document.getElementById("feed").innerHTML = feed;

    }
                        }
                    })
                   
                    }
               }
            )
        }
        
        });

    
});