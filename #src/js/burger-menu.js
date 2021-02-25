// HAMBURGER MENU

var body = document.querySelector('body');
var overlay = document.querySelector('.overlay');
var navIcon = document.querySelector('.menu-btn');
var burgerNav = document.querySelector('.burger__block');
var closeBurger = document.querySelector('.close-burger');

navIcon.addEventListener('click', function() {
	this.classList.add('open');
	overlay.classList.add('show');
	burgerNav.classList.add('show');
	body.classList.add('overflow-hidden');
});

function closeNav() {
	navIcon.classList.remove('open');
	overlay.classList.remove('show');
	burgerNav.classList.remove('show');
	body.classList.remove('overflow-hidden');
}

overlay.addEventListener('click', closeNav);

closeBurger.addEventListener('click', closeNav);

// ==========