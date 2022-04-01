"use strict";

const IMDB_URL = `https://imdb-api.com/API/AdvancedSearch/${IMDB_KEY}?locations=Texas`;
const GLITCH_URL = 'https://grape-hill-leo.glitch.me/movies';
// const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(),
// };

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

    // console.log(dataIn);

    let html = '<div>';

    for (let i = 0; i < 5; i++) {
        html += glitchCardForge(dataIn[i]);
    }

    html += '</div>';

    return html;
}

/* CREATE IMDB CARDS */

// language=HTML
function imdbCardForge(dataIn) {

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

/* CREATE IMDB CARDS */

// language=HTML
function glitchCardForge(dataIn) {

    let html = '';

    html += `
        <div id="card-parent" class="cards row col-3">
            <h5>Movie Name: ${dataIn.title}</h5>
            <div id="p-container" class="col-4">
                <img src="${dataIn.poster}" alt="movie poster">
            </div>
            <ul class="col-5 justify-content-around">
                <li class="list-item">Rating: ${dataIn.rating}</li>
                <li>Genre: ${dataIn.genre}</li>
            </ul>
            <div>
            </div>
        </div>`

    return html;
}