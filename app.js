// https://pokeapi.co/api/v2/pokemon/?limit=949
'use strict'
var searchForm = $('#formSearch');

searchForm.on('submit', function(element) {
  element.preventDefault();
  var inputSearch = $('#inputSearch').val()
  fetch(`https://pokeapi.co/api/v2/pokemon/${inputSearch}/`)
  .then(function(response) {
    //Turns the the JSON into a JS object
    return response.json();
  })
  .then(function(data) {
    // Saco el ID según el pokemon elegido
    // let pokeUrl = data.forms[0].url;
    // let lastSlash = pokeUrl.lastIndexOf('/', pokeUrl.length - 1);
    // let penultimateSlash = pokeUrl.lastIndexOf('/', lastSlash - 1);
    // let pokeId = pokeUrl.slice(penultimateSlash, lastSlash)
    // Creo un container para mi pokemon
    let container = $('<div>').addClass('pokemon');
    
    let image = $('<img>').attr('src', `https://pokeapi.co/media/img/${data.id}.png`);
    let title = $('<h2>').text(data.name);
    container.append(image, title);
    $('#poke-container').html(container);
    console.log(data);
    description(data);
  });
});

function description(pokeData)  {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokeData.id}/`)
  .then(function(response) {
    //Turns the the JSON into a JS object
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });
};

// searchForm.on('submit', function(element) {
//   element.preventDefault();
//   let inputSearch = $('#inputSearch').val()
//   fetch(`https://pokeapi.co/api/v2/pokemon/${inputSearch}`)
//   .then(function(response) {
//     //Turns the the JSON into a JS object
//     return response.json();
//   })
//   .then(function(data) {
//     data.results.forEach(poke => {
//       let pokeUrl = poke.url;
//       let lastSlash = poke.url.lastIndexOf('/', pokeUrl.length - 1);
//       let penultimateSlash = poke.url.lastIndexOf('/', lastSlash - 1);
//       let pokeId = pokeUrl.slice(penultimateSlash, lastSlash)
//       let container = $('<div>').addClass('pokemon');
      
//       let image = $('<img>').attr('src', `https://pokeapi.co/media/img/${pokeId}.png`);
//       let title = $('<h2>').text(poke.name);
//       container.append(image, title);
//       $('#poke-container').append(container);
//     })
//     console.log(data.results);
//   });
// });