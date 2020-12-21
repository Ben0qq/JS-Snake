const nickInput = document.getElementById("nick");
function start()
{
    window.localStorage.removeItem("currentUser");
    window.localStorage.setItem("currentUser", nickInput.value);
    location.replace("zad2.html");
}