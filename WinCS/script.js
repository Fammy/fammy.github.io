document.onmouseup = HandleMouseClick;

var currentUrl = "about.html";

function Go()
{
    setTimeout("Boot();", 6000);
    Clock();
}

function Boot()
{
    Hide("boot");
    document.body.className = "winxp";
    Show("winxp");
}

function SetRowColor(elem, bgColor, fgColor)
{
    elem.style.backgroundColor = bgColor;
    elem.style.color = fgColor;
}

function SetBgImage(elem, image)
{
    elem.style.backgroundImage = "url(" + image + ")";
}

function HandleMouseClick(e)
{
    var mouseX;
    var mouseY;
    var winHeight;
    var invertedMouseY;

    if (e)
    {
        mouseX = e.clientX;
        mouseY = e.clientY;
        winHeight = window.innerHeight;
    }
    else
    {
        mouseX = event.clientX;
        mouseY = event.clientY;
        winHeight = document.body.offsetHeight;
    }

    invertedMouseY = winHeight - mouseY;

    // Firefox X
    if (browserOpen && mouseX >= 808 && mouseX <= 829 && mouseY >= 36 && mouseY <= 56)
    {
        Hide('browser');
        Hide('browsercontent');
        Hide('browserinput');
        Hide('browsertask');
        browserOpen = false;
    }
    // Firefox Go
    else if (browserOpen && mouseX >= 655 && mouseX <= 691 && mouseY >= 88 && mouseY <= 103)
    {
        var url = document.getElementById("url");
        if (url)
        {
            Navigate(url.value);
        }
    }
    // Firefox Home
    else if (browserOpen && mouseX >= 214 && mouseX <= 229 && mouseY >= 88 && mouseY <= 103)
    {
        Navigate("http://www.famularo.org/WinCS/about.html");
    }
    // Firefox Start Menu
    /*else if (menuExpanded && mouseX >= 10 && mouseX <= 109 && invertedMouseY >= 371 && invertedMouseY <= 389)
    {
        ShowBrowser();
        menuExpanded = false;
    }*/
    else
    {
        //alert(mouseX + ", " + mouseY + " :: " + (invertedMouseY));
    }

}

function ShowBrowser()
{
    Show('browser');
    Show('browsercontent');
    Show('browserinput');
    Show('browsertask');
    Hide('startmenu');
    ReplaceImage('start', 'start.png');
    browserOpen = true;
}

function Navigate(url)
{
    var iframe = document.getElementById("browserframe");
    if (iframe)
    {
        if (url.toLowerCase().substr(0, 7) != "http://")
        {
            url = "http://" + url;
        }
        iframe.src = url;
    }
    return false;
}

function HandleBodyClick()
{
    if (menuExpanded && !buttonClicked && !menuClicked)
    {
        Hide('startmenu');
        ReplaceImage('start', 'start.png');
        menuExpanded = false;
    }

    if (programs1Expanded && !programs1Clicked)
    {
        Hide('programs1');
        programs1Expanded = false;
    }

    programs1Clicked = false;
    buttonClicked = false;
    menuClicked = false;
}

function Clock()
{
    var time = document.getElementById("time");
    var dayofweek = document.getElementById("dayofweek");
    var date = document.getElementById("date");
    var d = new Date();
    var daysofweek = new makeArray('Sunday',
                                   'Monday',
                                   'Tuesday',
                                   'Wednesday',
                                   'Thursday',
                                   'Friday',
                                   'Saturday');

    if (time && dayofweek && date)
    {
        time.innerHTML = (d.getHours() % 12 == 0 ? "12" : d.getHours() % 12) + ":" + (parseInt(d.getMinutes()) < 10 ? "0" + d.getMinutes() : d.getMinutes()) + (d.getHours() >= 12 ? " PM" : " AM");
        dayofweek.innerHTML = daysofweek[DayOfWeek(d.getDate(), d.getMonth() + 1, d.getFullYear())];
        date.innerHTML = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
    }

    setTimeout("Clock()", 5000);
}

function ReplaceImage(id, src)
{
    var img = document.getElementById(id);

    if (img)
    {
        img.src = src;
    }
}

function Show(id)
{
    var e = document.getElementById(id);

    if (e)
    {
        e.style.display = 'block';
    }
}

function Hide(id)
{
    var e = document.getElementById(id);

    if (e)
    {
        e.style.display = 'none';
    }
}

// http://tech.irt.org/articles/js045/index.htm
function DayOfWeek(day,month,year) {
    var a = Math.floor((14 - month)/12);
    var y = year - a;
    var m = month + 12*a - 2;
    var d = (day + y + Math.floor(y/4) - Math.floor(y/100) +
             Math.floor(y/400) + Math.floor((31*m)/12)) % 7;
    return d + 1;
}
function makeArray()    {
    this[0] = makeArray.arguments.length;
    for (i = 0; i<makeArray.arguments.length; i++)
        this[i+1] = makeArray.arguments[i];
}
