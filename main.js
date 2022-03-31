"use strict"

/* Main Fetch Function */
// function getUserLastPushEvent(username) {
//
// }


let url = `https://imdb-api.com/API/AdvancedSearch/${IMDB_KEY}?locations=Texas`;

fetch(url)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

