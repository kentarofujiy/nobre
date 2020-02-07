 (function($){
$(document).ready(function() {
var hiddencards = document.getElementsByClassName("card-hidden");
var list = document.getElementsByClassName("nobre-card");
var especiais = document.getElementsByClassName("especiais");
var abertas = document.getElementsByClassName("abertas");
var fechadas = document.getElementsByClassName("fechadas");
var salgados = document.getElementsByClassName("salgados");


$( "#especiais, #especiais1" ).click(function() {
$( hiddencards ).removeClass( "card-hidden" );
$( list ).not(especiais).addClass( "card-hidden" );
});

$( "#abertas, #abertas1" ).click(function() {
$( hiddencards ).removeClass( "card-hidden" );
$( list ).not(abertas).addClass( "card-hidden" );
});
$( "#fechadas, #fechadas1" ).click(function() {
$( hiddencards ).removeClass( "card-hidden" );
$( list ).not(fechadas).addClass( "card-hidden" );
});
$( "#salgados, #salgados1" ).click(function() {
$( hiddencards ).removeClass( "card-hidden" );
$( list ).not(salgados).addClass( "card-hidden" );
});
$( "#todas, #todas1" ).click(function() {
$( hiddencards ).removeClass( "card-hidden" );
});

$( window ).scroll(function() {
if ( $('#cards').visible('partial') == true ) {
  $('#dropnobre').addClass("dropon");
} else {
     $('#dropnobre').removeClass("dropon");
}
  });

  $( "#especiais, #abertas, #fechadas, #salgados, #todas" ).click(function() {
    $('html, body').animate({
                    scrollTop: $("#target").offset().top
                }, 2000);
});
  });

 })(jQuery);