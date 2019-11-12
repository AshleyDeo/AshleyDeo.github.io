function twinkle1() {
    $('.Sky-1 > .SkyObj-1').fadeOut(1000);
    $('.Sky-1 > .SkyObj-1').fadeIn(1600);
    $('.Sky-1 > .SkyObj-2').fadeOut(1500);
    $('.Sky-1 > .SkyObj-2').fadeIn(1400);
    $('.Sky-1 > .SkyObj-3').fadeOut(2000);
    $('.Sky-1 > .SkyObj-3').fadeIn(1900);
}
function twinkle2() {
    $('.Sky-2 > .SkyObj-1').fadeOut(1000);
    $('.Sky-2 > .SkyObj-1').fadeIn(1600);
    $('.Sky-2 > .SkyObj-2').fadeOut(1500);
    $('.Sky-2 > .SkyObj-2').fadeIn(1400);
    $('.Sky-2 > .SkyObj-3').fadeOut(2000);
    $('.Sky-2 > .SkyObj-3').fadeIn(1900);
}
var twinkInt1 = null;
var twinkInt2 = null;
$(document).ready(function () {
    $("#Night").click(function () {
        $("body").css({ backgroundColor: "#070B34" })
        $(".Sky-1 > .SkyObj-1").text("Star")
        $(".Sky-1 > .SkyObj-2").text("Star")
        $(".Sky-1 > .SkyObj-3").text("Star")

        $(".Sky-2 > .SkyObj-1").text("Water")
        $(".Sky-2 > .SkyObj-2").text("Water")
        $(".Sky-2 > .SkyObj-3").text("Water")
        $(".Sky-1").css({ display: "flex", color: "white" })
        $(".Sky-2").css({ display: "flex", color: "darkblue" })
        twinkInt1 = setInterval(twinkle1, 1000);
        twinkInt2 = setInterval(twinkle2, 1000);
    });
    $("#Day").click(function () {
        clearInterval(twinkInt1)
        $("body").css({ backgroundColor: "#ffcc00" })
        $(".Sky-1").css({ display: "flex", color:"white"})
        $(".Sky-2").css({ display: "flex", color:"aqua"})
        $(".Sky-1 > .SkyObj-1").text("Cloud")
        $(".Sky-1 > .SkyObj-2").text("Cloud")
        $(".Sky-1 > .SkyObj-3").text("Cloud")
        $(".Sky-2 > .SkyObj-1").text("Water")
        $(".Sky-2 > .SkyObj-2").text("Water")
        $(".Sky-2 > .SkyObj-3").text("Water")
        twinkInt2 = setInterval(twinkle2, 1000);
    });
});

