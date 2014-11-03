$(document).ready(function(){
 $('.js-menu-button').click(function(){
 	$('.js-app-container').toggleClass('open-menu');
	$('.categories-menu').hide();
	$('.app-menu').animate({scrollTop:$('.app-menu .topcoat-list').offset().top}, 'slow');
 });
 $('.menu-item').click(function(){
 	$('.js-app-container').toggleClass('open-menu');
	$('.categories-menu').hide();
 });
  $('.categories-button').click(function(){
 	$('.categories-menu').toggle();
 });
 setTimeout(function() {
 	$('.loader').hide();
}, 8000);
 setTimeout(function() {
	$('.categories-loaded').show();
},8500);
});