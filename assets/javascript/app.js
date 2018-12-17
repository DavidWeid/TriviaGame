///// VARIABLES /////

// Keep track of player's scores
var wrongAnswer = 0;
var rightAnswer = 0;
var missedAnswer = 0;

// Variables for timer and interval holder
var time = 15;
var intervalId;

// Object to hold the questions, answer choices, images, and rightAnswer index
var currentQuestion = 0;
var questionInformation = [
  {
    question: "What town was Leonardo da Vinci bord in?",
    answerChoices: ["Tuscany", "Anghiari", "Arezzo", " Vinci"],
    rightAnswer: 3,
    image: "assets/images/leonardo-da-vinci.jpg"
  },
  {
    question: "What is the largest fast moving consumer goods company in the world?",
    answerChoices: ["Procter & Gamble", "Pepsico", "Nestle", "Coca-Cola"],
    rightAnswer: 2,
    image: "assets/images/nestle.png"
  },
  {
    question: "What flavor ice-cream did Baskin-Robbins release in 1969 to commemorate America's landing on the moon?",
    answerChoices: ["Lunar Cheesecake", "Cosmic Marshmallow", "Chocolate Astroid Chunks", "Galatic Fudge"],
    rightAnswer: 0,
    image: "assets/images/lunar-cheesecake.jpg"
  },
  {
    question: "What year did Honda stop making the Honda Element?",
    answerChoices: ["2000", "2011", "2018", "2003"],
    rightAnswer: 1,
    image: "assets/images/honda-element.jpg"
  },
  {
    question: "What two teams played in the very first Super Bowl?",
    answerChoices: ["Green Bay Packers vs Oakland Raiders", "Houston Oilers vs Minnesota Vikings", "Philadelphia Eagles vs New England Patriots", "Green Bay Packers vs Kansas City Chiefs"],
    rightAnswer: 3,
    image: "assets/images/super-bowl.jpg"
  },
  {
    question: "Who was the fourth president of the United States?",
    answerChoices: ["Thomas Jefferson", "John Adams", "James Madison", "Benjamin Franklin"],
    rightAnswer: 2,
    image: "assets/images/james-madison.jpg"
  },
  {
    question: "Who was the horse from Horsin' Around?",
    answerChoices: ["BoJack Horseman", "Secretariat", "Seabiscuit", "Big Brown"],
    rightAnswer: 0,
    image: "assets/images/bojack.gif"
  },
  {
    question: "What is Nintendo's best selling game franchise?",
    answerChoices: ["Pokemon", "Super Smash Bros", "Sonic", "Super Mario"],
    rightAnswer: 3,
    image: "assets/images/super-mario.gif"
  },
  {
    question: "What is the most disliked video on YouTube?",
    answerChoices: ["Baby (Justin Bieber)", "YouTube Rewind 2018", "Despacito", "It's Everyday Bro"],
    rightAnswer: 1,
    image: "assets/images/youtube.gif"
  },
  {
    question: "What percentage of the cells in your body are bacteria?",
    answerChoices: ["2%", "68%", "90%", "15%"],
    rightAnswer: 2,
    image: "assets/images/bacteria.gif"
  }
];

///// FUNCTIONS /////

