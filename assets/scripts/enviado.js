 (function($){
$(document).ready(function() {
      // Total seconds to wait
      var seconds = 5;

      function countdown() {
          seconds = seconds - 1;
          if (seconds < 0) {
              // Chnage your redirection link here
              window.location = "http://nobrefood.com.br/index.html";
          } else {
              // Update remaining seconds
              document.getElementById("countdown").innerHTML = seconds;
              // Count down using javascript
              window.setTimeout("countdown()", 1000);
          }
      }

      // Run countdown function
      countdown();
      
});

 })(jQuery);