const ORDER_ASC_BY_PRICE = "$ASC";
const ORDER_DESC_BY_PRICE = "$DES";
const ORDER_BY_PROD_COUNT = "Cant.";
var productsList = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortByPrice(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < productsList.length; i++){
        let category = productsList[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

        htmlContentToAppend += '<a href="product-info.html" class="list-group-item list-group-item-action">\
        <div class="row"  onclick="showSpinner()">\
            <div class="col-3">\
                <img src="' + category.imgSrc + '" alt="' + category.description + '" class="img-thumbnail">\
            </div>\
            <div class="col">\
                <div class="d-flex w-100 justify-content-between">\
                    <h4 class="mb-1">'+ category.name + ' ' + '-' + ' ' + category.cost + ' ' + category.currency + '</h4>\
                 <small class="text-muted">' + category.soldCount + ' artículos vendidos</small>\
                </div>\
                <p class="mb-1">' + category.description + '</p>\
                </div>\
            </div>\
        </div>';
        }
    document.getElementById("products-list").innerHTML = htmlContentToAppend;
    }    
    }
    function sortAndShowCars(sortCriteria, categoriesArray){
        currentSortCriteria = sortCriteria;
    
        if(categoriesArray != undefined){
            productsList = categoriesArray;
        }
    
        productsList = sortByPrice(currentSortCriteria, productsList);
    
        //Muestro los autos ordenadas
        showProductsList();
    }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCars(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("priceAsc").addEventListener("click", function(){
        sortAndShowCars(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("priceDesc").addEventListener("click", function(){
        sortAndShowCars(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCars(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo del valor de los productos
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

    
      minCount = undefined;
      maxCount = undefined;

        showProductsList();
    
    });

});