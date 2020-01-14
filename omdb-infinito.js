var page = 0
var busqueda = "";
$("#boton").click(function () {
    busqueda = $("#busqueda")[0].value;
    $("#scrolls").empty();
    $("#scrolls").html('<img src="https://www.cattani.it/wp-content/uploads/2016/08/ajax-loading.gif" alt="loading" />');
    $.ajax({
        url: 'http://www.omdbapi.com/?s=' + busqueda + '&page=1&apikey=3aa482bb',
        success: function (response) {
            let listaPeliculas = $("#scrolls");
            $("#scrolls").css({ 'display': 'flex', 'flex-flow': 'row wrap', 'align-items': 'center' });
            $('#scrolls').fadeIn(1000).html("");
            $.each(response.Search, function (index, item) {
                listaPeliculas.append(
                    '<div class="card p-3" style="width: 18rem; margin: 1rem auto;" id="detalle">' +
                    '<img id="' + item.imdbID + '" class="card-img-top "  src="' + item.Poster + '" onclick="mostrarDetalle()">' +
                    '<div class="card-body" >' +
                    '<h3 class="card-title">' + item.Title + ' - ' + item.Year + '</h3> ' +
                    '<p class="card-text"></p></div></div>'
                );
            });
            page = 1;
        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });
});

$(window).scroll(function () {
    if ($(document).height() - $(this).height() - 100 < $(this).scrollTop()) {
        page++;
        $("#scrolls").append('<div id="carga"><img src="https://www.cattani.it/wp-content/uploads/2016/08/ajax-loading.gif" alt="loading" /></div>');
        $.ajax({
            url: 'http://www.omdbapi.com/?s=' + busqueda + '&page=' + page + '&apikey=3aa482bb',
            success: function (response) {
                let listaPeliculas = $("#scrolls");
                //$("#scrolls").css({ 'display': 'flex', 'flex-flow': 'row wrap;' });
                $.each(response.Search, function (index, item) {
                    $("#carga").fadeIn(1000).remove();
                    listaPeliculas.append(
                        '<div class="card p-3" style="width: 18rem; margin: 1rem auto;" id="detalle">' +
                        '<img id="' + item.imdbID + '" class="card-img-top"  src="' + item.Poster + '" onclick="mostrarDetalle()">' +
                        '<div class="card-body">' +
                        '<h3 class="card-title">' + item.Title + ' - ' + item.Year + '</h3> ' +
                        '<p class="card-text">' +
                        '<p class="card-text"></p></div></div>'
                    );
                });
            },
            error: function (req, status, error) {
                alert("Error try again");
            }
        });
    }
});

function mostrarDetalle() {
    let imdbID = event.target.id;
    $.ajax({
        url: 'http://www.omdbapi.com/?i=' + imdbID + '&apikey=3aa482bb',
        success: function (response) {
            $("#detalle").css({ 'display': 'flex' });
            $("#exampleModalLabel").empty();
            $("#exampleModalLabel").append(response.Title + '<br> -' + response.Year + '-');
            $("#exampleModalLabel").css({ 'text-align': 'center' });
            $("#imgdetalle").empty();
            $("#imgdetalle").attr("src", response.Poster);
            $("#imgdetalle").css({ 'height': '450px', });
            $("#director").empty();
            $("#director").append('Director: ' + response.Director);
            $("#genero").empty();
            $("#genero").append('Genero: ' + response.Genre);
            $("#nota").empty();
            $("#nota").append('Nota: ' + response.imdbRating);
            $('#exampleModal').modal('show');
        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });
}