"use strict";


const IMDB_URL = `https://imdb-api.com/API/AdvancedSearch/${IMDB_KEY}?locations=Texas`;
const GLITCH_URL = 'https://grape-hill-leo.glitch.me/movies';
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
};

/* INVOKE IMDB FETCH FUNCTION */
imdbFetch(IMDB_URL);

/* Main Fetch Function */
function imdbFetch(url) {
    fetch(url)
        .then(response => response.json())
        .then(response => populateBody(response))
        .catch(err => console.error(err));
}

/* ADDING A MOVIE FETCH */
fetch(GLITCH_URL)
    .then(response => response.json())
    .then(response => console.log(response)) /* review was created successfully */
    .catch(error => console.error(error)); /* handle errors */


/* SELECT DIV FOR CARD POPULATION */
function populateBody(dataIn) {
    console.log(dataIn);

    $('#pop-body').html(createMovieCards(dataIn));
}

/* ITERATE THROUGH OBJECTS FUNCTION */
function createMovieCards(dataIn) {

    let html = '<div>';

    for (let i = 0; i < 5; i++) {
        html += cardForge(dataIn.results[i]);
    }

    html += '</div>';

    return html;
}

/* CREATE CARDS FUNCTION */
// language=HTML
function cardForge(dataIn) {
    let html = '';

    html += `
        <div id="card-parent" class="cards row col-3">
            <h5>Movie Name: ${dataIn.title}</h5>
            <div id="p-container" class="col-4">
                <img src="${dataIn.image}" alt="movie poster">
            </div>
            <ul class="col-5 justify-content-around">
                <li class="list-item">Rating: ${dataIn.imDbRating}</li>
                <li>Genre: ${dataIn.genres}</li>
            </ul>
            <div>
            </div>
        </div>`

    return html;
}

