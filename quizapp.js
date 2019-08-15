'use strict';

const STORE = [
  {
    question: 'What is the fastest flying bird in the world?',
    answers: [
      'Harpy Eagle',
      'Peregrine Falcon',
      'Horned Sungem',
      'Spine-Tailed Swift'
    ],
    correctAnswer: 'Peregrine Falcon'
  },
  {
    question: 'How many legs does a lobster have?',
    answers: [
      '8',
      '10',
      '12',
      '6'
    ],
    correctAnswer: '10'
  },
  {
    question: 'What kind of animal is a "Flemish Giant?"',
    answers: [
      'Goat',
      'Snake',
      'Chicken',
      'Rabbit'
    ],
    correctAnswer: 'Rabbit'
  },
  {
    question: 'What animal has the longest life span?',
    answers: [
      'Blue Whale',
      'Elephant',
      'Giant Tortoise',
      'Locust'
    ],
    correctAnswer: 'Giant Tortoise'
  },
  {
    question: 'What is the world\'s\ most poisonous spider?',
    answers: [
      'Brazilian Wandering Spider',
      'Brown Recluse',
      'Sydney Funnel Spider',
      'Black Widow'
    ],
    correctAnswer: 'Brazilian Wandering Spider'
  }
];

let questionNumber = 0;
let incrementScore = 0;

function generateQuestion() {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    
    <form>
    <fieldset>
      <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
        <span>${STORE[questionNumber].answers[0]}</span>
      </label>
      <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
        <span>${STORE[questionNumber].answers[1]}</span>
        </label>
      <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
        <span>${STORE[questionNumber].answers[2]}</span>
        </label>
      <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
        <span>${STORE[questionNumber].answers[3]}</span>
        </label>
        <button type="submit"
        class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
  } else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text()
  }
}

function nextQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber);
}

function updateScore() {
  incrementScore++;
  $('.incrementScore').text(incrementScore);
}

function startQuiz() {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
  });
}

function renderQuestion() {
  $('.questionAnswerForm').html(generateQuestion());
}

function userClickAnswer() {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let chosen = $('input:checked');
    let answer = chosen.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    
    if (answer === correctAnswer) {
      chosen.parent().addClass('correct');
      checkAnswer();
    } else {
      chosen.parent().addClass('wrong');
      userAnswerFeedbackWrong();
    }
  });
}

function checkAnswer() {
  userAnswerFeedbackCorrect();
  updateScore();
}

function userAnswerFeedbackCorrect() {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
}
function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><p><b>Nope, that's wrong,</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function renderResults () {
  if (incrementScore >= 8) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Oh yeah!!</h3><p>You got ${incrementScore} / 10<p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (incrementScore <= 7 && incrementScore >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>eh. Not too bad</h3><br><You got ${incrementScore} / 10</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>hmm. Maybe it's time to study..</h3><br><p>You got ${incrementScore} / 10</p><button class="restartButton">Restart Quiz</button></div>`);
    }
  }

function renderNextQuestion() {
  $('main').on('click', '.nextButton', function (event) {
    nextQuestionNumber();
    renderQuestion();
    userClickAnswer();
    updateScore();
  });
}

function restartQuiz() {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

function createQuiz() {
$('.questionAnswerForm').hide();
startQuiz();
renderQuestion();
userClickAnswer();
renderNextQuestion();
}

$(createQuiz);