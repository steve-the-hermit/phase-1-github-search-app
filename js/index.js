// Fetch film data from the server
function fetchFilms() {
    return fetch('http://localhost:4000/films')
      .then((response) => response.json())
      .then((films) => {
        films.forEach((film) => {
          addFilmToList(film);
        });
      })
      .catch((error) => console.log(error));
  }
  
  // Add film to the film list
  function addFilmToList(film) {
    const filmList = document.querySelector('#films');
  
    const filmItem = document.createElement('li');
    filmItem.classList.add('film', 'item');
    filmItem.textContent = film.title;
    filmItem.addEventListener('click', (event) => {
      event.preventDefault();
      displayFilmDetails(film);
    });
  
    filmList.appendChild(filmItem);
  }
  
  // Display film details
  function displayFilmDetails(film) {
    const filmDetails = document.querySelector('#film-details');
  
    filmDetails.innerHTML = `
      <img src="${film.poster}" alt="${film.title} Poster">
      <h2>${film.title}</h2>
      <p>${film.description}</p>
      <p>Runtime: ${film.runtime} minutes</p>
      <p>Showtime: ${film.showtime}</p>
      <p>Available Tickets: ${film.capacity - film.tickets_sold}</p>
      <button id="buy-ticket">Buy Ticket</button>
    `;
  
    const buyTicketButton = document.querySelector('#buy-ticket');
    buyTicketButton.addEventListener('click', (event) => {
      event.preventDefault();
      buyTicket(film);
    });
  }
  
  // Buy ticket for a film
  function buyTicket(film) {
    const availableTickets = film.capacity - film.tickets_sold;
    if (availableTickets > 0) {
      film.tickets_sold++;
      const availableTicketsElement = document.querySelector('#film-details p:nth-child(4)');
      availableTicketsElement.textContent = `Available Tickets: ${film.capacity - film.tickets_sold}`;
  
      // Optional: Check if film is sold out and update the film item in the film list
      if (film.tickets_sold === film.capacity) {
        const filmItem = document.querySelector(`#films li:nth-child(${film.id})`);
        filmItem.classList.add('sold-out');
      }
    }
  }
  
  // Fetch films and populate the film list
  fetchFilms();
  