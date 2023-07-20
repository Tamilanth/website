window.onload = () => {
	const body = document.getElementById("root");
	const header = document.getElementById("header");
    const main = document.getElementsByTagName("main");
	const menuIcon = document.getElementById("menuIcon");
	const themeButton = document.getElementById("theme");
	const menu = document.getElementById("menu");

	menu.style.left = toString(window.innerWidth - 1000) + "px";


	window.requestAnimationFrame = window.requestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.webkitRequestanimationframe
		|| window.msRequestAnimationFrame
		|| function (f) { return setTimeout(f, 1000 / 60) } // simulate calling code 60

	window.cancelAnimationFrame = window.cancelAnimationFrame
		|| window.mozCancelAnimationFrame
		|| function (requestID) { clearTimeout(requestID) } //fall back



	{

		let i = 0, animation_id = 0;
		let darkmode = false;
		let is_incomplete = false;

		function animate_to_dark() {

			i++;
			is_incomplete = true;
			body.style.color = `rgba(255, 255, 255, ${i / 100})`;
			body.style.background = `rgba(0, 0, 0, ${i / 100})`;
			header.style.background = `rgba(0, 0, 0, ${i / 100 - 0.15})`;
			themeButton.style.filter = `invert(${i}%)`;
			themeButton.style.opacity = `${i / 100}`;
			if (i >= 100) {
				window.cancelAnimationFrame(animation_id);
				is_incomplete = false;
			    i = 0;
			    return;
			}
		    animation_id = window.requestAnimationFrame(animate_to_dark);

		}

		function animate_to_light() {
			i++;
			is_incomplete = true;
			body.style.color = `rgba(0, 0, 0, ${i / 100})`;
			body.style.background = `rgba(255, 255, 255, ${i / 100})`;
			header.style.background = "#e0e0e0";
			header.style.opacity = `${i / 100 - 0.05}`;
			if (i >= 100) {
				window.cancelAnimationFrame(animation_id);
				is_incomplete = false;
			    i = 0;
			    return;
			}
		    animation_id = window.requestAnimationFrame(animate_to_light);

		}

		/*
		  Event listener for  themebutton click
	
		*/

		themeButton.addEventListener("click", () => {
			if (is_incomplete) {
				window.cancelAnimationFrame(animation_id);
				is_incomplete = false;
				header.style.opacity = '0.95';
				themeButton.style.opacity = '1';
				i = 0;
			}

			if (!darkmode) {
				header.style.boxShadow = "8px 8px -8px -8px black";
				animation_id = window.requestAnimationFrame(animate_to_dark);
				header.style.border = "inset #02e2e6 1px";
				darkmode = true;

			}
			else {
				header.style.boxShadow = "8px 8px -8px -8px #ffffff";
				header.style.borderWidth = "0px";
				themeButton.style.filter = "invert(0%)";
				animation_id = window.requestAnimationFrame(animate_to_light);
				darkmode = false;
			}
		});
	}

	/*
	
	  Event listerner for menuIcon
	
	*/
/*
    {


	let i = 0, animation_id = 0;
	let is_incomplete = false;


/*	function blur() {
	    i += 6;
	    header.style.filter = `blur(${i/30}px)`;
	    main[0].style.filter = `blur(${i/30}px)`;
	    if (i >=72)
	    {
		window.cancelAnimationFrame(animation_id);
		is_incomplete = false;
		header.style.opacity = '1';
		header.style.background = "#e0e0e0";
		return;
	    }
	   animation_id =  requestAnimationFrame(blur);

	}

	    function unblur()
	{
	    i -=6;
		header.style.filter = `blur(${i/30}px)`;
		main[0].style.filter = `blur(${i/30}px)`;
		if (i <= 0)
		{
		    window.cancelAnimationFrame(animation_id);
		    is_incomplete = false;
		    header.style.opacity = '1';
0		    header.style.background = "#e0e0e0";
		    return;
		}
	    animation_id =  requestAnimationFrame(unblur);
	    }


		let is_menu_open = false;

	menuIcon.addEventListener("click", () => {
	    if (is_incomplete) {
		window.cancelAnimationFrame(animation_id);
		is_incomplete = false;
		is_menu_open ? i = 72 : i = 0 ;
	    }
			if (is_menu_open) {
			    requestAnimationFrame(unblur);
				is_menu_open = false;
			}
	    else {
	
				menu.style.display = 'block';
		requestAnimationFrame(blur);
		header.style.backgroundColor = '#e0e0e0;'
				is_menu_open = true;
	    }
	  
		});


	}*/
}

