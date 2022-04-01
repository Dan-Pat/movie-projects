"use strict";

const IMDB_URL = `https://imdb-api.com/API/AdvancedSearch/${IMDB_KEY}?locations=Texas`;
const GLITCH_URL = 'https://grape-hill-leo.glitch.me/movies';

renderPostForm();

/* INVOKE IMDB & GLITCH FETCH FUNCTIONS */
imdbFetch(IMDB_URL);
glitchFetch(GLITCH_URL);

/* PING IMDB API */
function imdbFetch(imdbObject) {
    fetch(imdbObject)
        .then(response => response.json())
        .then(response => populateBody(response))
        .catch(err => console.error(err));
}

/* PING GLITCH SERVER */
function glitchFetch(glitchObject) {
    fetch(glitchObject)
        .then(response => response.json())
        .then(response => populateBody(response)) /* review was created successfully */
        .catch(error => console.error(error)); /* handle errors */
}

/* SELECT DIV FOR IMDB & GLITCH CARD POPULATION */
function populateBody(dataIn) {

    if (dataIn.results) {

        $('#pop-body-imdb').html(createImdbCards(dataIn));

    } else {

        $('#pop-body-glitch').html(createGlitchCards(dataIn));

    }
}

/* ITERATE THROUGH IMDB OBJECTS */
function createImdbCards(dataIn) {

    let html = '<div>';

    for (let i = 0; i < 5; i++) {
        html += imdbCardForge(dataIn.results[i]);
    }

    html += '</div>';

    return html;
}

/* ITERATE THROUGH GLITCH OBJECTS */
function createGlitchCards(dataIn) {
    return dataIn.map((movie) => {
        return glitchCardForge(movie)
    }).join('');
}

/* CREATE IMDB CARDS */

// language=HTML
function imdbCardForge(dataIn) {

    return `
        <div id="card-parent" class="cards row col-3">
            <h5>Movie Name: ${dataIn.title}</h5>
            <div id="p-container" class="col-4">
                <img src="${dataIn.image}" alt="movie poster">
            </div>
            <ul class="col-5 justify-content-around">
                <li class="list-item">Rating: ${dataIn.imDbRating}</li>
                <li>Genre: ${dataIn.genres}</li>
            </ul>
        </div>`
}

/* CREATE IMDB CARDS */

// language=HTML
function glitchCardForge(dataIn) {

    return `
        <div id="card-parent" class="cards row col-3">
            <h5>Movie Name: ${dataIn.title}</h5>
            <div id="p-container" class="col-4">
                <img src="${dataIn.poster}" alt="movie poster">
            </div>
            <ul class="col-5 justify-content-around">
                <li class="list-item">Rating: ${dataIn.rating}</li>
                <li>Genre: ${dataIn.genre}</li>
            </ul>
            <a href="#actors" class="edit-button" data-id=${dataIn.id} type="button">edit movie</a>
            <button data-id=${dataIn.id} type='button' class='delete-button'>delete</button>
        </div>`
}

//language=HTML
function renderPostForm() {
    let postForm = `
        <div>
            <div class="row m-3" style="max-width: 50%">
                <input class="col-6 m-2" type="text" id="actors" placeholder="actors">
                <input class="col-6 m-2" type="text" id="director" placeholder="director">
                <input class="col-6 m-2" type="text" id="genre" placeholder="genre">
                <input class="col-6 m-2" type="text" id="plot" placeholder="plot">
                <input class="col-6 m-2" type="text" id="poster" placeholder="poster">
                <input class="col-6 m-2" type="text" id="rating" placeholder="rating">
                <input class="col-6 m-2" type="text" id="title" placeholder="title">
                <input class="col-6 m-2" type="text" id="year" placeholder="year">
                <button id="btn-submit-movie" type="button">add movie</button>
                <button id="btn-edit-movie" type="button">edit movie</button>
            </div>
        </div>`

    $('body').prepend(postForm);
    $('#btn-submit-movie').click(function () {
        let newMovie = {
            actors: $('#actors').val(),
            director: $('#director').val(),
            genre: $('#genre').val(),
            plot: $('#plot').val(),
            poster: $('#poster').val(),
            rating: $('#rating').val(),
            title: $('#title').val(),
            year: $('#year').val()
        }
        fetch(GLITCH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMovie)
        })
            .then(rez => rez.json())
            .then(data => data)
            .catch(err => console.log(err));
    })

    $('#edit-movie').click(function () {
            let editMovie = {
                title: $('#btn-edit-movie').val(),
            }


        }
    )
    $(document).on('click', '.delete-button', function () {

        fetch(`${GLITCH_URL}/${$(this).attr('data-id')}`, {method: 'DELETE'})
            .then(rez => rez.json())
            .catch(err => console.log(err));
    })
}

