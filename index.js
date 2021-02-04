let imgTitle = ["Juice Box Storyboard", "Environment"]
let imgCarouselSrc = [
    ['Images/storyboard01.png','Images/storyboard02.png'],
    ['Images/DeosaranA_0515_Environment.jpg'],
    ['Images/AKARUN_cube_final.png', 'Images/AKARUN_sweater_front.png', 'Images/AKARUN_sweater_back.png',  'Images/AKARUN_keychain.png', 'Images/AKARUN_sticktoy.png', 'Images/AKARUN_sticktoy_v2.1.png', 'Images/AKARUN_sticktoy_v2.2.png', 'Images/LogoCube_1.png','Images/AKARUN_cubeHolder_bottom.png', 'Images/AKARUN_cubeHolder_top.png', 'Images/AKARUN_cubePieces.png']
];
let imgCarouselCap = [
    ['Storyboard (Page 1)', 'Storyboard (Page 2)'],
    ['Rebecca Mock room in the League of Legends World 2016 animation'],
    ['Final Cube (3x3x3) with ~3 solutions', 'First draft of possible Logo applications. Sweater Front', 'Sweater Back', 'Key Chain with logo split onto the back and front', 'Version 1 Stick Toy: Has moveable joints. Can be shaped into different poses', 'Version 2.1 of Stick Toy (Blender3D)', 'Version 2.1 of Stick Toy: Will be able to stand and be posed (Blender3D)', 'Version 1 of Puzzle Cube: Originally 6x6x6 (Blender3D)', 'Final Version: Bottom holder for the puzzle cube', 'Final Version: Top holder for the puzzle cube', 'Final Version: Puzzle pieces']
];

var cInd0 = $('<li data-target="#ImgCarousel" data-slide-to="0" class="active"></li>');
var cImg = $('<img class="d-block w-100" src="" alt="slide">');

$(document).ready(function () {
    //Search Filter
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#ProjectsTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    //Hover Popover
    //$('[data-toggle="popover"]').popover();

    //Modal for Video
    $('a.vidLink').click(function () {
        //Get info for vid
        var vidName = $(this).text();
        var vid = $(this).data('src');

        //alert(id);
        //console.log(vidName, ": ", vid);

        //Set vid on Modal
        $("#videoModal").on('show.bs.modal', function () {
            $(".modal-title").text(vidName);
            $("#popupVid").attr('src', vid);
        });
    });

    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#videoModal").on('hide.bs.modal', function () {
        $("#popupVid").attr('src', '');
    });

    $(".tableImg").click(function () {
        let imgInd = $(this).data('index');
        $('.carousel-indicators li').remove();
        $('.carousel-inner div').remove();
        console.log(imgCarouselSrc[imgInd].length);
        for (let i = 0; i < imgCarouselSrc[imgInd].length; i++) {
            console.log(imgCarouselSrc[imgInd][i]);
            $('.carousel-inner').append('<div class="item"> <img class="d-block w-100" src="' + imgCarouselSrc[imgInd][i] + '" alt="Slide' + (i + 1) + '"> <div class="carousel-caption d-none d-md-block"><h5>' + imgCarouselCap[imgInd][i] + '</h5></div></div>');
            if (i == 0) {
                console.log();
                $('.carousel-indicators').append(cInd0);
                $('.item').attr("class", "item active");
            } else {
                $('.carousel-indicators').append('<li data-target="#ImgCarousel" data-slide-to=' + i + '"></li>');
            }
        }
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