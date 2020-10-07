var app = angular.module('myApp', []);
app.controller('inputCtrl', function ($scope) {
    $scope.game = "Game";
    $scope.plant = "Plant";
    $scope.place = "Place";
    $scope.num = "Num";
    $scope.adj = ["A", "B", "C"];
    $scope.noun = ["A", "B", "C", "D"];
    $scope.plnoun = ["A", "B", "C"];
    $scope.verbing = ["A", "B", "C", "D"];

    //$scope.addAdj = function () {
    //    $scope.contact.adj.push($scope.inpTxt);
    //    console.log($scope.contact.adj);
    //};
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