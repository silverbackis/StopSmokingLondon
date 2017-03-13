(function($, alert){
  var $emailCard = $("#emailCard"),
  $emailError = $("#emailError"),
  $emailThanks = $("#emailThanks"),
  $emailForm = $('#emailForm');

  $emailForm.submit(function (e) {
      e.preventDefault();
      $.getJSON(
      this.action + "?callback=?",
      $(this).serialize(),
      function (data) {
          if (data.Status === 400) {
              $emailCard.addClass("card-outline-warning").removeClass("card-outline-success");
              $emailError.html("Sorry, the email entered appears to be invalid. Please check it and try again.");
          } else { // 200
              $emailCard.removeClass("card-outline-warning").addClass("card-outline-success");
              $emailError.empty();
              $emailThanks.show();
              $emailForm.hide();
          }
      });
  });
})(jQuery, BootstrapModalAlerts.alert);
  