"use strict";

/* Main Fetch Function */
// function coolFunc(dataIn) {
//
// }




let url = `https://imdb-api.com/API/AdvancedSearch/${IMDB_KEY}?locations=Texas`;

fetch(url)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

function populateBody(dataIn) {
    $("#pop-body").html(createMovieCards(dataIn));
}

function createMovieCards(dataIn) {
    let html = '<div>';
    for (let i = 0; i < 5; i++) {
        html += cardForge(dataIn[i]);
    }
    html += '</div>';
    return html;
}

// language=HTML
function cardForge(dataIn) {
    let html = '';
    html += `
        <div class="cards row col-3">
            <h5>Card</h5>
            <div id="p-container" class="col-4">

            </div>
            <ul class="col-5 justify-content-around">
                <li class="list-item">Movie Name: ${dataIn.title}</li>
                <li class="list-item">Still Image: ${dataIn.image}</li>
                <li class="list-item">Rating: ${dataIn.imDbRating}</li>
                <li class="list-item">Genre: ${dataIn.genres}</li>
            </ul>
            <div>
            </div>
        </div>`

    return html;
}
