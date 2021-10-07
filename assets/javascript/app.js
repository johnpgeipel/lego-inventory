const firebaseConfig = {
    apiKey: "AIzaSyAr65vTnU8UpqU71rVzXy3UN6NO14s6sjs",
    authDomain: "lego-inventory-a465a.firebaseapp.com",
    projectId: "lego-inventory-a465a",
    databaseURL: "https://lego-inventory-a465a-default-rtdb.firebaseio.com/",
    storageBucket: "lego-inventory-a465a.appspot.com",
    messagingSenderId: "977555458560",
    appId: "1:977555458560:web:9380f57eb01d3ae3ffe6e5"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$(document).ready(function() {
    database.ref().on('child_added', function(childsnapshot) {
        console.log(childsnapshot.val());
    
        var setId = childsnapshot.val().setId;
        var setName = childsnapshot.val().name;
        var pieces = childsnapshot.val().pieces;
        var img = childsnapshot.val().imgUrl;
        var theme = childsnapshot.val().theme;
        var themeLogo = childsnapshot.val().themeLogo;
        var pdfOne = childsnapshot.val().pdfOne;
        var pdfTwo = childsnapshot.val().pdfTwo;

        var newCard = $("<div class='col-lg-4 col-md-6 col-sm-6 col-12'>").append(
            $("<div class='card'>").append(
                $("<div class='img-container'>").append(
                    $("<img class='card-img-top' loading='lazy' alt=" + setName + ">").attr("src", img)
                ),
                $("<div class='card-body'>").append(
                    $("<h6 class='card-id'>").text(setId),
                    $("<img class='theme-logo' alt='theme logo'>").attr("src", themeLogo),
                    $("<div class='card-title-container'>").append(
                    $("<h5 class='card-title'>").text(setName)
                    ),
                    $("<hr>"),
                    $("<span>").text("Pieces: " + pieces),
                    pdfTwo ? $("<button class='btn-primary'>").append(
                        $("<a  class='card-btn'>").attr("href", pdfTwo).attr("target", "_blank").text("PDF 2"),
                    ) : '',
                    $("<button class='btn-primary'>").append(
                        !pdfTwo ?
                        $("<a  class='card-btn single-pdf-btn'>").attr("href", pdfOne).attr("target", "_blank").text("PDF") :
                        $("<a  class='card-btn'>").attr("href", pdfOne).attr("target", "_blank").text("PDF 1")
                    )
                )
            )
        );
        // $(".display-4").on('click', () => {
        //     $(".jumbotron-container").removeClass('jumbotron-full');
        //     $(".row").append(newCard);
        // });
        $(".row").append(newCard);
    });

    // add padding top to show content behind navbar
    $('body').css('padding-top', $('.navbar').outerHeight() + 'px');

    // detect scroll top or down
    if ($('.smart-scroll').length > 0) { // check if element exists
        var last_scroll_top = 0;
        $(window).on('scroll', function() {
            scroll_top = $(this).scrollTop();
            if(scroll_top < last_scroll_top) {
                $('.smart-scroll').removeClass('scrolled-down').addClass('scrolled-up');
            }
            else {
                $('.smart-scroll').removeClass('scrolled-up').addClass('scrolled-down');
            }
            last_scroll_top = scroll_top;
        });
    }
});