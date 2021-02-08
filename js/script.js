
// SCROLL HEADER

window.onscroll = function() {myFunction()};

var header = document.querySelector(".main-header"); 
var headerWrap = document.querySelector('.header-wrap');
var sticky = header.offsetTop; 
var section = document.querySelector('.first-screen');

function myFunction() {
	if (window.pageYOffset > sticky) {
		header.classList.add("header--fixed");
	} else {
		header.classList.remove("header--fixed");
	}
};

// ==========




// BTN UP

var scrolled;
var timer;

document.querySelector('.btn-up').onclick = function() {
	scrolled = window.pageYOffset;
	scrollToTop();
}

function scrollToTop() {
	if(scrolled > 0) {
		window.scrollTo(0, scrolled);
		scrolled = scrolled - 100;
		timer = setTimeout(scrollToTop, 20);
	}
	else {
		clearTimeout(timer);
		window.scrollTo(0, 0);
	}
};

// ==========




// ANCHORS

// var t;
// function up() {
// 	var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
// 	if (top > 0) {
// 		window.scrollBy(0, -150);
// 		t = setTimeout('up()', 20);
// 	} else clearTimeout(t);
// 	return false;
// }

// $(document).ready(function () {
// 	$(".head__menu").on("click", "a", function (event) {
// 		//отменяем стандартную обработку нажатия по ссылке
// 		event.preventDefault();
// 		//забираем идентификатор бока с атрибута href
// 		var id = $(this).attr('href'),
// 			//узнаем высоту от начала страницы до блока на который ссылается якорь
// 			top = $(id).offset().top;
// 		//анимируем переход на расстояние - top за 1500 мс
// 		$('body,html').animate({ scrollTop: top }, 600);
// 	});
// });

// ==========




// PHONE NUMBER

var selector = document.querySelectorAll('input[type="tel"]');

var im = new Inputmask("+7-(999)-999-99-99");
im.mask(selector);

// ==========




window.addEventListener('DOMContentLoaded', () => {
	modals();
});