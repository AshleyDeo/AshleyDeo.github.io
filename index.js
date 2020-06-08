//Open Nav Bar
document.getElementById("nav-button").addEventListener("click", openNav);

function openNav() {
    //get width of navbar from css
    let isOpen = window.getComputedStyle(document.querySelector("#nav-bar")).width;
    console.log(isOpen);
    if (isOpen == "0px") {
        console.log("open");
        document.getElementById("nav-bar").style.width = "10em";
        document.getElementById("other").style.marginLeft = "10em";
        document.getElementById("nav-button").innerHTML = "<<";
    } else {
        console.log("close");
        document.getElementById("nav-bar").style.width = "0";
        document.getElementById("other").style.marginLeft = "2em";
        document.getElementById("nav-button").innerHTML = ">>";
    }
}
