const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5); // this returns an array of shuffled objects
  //console.log("shuffledQuestions is" + shuffledQuestions);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");

  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]); //this returns a question & answer object
}

function showQuestion(question) {
  //  console.log("(question) in showQuestion is: " + question.question); //What is 2 + 2
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text; //text key in one of iterations of answers object
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button); //append the created button
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;
  //console.log(e.target);
  const correct = selectedButton.dataset.correct; //add data attribute correct
  setStatusClass(document.body, correct); //set body background to correct color defined in css
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
  nextButton.classList.remove("hide");
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "Who is the best YouTuber",
    answers: [
      { text: "Web Dev Simplified", correct: true },
      { text: "Traversy Media", correct: false },
      { text: "Dev Ed", correct: false },
      { text: "Fun Fun Function", correct: false },
    ],
  },
  {
    question: "Is web development fun",
    answers: [
      { text: "Kinda", correct: false },
      { text: "Yes!!", correct: true },
      { text: "Uh no", correct: false },
      { text: "IDK", correct: false },
    ],
  },
];
