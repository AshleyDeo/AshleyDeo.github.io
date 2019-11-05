document.addEventListener('DOMContentLoaded', init, false);
function init() {
    document.getElementById("Button-1").addEventListener("click", showResponse);
    document.getElementById("Button-2").addEventListener("click", hideResponse);
    document.addEventListener('keypress', changeColor1);
    document.addEventListener('keypress', changeColor2);
    document.addEventListener('keypress', changeColor3);

    function showResponse() {
        document.getElementById("Responses").style.display = "initial";
        document.getElementById("Button-1").style.display = "none";
        document.getElementById("Button-2").style.display = "initial";
        changeBackground1();
    }
    function hideResponse() {
        document.getElementById("Responses").style.display = "none";
        document.getElementById("Button-1").style.display = "initial";
        document.getElementById("Button-2").style.display = "none";
        changeBackground2();
    }
    function changeColor1(a) {
        document.querySelector('a').style.color = "red";
        document.querySelector('#Readings a').style.color = "purple";
    }

    function changeBackground1() {
        document.querySelector('body').style.backgroundColor = "pink";
    }
    function changeBackground2() {
        document.querySelector('body').style.backgroundColor = "aqua";
    }
}