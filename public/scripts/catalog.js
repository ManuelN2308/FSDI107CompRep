// "http://restclass.azurewebsites.net"

var items = [];
var serverURL = "http://localhost:8080";

function getCatalogFromServer(){

$.ajax({
    url: serverURL + "/api/products",
    type: "GET",
    success: function(res) {
// console.log("Server responded OK", res);

        for(var i = 0; i < res.length; i++){
            var theItem = res[i];
            
            if(theItem.user == "Noah")
            {
                // this item belongs to me
                items.push(theItem);
            }
        }
        // display
        displayCatalog();
    },
    error: function(error){
        console.log("Error on request", error);
    }

});
}

function displayCatalog(){

    for(var i = 0; i < items.length; i++){
        var product = items[i];

        displayItem(product);
       
    }

}

function displayItem(product){

    //var pLayout = "<div><h4>"+ product +"</h4></div>";
    var pLayout = `<div class="item">
    <img src="img/${product.image}">
    <h4>${product.title}</h4>
    <h6>${product.price}</h6>
    <p>${product.description}</p>
    <button class="btn btn-sm btn-info">Add to cart</button>
    </div>`;

    $("#catalog").append(pLayout);
}


function search(){
    var text = $("#txtSearch").val();
    console.log(text);

    $("#catalog").html("");
    
    for(var i = 0; i < items.length; i++){
        var product = items[i];


        if(
            product.title.toLowerCase().includes(text.toLowerCase())
            || product.title.toLowerCase().includes(text.toLowerCase())
            || product.title.toLowerCase().includes(text.toLowerCase())
            || product.rating.toString().includes(text)
            ) {
            displayItem(product);
        }
    }




}

function init(){
    console.log("Catalog Page");

    $("#btnSearch").click(search);
    $("#txtSearch").keypress(function (e){
if(e.key == "Enter"){
    search();
    e.preventDefault();
}
    });

    getCatalogFromServer();
    displayCatalog();
    
}

window.onload = init;