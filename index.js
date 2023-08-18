window.onload = () => {
	// Getting necessary DOM elements
	const body = document.getElementById("root");
	const header = document.getElementById("header");
	const main = document.getElementsByTagName("main");
	const menuIcon = document.getElementById("menuIcon");
	const themeButton = document.getElementById("theme");
    const menu = document.getElementById("menu");
    const anchors = document.getElementsByTagName("a");
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


	let i_theme = 2, animation_id_theme = 0;
	let is_incomplete_theme = false;

	function animate_to_dark() {

		i_theme += 2;
		body.style.color = `rgba(255, 255, 255, ${i_theme / 100})`;
	    body.style.background = `rgba(0, 0, 0, ${i_theme / 100})`;
	    header.style.background = `rgba(0, 0, 0, ${i_theme / 100 - 0.15})`;
	    for (let x of anchors) {
		x.style.background = `rgba(0, 0, 0, ${i_theme / 100 - 0.15})`;
	    }
		themeButton.style.filter = `invert(${i_theme}%)`;
		menuIcon.style.filter = `invert(${i_theme}%)`;
		themeButton.style.opacity = `${i_theme / 100}`;
		menu.style.color = `rgba(255, 255, 255, ${i_theme / 100})`;

		if (i_theme >= 100) {
			window.cancelAnimationFrame(animation_id_theme);
			is_incomplete_theme = false;
			i_theme = 2;
			return;
		}
		animation_id_theme = window.requestAnimationFrame(animate_to_dark);

	}

	function animate_to_light() {
		i_theme += 2;
		//if (!is_menu_open)
		body.style.color = `rgba(0, 0, 0, ${(i_theme) / 100})`;
		body.style.background = `rgba(0, 0, 0, ${(100 - i_theme) / 100})`;
	    for (let x of anchors) {
		x.style.opacity = `${i_theme / 100 - 0.05}`;
	    }
		header.style.opacity = `${i_theme / 100 - 0.05}`;
		menu.style.color = `rgba(255, 255, 255, ${i_theme / 100})`;
		if (i_theme >= 100) {
			window.cancelAnimationFrame(animation_id_theme);
			is_incomplete_theme = false;
			i_theme = 2;
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
			i_theme = 2;
		}

		if (!darkmode) {
			if (!is_menu_open) {
				main[0].style.color = `rgba(255, 255, 255,100)`;
			}
			is_incomplete_theme = true;
			header.style.boxShadow = "8px 8px -8px -8px black";
			animation_id_theme = window.requestAnimationFrame(animate_to_dark);
		    header.style.border = "inset #02e2e6 1px";
		    for (let x of anchors) {
			x.style.border = "inset #02e2e6 1px";
		    }
			darkmode = true;

		}
		else {
			if (!is_menu_open) {
				main[0].style.color = `rgba(0,0, 0,100)`;
			}
		    header.style.background = "#e0e0e0";
			is_incomplete_theme = true;
			header.style.boxShadow = "8px 8px -8px -8px #ffffff";
		    header.style.borderWidth = "0px";
		    for (let x of anchors) {
			x.style.borderWidth = "0px";
			x.style.background = "#e0e0e0";
			x.style.boxShadow = "8px 8px -8px -8px #ffffff";
		    }
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
		main[0].style.color = darkmode ? `rgba(224, 224, 224,${i / 100})` : `rgba(0, 0, 0,${i / 100})`;
		// menu.style.backgroundColor = darkmode ? `rgba(224, 224, 224,${(100 -i )/ 100})`: `rgba(0, 0, 0,${(100 -i) / 100})`;
		menu.style.color = darkmode ? `rgba(254, 254, 254,${(100 - i) / 100})` : `rgba(0, 0, 0,${100 - i / 100})`;
		menu.style.opacity = `{(100 - i)/100}`;
		if (i <= 0) {
			window.cancelAnimationFrame(animation_id);
			is_incomplete = false;
			i = 0;
			menu.style.opacity = '1';
			return;
		}
		animation_id = requestAnimationFrame(blur);

	}

	function unblur() {

		i += 5;
		main[0].style.color = darkmode ? `rgba(224, 224, 224,${i / 100})` : `rgba(0, 0, 0,${i / 100})`;

		menu.style.opacity = `{(100 - i)/100}`;

		if (i >= 100) {
			window.cancelAnimationFrame(animation_id);
			is_incomplete = false;
			menu.style.opacity = '0';
			i = 100;
			menu.style.display = "none";
			is_menu_open = false;
			return;
		}
		animation_id = requestAnimationFrame(unblur);
	}

	menuIcon.addEventListener("click", () => {
		if (is_incomplete) {
			main[0].style.color = darkmode ? `rgba(224, 224, 224,100)` : `rgba(0, 0, 0,100)`;
			main[0].style.backgroundColor = !is_menu_open ? (darkmode ? "black" : "white") : main[0].style.backgroundColor;
			window.cancelAnimationFrame(animation_id);
			is_incomplete = false;
			i = is_menu_open ? 0 : 100;
			menu.style.opacity = is_menu_open ? '1' : '0';
			main[0].style.color = is_menu_open ? '1' : '1'

		}

	    if (is_menu_open) {
		is_incomplete = true;
			menu.style.opacity = '0';

			animation_id = requestAnimationFrame(unblur);

		}
	    else {

		is_incomplete = true;

			menu.style.display = 'block';
			animation_id = requestAnimationFrame(blur);
			is_menu_open = true;

		}

	});

}

