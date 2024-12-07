document.addEventListener('click', function(event) {
	var clickEffect = document.querySelector('.click-effect');
  var posX = event.clientX - clickEffect.offsetWidth / 2;
  var posY = event.clientY - clickEffect.offsetHeight / 2;

  clickEffect.style.left = posX + 'px';
  clickEffect.style.top = posY + 'px';
	clickEffect.style.transform = 'scale(1.3)';
	clickEffect.style.opacity = '1';
  
	setTimeout(function() {
	  clickEffect.style.transform = 'scale(0)';
	  clickEffect.style.opacity = '1';
	}, 200);
  });



const menuBtn = document.querySelector('.menu-btn');
const navbarWrapper = document.querySelector('.navbar-wrapper');
const menuCancelBtn = document.querySelector('.menu-cancel-btn');
const menuLinks = document.querySelectorAll('.navbar-wrapper ul li a');

const mainNavbar = document.querySelector('.main-navbar');
const profileImage = document.querySelector('.about-img-container img');
const aboutContents = document.querySelector('.about .about-contents-wrapper');
const contactBtn = document.querySelector('button.contact-btn');

menuBtn.addEventListener('click', toggleMenu);
menuCancelBtn.addEventListener('click', toggleMenu);
menuLinks.forEach(link => link.addEventListener('click', closeMenu));


function toggleMenu() {
  navbarWrapper.classList.toggle('active');
  menuCancelBtn.classList.toggle('active');
  toggleImageVisibility();
}

function closeMenu() {
  navbarWrapper.classList.remove('active');
  menuCancelBtn.classList.remove('active');
  toggleImageVisibility();
}

function toggleImageVisibility() {
  profileImage.classList.toggle('hide');
}


window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myScrollBar").style.width = scrolled + "%";
}

function sendMail() {
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_dzyb976";
  const templateID = "template_dyv65x5";

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        console.log(params);
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Your message sent successfully!!")

    })
    .catch(err=>console.log(err));

}