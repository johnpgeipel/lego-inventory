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
    var arr;
    var starArr = [];
    var marvelArr = [];
    var technicArr = [];
    var creatorArr = [];
    var idArr = [];

    database.ref().on("value", function(snapshot) {
        arr = snapshot.val();
        // sorts objects into seperate arrays
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            item.array === "starArr" ? starArr.push(item) :
            item.array === "marvelArr" ? marvelArr.push(item) :
            item.array === "creatorArr" ? creatorArr.push(item) :
            technicArr.push(item);
            item.setId ? idArr.push(item.setId) : '';
        }

        // generates theme header and options for each theme array alphabetically
        const formOptions = ( arr ) => {
            
            arr.sort((a, b) => (a.name > b.name) ? 1 : -1)
            console.log(arr)

            $("#form-select-name").append(
                $("<option disabled unselectable='true'>").text(" "),
                $("<option disabled unselectable='true'>").text(arr[0].theme).attr("style", "font-weight: bold; font-size: 1rem;"),
                $("<option value='" + arr[0].array + "'>").text("All " + arr[0].theme + " Sets"),
            )
            
            arr.forEach(function(item) {
                $("#form-select-name").append(
                    $("<option value='" + item.setId + "'>").text(item.name)
                )
            })
        }

        // sorts setId for ID select form
        const sortId = ( arr ) => {
            arr.sort(function(a, b) {return a-b});

            arr.forEach(function(item) {
                // console.log(item);
                $("#form-select-id").append(
                    $("<option value='" + item + "'>").text(item)
                )
            })
        }

        const setColumn = ( arr ) => {
            // var column = $(".col-card");
            
        }
        // single card creation
        const newCard = ( data ) => {
            
            const card =
            $("<div class='card-col col-lg-4 col-md-6 col-sm-6 col-12'>").append(
            $("<div class='card'>").append(
                $("<div class='img-container'>").append(
                    $("<img class='card-img-top' loading='lazy' alt='" + data.name + "'>").attr("src", data.imgUrl)
                ),
                $("<div class='card-body'>").append(
                    $("<h6 class='card-id'>").text(data.setId),
                    $("<img class='theme-logo' alt='theme logo'>").attr("src", data.themeLogo),
                    $("<div class='card-title-container'>").append(
                    $("<h5 class='card-title'>").text(data.name)
                    ),
                    $("<hr>"),
                    $("<span>").text("Pieces: " + data.pieces),
                    data.pdfTwo ? $("<button class='btn-danger'>").append(
                        $("<a  class='card-btn'>").attr("href", data.pdfTwo).attr("target", "_blank").attr("rel", "noopener").text("PDF 2"),
                    ) : '',
                    $("<button class='btn-danger'>").append(
                        !data.pdfTwo ?
                        $("<a  class='card-btn single-pdf-btn'>").attr("href", data.pdfOne).attr("target", "_blank").attr("rel", "noopener").text("PDF") :
                        $("<a  class='card-btn'>").attr("href", data.pdfOne).attr("target", "_blank").attr("rel", "noopener").text("PDF 1")
                    )
                )
            )
            )
            $(".row").append(card);
            

        };
        // multiple card creation
        const newCards = ( item ) => {
            item.forEach( data => {
                newCard(data);
            });
        };

        // name select form logic
        $("#form-select-name").on("change", () => {
            var inputName = $("#form-select-name option:selected").val();
            var setArr;
            console.log(inputName);

            $(".card-col").remove();

            isNaN(inputName) &&
            inputName === "starArr" ? setArr = starArr :
            inputName === "marvelArr" ? setArr = marvelArr :
            inputName === "technicArr" ? setArr = technicArr :
            inputName === "creatorArr" ? setArr = creatorArr :
            inputName === "arr" ? setArr = arr : "";

            !isNaN(parseInt(inputName)) ?
            setArr = (
                arr.filter( item => {
                    console.log((item.setId === inputName) && item.setId);
                    return item.setId === inputName;
                    
                })
            ) : "";
                
            console.log(setArr);
            
            $("body").css("background", "#EEEEEE").css("transition", "background .4s ease");

            !isNaN(parseInt(setArr)) ?
            newCard(setArr) :
            newCards(setArr);

            console.log(setArr.length)

            setArr.length === 1 ? $(".card-col").addClass("card-col-one") :
            setArr.length > 1 ? $(".card-col").removeClass("card-col-one") : "";
        })
        // id select form logic
        $("#form-select-id").on("change", () => {
            var inputId = $("#form-select-id option:selected").val();
            var setArr;
            console.log(inputId);

            $(".card-col").remove();

            !isNaN(parseInt(inputId)) ?
            setArr = (
                arr.filter( item => {
                    // console.log((item.setId === inputId) && item.setId);
                    return item.setId === inputId;
                })
            ) : setArr = arr;

            console.log(setArr);
            $("body").css("background", "#EEEEEE").css("transition", "background .4s ease");
            
            !isNaN(parseInt(setArr)) ?
            newCard(setArr) :
            newCards(setArr);

            console.log(setArr.length)


            setArr.length === 1 ? $(".card-col").addClass("card-col-one") :
            setArr.length > 1 ? $(".card-col").removeClass("card-col-one") : "";
        })

        // populates select forms
        formOptions(creatorArr);
        formOptions(marvelArr);
        formOptions(starArr);
        formOptions(technicArr);
        sortId(idArr);

    }, function(error) {
        console.log("Error: " + error.code)
    });

    // ----------------- navBar js -----------------
    // add padding top to show content behind navbar
    // $('body').css('padding-top', $('.navbar').outerHeight() + 'px');
});