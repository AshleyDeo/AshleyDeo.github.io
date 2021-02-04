//Modal (Expand image on click)
var modal = document.getElementById("myModal");

// Get image and insert it inside the modal 
//"alt" text is a caption
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

//runs on img click
function openModal(imgs) {
    modal.style.display = "block";
    modalImg.src = imgs.src;
    captionText.innerHTML = imgs.alt;
}

//shows x for modal
var span = document.getElementsByClassName("close")[0];

//closes modal
span.onclick = function () {
    modal.style.display = "none";
}

//Open Nav Bar
//document.getElementById("nav-button").addEventListener("click", openNav);

//function openNav() {
//    //get width of navbar from css
//    let isOpen = window.getComputedStyle(document.querySelector("#nav-bar")).width;
//    console.log(isOpen);
//    if (isOpen == "0px") {
//        console.log("open");
//        document.getElementById("nav-bar").style.width = "10em";
//        document.getElementById("other").style.marginLeft = "10em";
//        document.getElementById("nav-button").innerHTML = "<<";
//    } else {
//        console.log("close");
//        document.getElementById("nav-bar").style.width = "0";
//        document.getElementById("other").style.marginLeft = "2em";
//        document.getElementById("nav-button").innerHTML = ">>";
//    }
//}
