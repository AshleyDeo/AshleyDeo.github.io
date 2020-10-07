var app = angular.module('myApp', []);
app.controller('inputCtrl', function ($scope) {
    $scope.game = "Game";
    $scope.plant = "Plant";
    $scope.place = "Place";
    $scope.num = "Number";
    $scope.adj0 = "Adjective"
    $scope.adj1 = "Adjective"
    $scope.adj2 = "Adjective"
    $scope.noun0 = "Noun"
    $scope.noun1 = "Noun"
    $scope.noun2 = "Noun"
    $scope.noun3 = "Noun"
    $scope.plnoun0 = "Plural Noun"
    $scope.plnoun1 = "Plural Noun"
    $scope.plnoun2 = "Plural Noun"
    $scope.verbing0 = "Verb ending in -ing"
    $scope.verbing1 = "Verb ending in -ing"
    $scope.verbing2 = "Verb ending in -ing"
    $scope.verbing3 = "Verb ending in -ing"
    $scope.showStory = false;
});
