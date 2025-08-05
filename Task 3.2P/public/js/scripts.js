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
