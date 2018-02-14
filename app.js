fetch('https://pokeapi.co/api/v2/pokemon/?limit=949')
  .then(function(response) {
    //Turns the the JSON into a JS object
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    //Let's make some HTML!
    let html = `<h2><a href="${data.html_url}">${data.login}</a></h2>
      <p>${data.name}</p>
      <p>Followers: ${data.followers}</p>
    `;

    //Put that HTML on the page
    display.innerHTML = html;
  });
