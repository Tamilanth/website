window.onload = () => {

	const body = document.getElementById("root");
	const header = document.getElementById("header");
	const main = document.getElementsByTagName("main");
	const menuIcon = document.getElementById("menuIcon");
	const themeButton = document.getElementById("theme");
	const menu = document.getElementById("menu");

	let darkmode = false;
	let is_menu_open = false;
	/*menu.style.left = toString(window.innerWidth - 1000) + "px";*/


	window.requestAnimationFrame = window.requestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.webkitRequestanimationframe
		|| window.msRequestAnimationFrame
		|| function (f) { return setTimeout(f, 1000 / 60) } // simulate calling code 60

	window.cancelAnimationFrame = window.cancelAnimationFrame
		|| window.mozCancelAnimationFrame
		|| function (requestID) { clearTimeout(requestID) } //fall back


		let i_theme = 0, animation_id_theme = 0;
		let is_incomplete_theme = false;

		function animate_to_dark() {

		    i_theme++;
		//   if (!is_menu_open)
			body.style.color = `rgba(255, 255, 255, ${i_theme / 100})`;
			body.style.background = `rgba(0, 0, 0, ${i_theme / 100})`;
			header.style.background = `rgba(0, 0, 0, ${i_theme / 100 - 0.15})`;
			themeButton.style.filter = `invert(${i_theme}%)`;
			menuIcon.style.filter = `invert(${i_theme}%)`;
			themeButton.style.opacity = `${i_theme / 100}`;
			if (i_theme >= 100) {
					window.cancelAnimationFrame(animation_id_theme);
					is_incomplete_theme = false;
					i_theme = 0;
					return;
				}
			animation_id_theme = window.requestAnimationFrame(animate_to_dark);

		}

		function animate_to_light() {
		    i_theme++;
		    //if (!is_menu_open)
			body.style.color = `rgba(0, 0, 0, ${i_theme/ 100})`;
			body.style.background = `rgba(255, 255, 255, ${i_theme / 100})`;
			header.style.background = "#e0e0e0";
			header.style.opacity = `${i_theme / 100 - 0.05}`;
			if (i_theme >= 100) {
			    window.cancelAnimationFrame(animation_id_theme);
				is_incomplete_theme = false;
				i_theme = 0;
				return;
			}
			animation_id_theme = window.requestAnimationFrame(animate_to_light);

		}

		/*
		  Event listener for  themebutton click
	
		*/

	    themeButton.addEventListener("click", () => {
			if (is_incomplete_theme) {
				window.cancelAnimationFrame(animation_id_theme);
				is_incomplete_theme = false;
				header.style.opacity = '0.95';
				themeButton.style.opacity = '1';
				i_theme = 0;
			}

		if (!darkmode) {
		  
				is_incomplete_theme = true;
				header.style.boxShadow = "8px 8px -8px -8px black";
				animation_id_theme = window.requestAnimationFrame(animate_to_dark);
				header.style.border = "inset #02e2e6 1px";
				darkmode = true;

			}
		else {
		   
				is_incomplete_theme = true;
				header.style.boxShadow = "8px 8px -8px -8px #ffffff";
				header.style.borderWidth = "0px";
				themeButton.style.filter = "invert(0%)";
				menuIcon.style.filter = "invert(0%)";
				animation_id_theme = window.requestAnimationFrame(animate_to_light);
				darkmode = false;
			}
		});

	/*
	
	  Event listerner for menuIcon
	
	*/




		let i = 100, animation_id = 0;
		let is_incomplete = false;


		function blur() {

			i -= 5;
		    main[0].style.color = darkmode ? `rgba(224, 224, 224,${i / 100})`: `rgba(0, 0, 0,${i / 100})` ;  
			menu.style.opacity = `{(100 - i)/100}`;
		    if (i <= 0) {
				window.cancelAnimationFrame(animation_id);
			is_incomplete = false;

				return;
			}
			animation_id = requestAnimationFrame(blur);

		}

		function unblur(){

			i += 5;
		    main[0].style.color = darkmode ? `rgba(224, 224, 224,${i / 100})`:`rgba(0, 0, 0,${i / 100})`;
		    menu.style.opacity = `{(100 - i)/100}`;
		    
			if (i >= 100) {
				window.cancelAnimationFrame(animation_id);
				is_incomplete = false;
				return;
			}
			animation_id = requestAnimationFrame(unblur);
		}

    menuIcon.addEventListener("click", () => {
			if (is_incomplete) {
				main[0].style.color = darkmode ? `rgba(224, 224, 224,0)`: `rgba(0, 0, 0,0)` ;
				window.cancelAnimationFrame(animation_id);
				is_incomplete = false;
				i = is_menu_open ? 100 : 0;
			
			}

			if (is_menu_open) {
			
				//menu.style.opacity = '1';
				animation_id = requestAnimationFrame(unblur);
			    is_menu_open = false;
			    menu.style.display = "none";
			}
	else {
	    menu.style.display = 'block';
			    menu.style.background = "black";
			 			  	    
				animation_id = requestAnimationFrame(blur);
			    is_menu_open = true;
			    
			}

		});

}

