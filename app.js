// https://pokeapi.co/api/v2/pokemon/?limit=949

'use strict';
var searchForm = $('#searchForm');
searchForm.on('click', function(element) {
  element.preventDefault();
  var inputSearch = $('#inputSearch').val();
  let container = $('<div>').addClass('col-xs-12 col-md-4 col-md-offset-4 pokemon');
  fetch(`https://pokeapi.co/api/v2/pokemon/${inputSearch}/`)
    .then(function(response) {
    // Turns the the JSON into a JS object
      return response.json();
    })
    .then(function(data) {
      // console.log(data);
    // Saco el ID según el pokemon elegido
    // let pokeUrl = data.forms[0].url;
    // let lastSlash = pokeUrl.lastIndexOf('/', pokeUrl.length - 1);
    // let penultimateSlash = pokeUrl.lastIndexOf('/', lastSlash - 1);
    // let pokeId = pokeUrl.slice(penultimateSlash, lastSlash)
    // Creo un container para mi pokemon

      let image = $('<img class = "imgPoke">').attr('src', `https://pokeapi.co/media/img/${data.id}.png`);
      let title = $('<h2 class="name">').text(data.name);
      let height = $('<div class="col-md-5 caract"><p>').text('Altura: ' + data.height / 10 + ' m');
      let weight = $('<div class="col-md-5 caract"><p>').text('Peso: ' + data.weight / 10 + ' kg');

      container.append(title, image, height, weight);
      // obtener la habilidad
      data.abilities.forEach(function(element) {
        if (element.is_hidden === true) {
          container.append('<div class="col-md-5 caract"><p>Habilidad: ' + element.ability.name + '</p></div>');
        }
      });
      $('#poke-container').html(container);
      // para obtener la descripción
      return fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}/`);
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // para obtener el tipo de pokemon
      data.genera.forEach(function(element) {
        if (element.language.name === 'es') {
          let category = $('<div class="caractGenus col-md-6"><p>').text('Categoría: ' + element.genus);
          container.append(category);
        }
      });
      data.flavor_text_entries.forEach(function(element) {
        if (element.language.name === 'es' && element.version.name === 'omega-ruby') {
          $('.imgPoke').after('<p class ="description">' + element.flavor_text + '</p>');
        }
      });
    }).catch(function(error) {
    });
});

/* function description(pokeData)  {
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeData}/`)
  .then(function(response) {
    //Turns the the JSON into a JS object
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    let description = data.flavor_text_entries[21].flavor_text;
    console.log(description);
  });
};*/

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
