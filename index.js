let imgTitle = ["Juice Box Storyboard", "Environment", "Logo Project","Arc Pistol Render"]
let imgCarouselSrc = [
    ['Images/storyboard01.png','Images/storyboard02.png'],
    ['Images/DeosaranA_0515_Environment.jpg'],
    ['Images/AKARUN_cube_final.png', 'Images/AKARUN_cubePieces.png', 'Images/AKARUN_cubeHolder_top.png', 'Images/AKARUN_cubeHolder_bottom.png', 'Images/LogoCube_1.png', 'Images/AKARUN_sweater_front.png', 'Images/AKARUN_sweater_back.png', 'Images/AKARUN_keychain.png', 'Images/AKARUN_sticktoy.png', 'Images/AKARUN_sticktoy_v2.1.png', 'Images/AKARUN_sticktoy_v2.2.png'],
    ['Images/Arc_Pistol_Render.png']
];
let imgCarouselCap = [
    ['Storyboard (Page 1)', 'Storyboard (Page 2)'],
    ['Rebecca Mock room in the League of Legends World 2016 animation'],
    ['Final Cube (3x3x3) with ~3 solutions', 'Final Version: Puzzle pieces', 'Final Version: Top holder for the puzzle cube', 'Final Version: Bottom holder for the puzzle cube', 'Version 1 of Puzzle Cube: Originally 6x6x6 (Blender3D)', 'First draft of possible Logo applications. Sweater Front', 'Sweater Back', 'Key Chain with logo split onto the back and front', 'Version 1 Stick Toy: Has moveable joints. Can be shaped into different poses', 'Version 2.1 of Stick Toy (Blender3D)', 'Version 2.1 of Stick Toy: Will be able to stand and be posed (Blender3D)'],
    ["Redone in Blender"]
];

var cInd0 = $('<button data-bs-target="#ImgCarousel" data-bs-slide-to="0" class="active"></button>');
var cImg = $('<img class="d-block w-100" src="" alt="slide">');

$(document).ready(function () {
    //Search Filter
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".card").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    //Hover Popover
    //$('[data-bs-toggle="popover"]').popover();

    //Modal for Video
    $('a.vidLink').click(function () {
        //Get info for vid
        //var vidName = $(this).text();
        var vid = $(this).data('bs-src');

        //console.log(vidName, ": ", vid);
        //console.log(vid);

        $(document).on('show.bs.modal', '#videoModal', function () {
            console.log("Def Working ;)")
            //$(".modal-title").text(vidName);
            $("#popupVid").attr('src', vid);
        });
        //Set vid on Modal
        /* Bootstap 5: show.bs.modal
         * weird issue where function doesnt run firts time. Click again to work properly.*/
        console.log("Bootstap Problems. Click Again")
    });

    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#videoModal").on('hide.bs.modal', function () {
        $("#popupVid").attr('src', '');
    });

    $(".modalImg").click(function () {
        let imgInd = $(this).data('bs-index');
        let carouselLen = imgCarouselSrc[imgInd].length;
        $('.carousel-indicators button').remove();
        $('.carousel-inner div').remove();
        for (let i = 0; i < carouselLen; i++) {
            console.log(imgCarouselSrc[imgInd][i]);
            $('.carousel-inner').append('<div class="carousel-item"> <img class="d-block w-100" src="' + imgCarouselSrc[imgInd][i] + '" alt="Slide' + (i + 1) + '"> <div class="carousel-caption d-none d-md-block"><div class="carousel-caption d-none d-md-block">' + imgCarouselCap[imgInd][i] + '</div></div></div>');
            if (i == 0) {
                console.log();
                if (carouselLen > 1) {
                    $('.carousel-indicators').append(cInd0);
                }
                $('.carousel-item').attr("class", "carousel-item active");
            } else if (carouselLen > 1) {
                $('.carousel-indicators').append('<button data-bs-target="#ImgCarousel" data-bs-slide-to="' + i + '" class="active"></button>');
            }
        }
        /* Bootstap 5: show.bs.modal
         * weird issue where function doesnt run firts time. Click again to work properly.*/
        $("#ImgCarouselModal").on('show.bs.modal', function () {
            $(".modal-title").text(imgTitle[imgInd]);
            if (imgCarouselSrc[imgInd].length <= 1) {
                $(".carousel-indicators").hide();
                $(".carousel-control").hide();
            } else {
                $(".carousel-indicators").show();
                $(".carousel-control").show();
            }
        });
    });
});