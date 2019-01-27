function ToggleEnter(x)
{
    switch(x)
    {
        case 0:
            document.getElementById("LogBox2").style.display = "none";
            document.getElementById("LogBox3").style.display = "block";
            break;

        case 1:
            document.getElementById("LogBox3").style.display = "none";
            document.getElementById("LogBox2").style.display = "block";
            break;
    }
}