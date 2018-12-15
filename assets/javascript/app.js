///// VARIABLES /////

// Keep track of player's scores
var wrongAnswer = 0;
var rightAnswer = 0;
var missedAnswer = 0;

// Object to hold the questions, answer choices, images, and rightAnswer index
var questionInformation = [
  {
    question: "Question 1?",
    answerChoices: ["a", "b", "c", "d"],
    rightAnswer: 3,
    image: "assets/images/"
  },
  {
    question: "Question 2?",
    answerChoices: ["a", "b", "c", "d"],
    rightAnswer: 2,
    image: "assets/images/"
  },
  {
    question: "Question 3?",
    answerChoices: ["a", "b", "c", "d"],
    rightAnswer: 0,
    image: "assets/images/"
  },
  {
    question: "Question 4?",
    answerChoices: ["a", "b", "c", "d"],
    rightAnswer: 1,
    image: "assets/images/"
  },
  {
    question: "Question 5?",
    answerChoices: ["a", "b", "c", "d"],
    rightAnswer: 3,
    image: "assets/images/"
  }
];

// Logs first question information
console.log(questionInformation[0]);
// Logs first question's rightAnswer as 3 -- this would be choice "d" from the answerChoices array
console.log(questionInformation[0].rightAnswer);