// Function renders each questions
function renderQuestion() {

    // Hide the start button
    var startButton = $("#start-button");
    startButton.attr("class", "hidden");

    // Hide page title
    $("#page-title").html("");

    // Hide last image
    $("#result-img").attr("src", "");

    // Display the timer
    $("#timer").html("Time Left: 15 seconds!");

    // Display the current question
    $("#question").html(questionInformation[currentQuestion].question);

    // Make sure the the correct answer only shows on the results page
    $("#answer-selection").html("");

    // Loop to display each answer choice and give each answer a value that can be compared to the questionInformation[currentQuestion].rightAnswer value. Also, allow an on.click to pull this value
    for (var i = 0; i < 4; i++) {

        var newChoice = $("<div>");

        newChoice.text(questionInformation[currentQuestion].answerChoices[i]);

        newChoice.attr("data-index", i);
        newChoice.addClass("click-me");

        $("#answer-selection").append(newChoice);

    }

    // Starts the timer, runs the decrement() function
    function run() {

        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);

    }

    // Decreases time by 1 in second intervals and displays the time on screen
    function decrement() {

        time--;

        $("#timer").html("Time Left: " + time + " seconds!")

        // If time hits 0, stop the timer, add to the currentQuestion, add a point in missedAnswer, move to the results page
        if (time === 0) {

            stop();
            currentQuestion++;
            missedAnswer++;
            renderTime();

        }

    }

    // Stop the timer
    function stop() {

        clearInterval(intervalId);

    }

    // Calls the timer each time a question is rendered
    run();

    // Player clicks an answer choice, running this function
    $(".click-me").on("click", function () {

        // Store the answerChosen as a number based on the div's data-index (0-3)
        // 0 = a; 1 = b; 2 = c; 3 = d;
        var answerChosen = ($(this).attr("data-index"));
        answerChosen = parseInt(answerChosen);

        // Compare answerChosen (0-3) to the rightAnswer (0-3)
        // If player's correct, add a point to rightAnswer, if wrong add a point to wrongAnswer
        // In any case, stop the timer, add a point to currentQuestion, render results page
        if (answerChosen === questionInformation[currentQuestion].rightAnswer) {

            stop();
            currentQuestion++;
            rightAnswer++;
            renderCorrect();

        } else {

            stop();
            currentQuestion++;
            wrongAnswer++;
            renderWrong();

        }

    })

}

// Run this when there're no more questions
function renderEndGame() {

    // Display "all done"; clear timer; show the tallies for rightAnswer, wrongAnswer, and missedAnswer; make the start-button visible; clear answer-selection; set currentQuestion = 0;
    $("#page-title").html("All done! Here are the results!");
    $("#timer").html("");
    $("#question").html("Correct: " + rightAnswer + "<br/>" + "Incorrect: " + wrongAnswer + "<br/>" + "Unanswered: " + missedAnswer);
    $("#start-button").attr("class", "visible btn mx-auto");
    $("#answer-selection").html("");
    $("#result-img").attr("src", "");

    currentQuestion = 0;

    // Clicking on now-displayed button restarts the game and stats
    $("#start-button").on("click", function () {

    wrongAnswer = 0;
    rightAnswer = 0;
    missedAnswer = 0;
    time = 15;
    $("#page-title").html("");
    renderQuestion();

    })

}

// If player is right: tell them they're right, clear the answer-selection div, show a related image, reset the timer
// If player is wrong: tell them they're wrong, show the correct answer, etc
// If player ran out of time: tell them they're out of time, etc
function renderCorrect() {

    $("#question").html("Correct!");
    $("#answer-selection").html("");
    $("#result-img").attr("src", questionInformation[currentQuestion -1].image);
    time = 15;

    // If there're more questions, go to the next one
    if (currentQuestion < questionInformation.length) {

        setTimeout(renderQuestion, 1000 * 4);
    
    // If there're no more questions, render the end game screen
    } else if (currentQuestion === questionInformation.length) {

        setTimeout(renderEndGame, 1000 * 4);

    }

}

function renderWrong() {

    $("#question").html("Nope!");
    $("#answer-selection").html("The correct answer was: " + questionInformation[currentQuestion -1].answerChoices[questionInformation[currentQuestion -1].rightAnswer]);
    $("#result-img").attr("src", questionInformation[currentQuestion -1].image);
    time = 15;

    if (currentQuestion < questionInformation.length) {

        setTimeout(renderQuestion, 1000 * 4);
    
    } else if (currentQuestion === questionInformation.length) {

        setTimeout(renderEndGame, 1000 * 4);

    }

}

function renderTime() {

    $("#question").html("Out of Time!");
    $("#answer-selection").html("The correct answer was: " + questionInformation[currentQuestion -1].answerChoices[questionInformation[currentQuestion -1].rightAnswer]);
    $("#result-img").attr("src", questionInformation[currentQuestion -1].image);
    time = 15;

    if (currentQuestion < questionInformation.length) {

        setTimeout(renderQuestion, 1000 * 4);
    
    } else if (currentQuestion === questionInformation.length) {

        setTimeout(renderEndGame, 1000 * 4);

    }

}

// Start to start...
$("#start-button").click(renderQuestion);
