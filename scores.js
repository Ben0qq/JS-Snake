score = document.getElementById("scores");

nick = window.localStorage.getItem("currentUser");
cScore = Number(window.localStorage.getItem("currentScore"));
bestScore = Number(window.localStorage.getItem("bestScore"));
bestUser = window.localStorage.getItem("bestUser");
console.log(cScore);
window.localStorage.removeItem("currentUser");
window.localStorage.removeItem("currentScore");
window.localStorage.removeItem("bestScore");
window.localStorage.removeItem("bestUser");

if(bestScore != null)
{
    if(bestScore < cScore)
    {
        score.textContent = "Najlepszy wynik: "+nick+" -  "+cScore;
        window.localStorage.setItem("bestUser", nick);
        window.localStorage.setItem("bestScore", cScore.toString());
    }else
    {
        score.textContent = "Najlepszy wynik: "+bestUser+" -  "+bestScore;
        window.localStorage.setItem("bestUser", bestUser);
        window.localStorage.setItem("bestScore", bestScore.toString());
    }
}