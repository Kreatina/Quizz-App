const username = document.getElementById('username');
const saveScore = document.getElementById('saveScore');
const finalScore = document.getElementById('finalScore');


const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerHTML =  mostRecentScore;

const highScores = JSON.parse(localStorage.getItem('highScores ')) || []


//  when the event of keyup happens username enables the button saveScore
username.addEventListener('keyup', () =>{
    saveScore.disabled = !username.value;
})

//setting High scores
saveHighScore = e =>{
 e.preventDefault()
 //here we are defining the constant score to mostRecentScore constant and the name is username input value

 const score= { 
        score: mostRecentScore,
        name: username.value
 }
 //Here we are pushing the score to the highScores array and we are sorting it to see which High score is bigger.
 //then we splice it when it reaches index 5
 highScores.push(score)
 highScores.sort((a, b) => b.score - a.score)
 highScores.splice(5)
//Here we set the localStorage 'highScores' and we are displaying it as a string value inside local storage
 localStorage.setItem('highScores' ,JSON.stringify(highScores))
 



}