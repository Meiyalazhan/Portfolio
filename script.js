// Script File

var menuBtn = document.querySelector('.menu-btn');
var navbarWrapper = document.querySelector('.navbar-wrapper');
var menuCancelBtn = document.querySelector('.menu-cancel-btn');
var menuLinks = document.querySelectorAll('.navbar-wrapper ul li a');

var mainNavbar = document.querySelector('.main-navbar');
var profileImage = document.querySelector('.about-img-container img');
var aboutContents = document.querySelector('.about .about-contents-wrapper');
var contactBtn = document.querySelector('button.contact-btn');

menuBtn.addEventListener('click', addClass);
function addClass(){
	navbarWrapper.classList.add('active');
	menuCancelBtn.classList.add('active');
	imageVisibility();
}

for(i = 0; i < menuLinks.length; i++){
	menuLinks[i].addEventListener('click', removeClass);
}
menuCancelBtn.addEventListener('click', removeClass);
function removeClass(){
	navbarWrapper.classList.remove('active');
	menuCancelBtn.classList.remove('active');
	imageVisibility();
}

window.addEventListener('scroll', scrollFunction);
window.addEventListener('load', scrollFunction);

function imageVisibility(){
	profileImage.classList.toggle('hide');
}

$('.portfolio-contents').magnificPopup({
	delegate: '.overlay a',
	type: 'image',
	gallery:{
		enabled: true
	}
})
