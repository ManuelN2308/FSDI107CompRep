
// var serverURL = "http://restclass.azurewebsites.net";
var serverURL = "http://localhost:8080";


function Item(code, title, price, description, category, rating, image){
    this.code = code;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.rating = rating;
    this.image = image;
    this.user = "Noah";


}

    function clearForm(){
        $("#txtCode").val("");
        $("#txtTitle").val("");
        $("#txtPrice").val("");
        $("#txtDescription").val("");
        $("#txtCategory").val("");
        $("#txtRating").val("");
        $("#txtImage").val("");
    }



function saveItem(){
    // get values
    var code = $("#txtCode").val();
    var title = $("#txtTitle").val();
    var price = $("#txtPrice").val();
    var description = $("#txtDescription").val();
    var category = $("#txtCategory").val();
    var rating = $("#txtRating").val();
    var image = $("#txtImage").val();

    //create an object
    var test = new Item(code, title, price, description, category, rating, image);
    console.log(test);

    // send the object to a server
    $.ajax({
        url: serverURL + "/API/products",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(test),
        success : function(response){
            // alert the user
        console.log("Data saved, server responded with", response);
        clearForm();

        $("#alert").removeClass("hide");

        setTimeout(
            function(){
                $("#alert").addClass("hide");
            },
            10000 // = to 10 secs
        );
        },
        error: function(details){
            console.log("Error, something went wrong", details);
        }
    });

    // alert
    // data saved on the server correctly


}

function solveHomework(){

    var data = [
     {
        age: 99,
         name: "Noah",
         color: "Blue",
     },

    {
        age: 102,
        name: "Scott",
        color: "Green",

    },

    {
        age: 85,
        name: "Michael",
        color: "Purple",

    }

    ]
    var sumOfAges = 0;
    var oldestAge = 0;
    var oldestName = "";

    var youngestAge =  data[0].age;
    var youngestName = data[0].name;

        for(var i=0; i < data.length; i++){
            var person = data[i];

            sumOfAges += person.age;
            console.log(person.name);

            if(person.age < youngestAge){
                youngestAge = person.age;
                youngestName = person.name;
            }


            if (person.age > oldestAge){
                oldestAge = person.age;
                oldestName = person.name;
            }

        }

        
        var sumOfAges = 0;
        for(var i = 0; i < data.length; i++) {
            var person = data[i];

            sumOfAges += person.age;
            console.log(person.name);
        }
        console.log("Answer 3: ", sumOfAges);

}

function loadMessages() {
var name = "Noah";

$.ajax({
    url: '/api/message/' + name,
    type: 'GET',
    success: function(res){
        console.log("Server says:", res);
        for( var i = 0; i < res.length; i++){
            displayMessages(res[i]);
        }
    },
    error: function(error){
        console.log("Error loading messages", error);
    }
  });
}

function displayMessages(message) {
    var container = $("#messageList");
    var template = `<li><a href='mailto:${message.mail}'>${message.name}</a> - ${message.comment}</li>`;
    container.append(template);
}

function init(){
    console.log("Admin page");

    // events
    $("#btnSave").click(saveItem);

    // load messages
    loadMessages();

   // solveHomework();
}

window.onload = init;