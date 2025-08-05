const clickMe = (firstName, lastName) => {
  alert(`Thanks for logging in, ${firstName} ${lastName}!`);
}


$(document).ready(function() {
  $('.materialboxed').materialbox();
  $('.modal').modal();
  $('.collapsible').collapsible(); // Initialize collapsible

  // For login form submit
  $('#loginForm').submit(function(e) {
    e.preventDefault();
    const firstName = $('#first_name').val();
    const lastName = $('#last_name').val();
    $('#loginModal').modal('close');
    clickMe(firstName, lastName);
  });
});

const getProjects = () => {
   $.get('/api/projects',(response) => {
    if(response.statusCode==200){
     addCards(response.data);
   }
 })
}

const addCards = (projects) => {
  projects.forEach(project => {
    const cardHTML = `
      <div class="col s12 m4">
        <div class="card">
          <div class="card-image">
            <img src="${project.image}">
            <span class="card-title">${project.title}</span>
          </div>
          <div class="card-content">
            <p>${project.description}</p>
          </div>
          <div class="card-action">
            <a href="${project.link}" target="_blank">Learn More</a>
          </div>
        </div>
      </div>`;
    $('.row').first().append(cardHTML);
  });
};