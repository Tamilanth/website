window.onload = () => {
    const body = document.getElementById("root");
    const header = document.getElementById("header");
    const themeButton = document.getElementById("theme");
    let darkmode = false;
    let i = 0, j = false;
    function animate_to_dark()
    {
	i++;
	j = true;
	body.style.color = `rgba(255, 255, 255, ${i/100})`;
	body.style.background = `rgba(0, 0, 0, ${i/100})`;
	header.style.background = `rgba(0, 0, 0, ${i/100 - 0.05})`;
	themeButton.style.opacity = `${i/100}`;
	if (i == 100)
	{
	    clearInterval(b);
	    j = false;
	    i = 0;
	}

    }

    function animate_to_light()
    {
	i++;
	j = true;
	body.style.color = `rgba(0, 0, 0, ${i/100})`;
	body.style.background = `rgba(255, 255, 255, ${i/100})`;
	header.style.background = `rgba(255, 255, 255, ${i/100 - 0.05})`
	if (i == 100)
	{
	    clearInterval(b);
	    j = false;
	    i = 0;
	}

    }
   
    themeButton.addEventListener("click", () => {
	if (j)
	    clearInterval(b);
	
	if (!darkmode)
	{
	    header.style.boxShadow = "8px 8px 16px black";
	    b =  setInterval(animate_to_dark,10);
	    darkmode = true;
	 
	}
	else
	{
	    header.style.boxShadow = "8px 8px 16px #bababa, -8px -8px 16px #ffffff";
	    b =  setInterval(animate_to_light,10);
	    darkmode = false;
	}
    });
}
