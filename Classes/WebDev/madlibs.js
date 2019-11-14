$(document).ready(function () {
    var theButton = $("#myButton").on("click", myFunction);
    var hideFlag = 1;
    $(".lib-answers").css({
        'color': 'blue',
        'border-radius': '5px',
        'text-align' : 'center'
    })
    function myFunction() {
        console.log("button clicked");
        if (hideFlag == 1) {
            $("#MadLib").css({ color: "black" });
            $(".lib-answers").css({
                'color': 'black',
                'border': 'none',
                'border-radius': '5px'
            })
        } else {
            $("#MadLib").css({ color: "white" });
            $(".lib-answers").css({
                'color': 'blue',
                'border': 'initial',
                'border-radius': '5px'
            })
        }
        hideFlag = 1 - hideFlag;
    }
});
// making a div a button
// displaying to another div
//$("#target").click(function () {
//    $("#other").text("Now the txt is this!");
//})
// accessing user input
// setting it as a global variable so you can access it later in the code
//var theText;
//$("#theSubmit").click(function () {
//    theText = $("#theText").val();
//    console.log(theText);
//})