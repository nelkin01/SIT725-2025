
$(document).ready(function () {
  $('.materialboxed').materialbox();
  $('.modal').modal();
  $('.collapsible').collapsible();

  $('#loginForm').submit(function (e) {
    e.preventDefault();
    const userData = {
      firstName: $('#first_name').val(),
      lastName: $('#last_name').val(),
      email: $('#email').val(),
    };

    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: JSON.stringify(userData),
      contentType: 'application/json',
      success: function (response) {
        $('#loginModal').modal('close');
        alert(`Thanks for logging in, ${userData.firstName} ${userData.lastName}!`);
      },
      error: function (xhr) {
        alert('Failed to submit login data');
      },
    });
  });
});
