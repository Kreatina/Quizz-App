const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName("answer-text"));

const questionCounterText = document.getElementById("counter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;

let availableQuestion = []
let questions = [];  
//fetch api
fetch('https://opentdb.com/api.php?amount=25&type=multiple')
.then(res =>{
  return res.json()
}).then(loadedQuestions=>{
  console.log(loadedQuestions)
 questions = loadedQuestions.results.map(loadedQuestions =>{
    const formattedQuestion = {
      question:loadedQuestions.question
    }
    const answerChoices = [...loadedQuestions.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random()*3) + 1;
  
    answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestions.correct_answer)
    answerChoices.forEach((choice, index)=>{
      formattedQuestion['choice' +(index + 1)] = choice 
    })
    return formattedQuestion 
    
  })
  startGame() 

}).catch(err =>{
  console.error(err)
});

// CONSTANTS
const MAX_QUESTIONS = 5;
const CORRECT_BONUS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestion = [...questions]
  getNewQuestion();
};

getNewQuestion = () =>{
  if(availableQuestion.length === 0 || questionCounter >= MAX_QUESTIONS ){
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('/end.html')
  }
  questionCounter++
  questionCounterText.innerHTML = `${questionCounter}/ ${MAX_QUESTIONS}`
  const questionIndex = Math.floor(Math.random() * availableQuestion.length)
  currentQuestion = availableQuestion[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach(choice =>{
    const numbers = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + numbers];
  })
  availableQuestion.splice(questionIndex, 1)
  
  acceptingAnswer = true;

};
choices.forEach(choice =>{
  choice.addEventListener('click', e =>{
    if(!acceptingAnswer)return;

    acceptingAnswer = false;
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number'];


    const answerCheck = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    console.log(answerCheck)
     if(answerCheck === 'correct'){
       incrementScore(CORRECT_BONUS)
     }
    
    selectedChoice.parentElement.classList.add(answerCheck)

    setTimeout(() =>{
      selectedChoice.parentElement.classList.remove(answerCheck)
      getNewQuestion();

    }, 1000)

  })
})
 
incrementScore = num =>{
    score += num
    scoreText.innerHTML = score

}



