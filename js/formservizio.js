$(document).ready(ready);

function ready() {
    var GET = {};
    var query = window.location.search.substring(1).split("&");
    for (var i = 0, max = query.length; i < max; i++) {
        if (query[i] === "") // check for trailing & with no param
            continue;
        var param = query[i].split("=");
        GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
    }
    buildSidebar("services", GET["id"]);
    var orientationFirst = "";
    var orientationSecond = "";
    $.ajax({
        method: "POST"
        , dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "/php/stringData.php", //Relative or absolute path to file.php file
        data: {
            id: "service_categories"
        }
        , success: function (response) {
            orientationFirst += "<li><a href='categorie-item.html?item=service_categories'>" + response[0].value + "</a></li>";
        }
        , error: function (request, error) {
            console.log("Error");
        }
    });
    $.ajax({
        method: "POST"
        , dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "/php/serviceData.php", //Relative or absolute path to file.php file
        data: {
            id: GET["id"]
        }
        , success: function (response) {
            orientationSecond = "<li><a href='introductory.html?category=" + response[0].category + "&item=service_categories'>" + response[0].category_name + "</a></li><li><a href='servizio.html?id=" + response[0].id_serv + "&item=service_categories'>" + response[0].name + "</a></li><li class='active'>Form di sottoscrizione del servizio " + response[0].name + "</li>";

            $(".sectionTitle").html(response[0].name);
            $("#servizioss").html(response[0].name);

        }
        , error: function (request, error) {
            console.log("Error");
        }
    });

    $(document).ajaxStop(function () {
        $("#orientation").html(orientationFirst + orientationSecond);
    });
}