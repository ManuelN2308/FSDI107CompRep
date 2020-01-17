function saveMessage(){
    // read data
    var name = $("#txtName").val();
    var mail = $("#txtMail").val();
    var comment = $("#txtComment").val();

    function clearContact() {
        $("#txtName").val("");
        $("#txtMail").val("");
        $("#txtComment").val("");
    }

    //create an object
    var msg = {
        name: name,
        mail: mail,
        comment: comment,
        user: 'Noah'
    };


    console.log(msg);

    //send to back end
    $.ajax({
        url: '/api/message',
        type: 'POST',
        data: JSON.stringify(msg),
        contentType: 'application/json',
        success: function(res){
            console.log("Server says", res);
            clearContact();

            $("#alert").removeClass("hide");

        setTimeout(
            function(){
                $("#alert").addClass("hide");
            },
            10000 // = to 10 secs
            );
        },
        error: function(error){
            console.log("Error saving message", error);
        
        }
    });

}

function init(){
    console.log("Contact Page!");


    // on click event

    $("#btnSend").click(saveMessage);

}


window.onload = init;