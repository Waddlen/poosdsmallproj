//Index Functions
function toggleEnter(x)
{
    switch(x)
    {
        case 0:
            document.getElementById("LogBox3").style.display = "none";
            document.getElementById("LogBox4").style.display = "block";
            break;

        case 1:
            document.getElementById("LogBox4").style.display = "none";
            document.getElementById("LogBox3").style.display = "block";
            break;
    }
}

function passVisiblity()
{
    var x = document.getElementById("pass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}