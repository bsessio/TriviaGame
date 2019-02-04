// The global variables on the page.

let correct = 0,
    i = 0,
    count = 30,
    counter = '',
    touchDevice = /ipad|iphone|android|windows phone|blackberry/i.test(navigator.userAgent.toLowerCase());

// Game starter! When you click Begin, it rewrites with what is in the 0th of the triviaArray.
initialize = function () {
    $(".beginBtn").on("click", function () {
        correct = 0;
        i = 0;
        $("#triviaScreen").html(triviaArray[i]);
        actions();
    });
};

// Run the Initialize condition at page load.
initialize();

// Due to the array loading DOM elements, we need to re-trigger Actions so that click handlers function properly
// So everything is in a re-running Actions function, which triggers itself conditionally to reload.
actions = function () {
    // This wrong answers, changes the correct answer to green, displays score, and turns off button clickers.
    // Then it timeouts and calls the next question.
   revealRight = function () {
        $('.wrong').css('display', 'none');
        $('.right').css('background-color', 'green')
        $('.surrenderBtn').css('display', 'none');
        $('button').off();
        $('.scoreFloat').html("<div class='scoreFloat'><div>correct</div><span class='green'>" + correct + "</span> / 15</div>");
        setTimeout(function () {
            nextQuestion();
        }, 40);
        clearInterval(counter);
    };

    // This increases the array's index and begins the next question.
    nextQuestion = function () {
        i++;
        $("#triviaScreen").html(triviaArray[i]);
        actions();
    };

    // Clickhandler for the right answer. Announces correct, increases Correct variable, calls revealRight.
    $(".right").on("click", function () {
        $("#triviaScreen").prepend("<h1><span class='green'>Correct!</span></h1>");
        correct++;
        revealRight();
    });

    // Clickhandler for the wrong answers. Announces wrong, calls revealRight.
    $(".wrong").on("click", function () {
        $("#triviaScreen").prepend("<h1><span class='red'>Wrong!</span></h1>");
        revealRight();
    });

    // Every time actions is run, appends the floating 'surrender' buttons and lists the current score.
    $("#triviaScreen").append(
        "<button class='surrenderBtn giveUpBtn'>do not know</button>" +
        "<button class='surrenderBtn restartBtn beginBtn'>Reset Game</button>" +
        "<div class='scoreFloat'><div>correct</div><span class='green'>" + correct + "</span> / 15</div>"
    ); 

    // Clickhandler for the restart button. Due to DOMs and loading sequence, this repeats the beginBtn click function. Not DRY.
    $(".restartBtn").on("click", function () {
        correct = 0;
        i = 0;
        $("#triviaScreen").html(triviaArray[i]);
        actions();
    });

    // Clickhandler for the 'don't know' answer. Doesn't tell you you're wrong out of kindness, calls revealRight.
    $(".giveUpBtn").on("click", function () {
        revealRight();
    });

    // If conditionals for handling some end game collisions with the above functions, and also loads the final result screen.
   if (i !== 15) {
        // restarts the timer.   
        count=30;
        clearInterval(counter);
        counter = setInterval(timer, 1000);    
    } else {
        // turns off the timer and triggers final result screen.
        clearInterval(counter);
        count = 0;
        $(".surrenderBtn").css('display', 'none');
        $(".scoreFloat").css('display', 'none');
        $("#triviaScreen").html("<h1>Final Score</h1>" +
        "<h2>Answers Correct:</h2>" +
        "<h1><span class=green>" + correct + "</span> of 15</h1>" + "<p>Thank you for playing! EXCELSIOR!</p>" +
        "<div style='text-align: center'><button class='newGameBtn begin'>NEW GAME</button></div>");
        // Another repeat of the beginBtn/restartBtn click function, due to load sequencing for the  DOM elements. Sooo unDRY.
        $(".newGameBtn").on("click", function () {
            correct = 0;
            i = 0;
            $("#triviaScreen").html(triviaArray[i]);
            actions();
        });
        // Gives different final results depending on how you scored.
        if (correct < 5) {
            $("#triviaScreen").prepend("<p class='nudge'>Really? Only "+ correct + "?<div style='text-align: center'><img class='nudge final' src='assets/images/less5.gif'></div>")}
        if (correct < 10 && correct > 4) {
            $("#triviaScreen").prepend("<p class='nudge'>Pretty good!</p><div style='text-align: center'><img class='nudge final' src='assets/images/less10.gif'></div>")}
        if (correct < 15 && correct > 4 && correct > 9) {
            $("#triviaScreen").prepend("<p class='nudge'>So close!</p><div style='text-align: center'><img class='nudge final' src='assets/images/less15.gif'></div>")}
        if (correct === 15) {
            $("#triviaScreen").prepend("<p class='nudge'>We are not worthy.</p><div style='text-align: center'><img class='nudge final' src='assets/images/15.gif'></div>")}
        }
};

// Timer function, which is called in the various Action subfunction.
let timer = function () {
    count = count - 1;
    document.getElementById("timer").innerHTML = count;
    if (count <= 0) {
        $("#triviaScreen").prepend("<h1><span class='red'>Time's up!</span></h1>");
        revealRight();
    }
};

// All the trivia questions, in an array of 16 slots (the last is blank)
triviaArray = [
    "<h1>Question #1</h1>" +
    "<h2>Time Left: <span id='timer'>30</span> seconds</h2>" +
    "<p>" + "Which of these actors has <b>NOT</b> played either a villain or an antagonist in the MCU?" + "</p>" +
    "<button class='right answerBtn'>Christoph Waltz</button>" +
    "<button class='wrong answerBtn'>Lee Pace</button>" +
    "<button class='wrong answerBtn'>Christopher Eccleston</button>" +
    "<button class='wrong answerBtn'>Corey Stoll</button>",
    "<h1>Question #2</h1>" +
    "<h2>Time Left: <span id='timer'>30</span> seconds</h2>" +
    "<p>" + "Which Infinity Stone is red?" + "</p>" +
    "<button class='wrong answerBtn'>The Space Stone</button>" +
    "<button class='wrong answerBtn'>The Power Stone</button>" +
    "<button class='right answerBtn'>The Reality Stone</button>" +
    "<button class='wrong answerBtn'>The Mind Stone</button>",
    "<h1>Question #3</h1>" +
    "<h2>Time Left: <span id='timer'>30</span> seconds</h2>" +
    "<p>" + "Which of these villains has not appeared in any movie?" + "</p>" +
    "<button class='wrong answerBtn'>Man-Ape</button>" +
    "<button class='right answerBtn'>Taskmaster</button>" +
    "<button class='wrong answerBtn'>Yellowjacket</button>" +
    "<button class='wrong answerBtn'>Batroc the Leaper</button>",
    "<h1>Question #4</h1>" +
    "<h2>Time Left: <span id='timer'>30</span> seconds</h2>" +
    "<p>" + "Djimon Hounsou plays which character in 2014's Guardians of the Galaxy?" + "</p>" +
    "<button class='wrong answerBtn'>Ronan the Accuser</button>" +
    "<button class='wrong answerBtn'>Romann Dey</button>" +
    "<button class='wrong answerBtn'>Powerbroker</button>" +
    "<button class='right answerBtn'>Korath the Pursuer</button>",
    "<h1>Question #5</h1>" +
    "<h2>Time Left: <span id='timer'>30</span> seconds</h2>" +
    "<p>" + "Peyton Reed was brought in to finish directing responsibilities for Ant-Man after which director left the project?" + "</p>" +
    "<button class='wrong answerBtn'>Chris Miller</button>" +
    "<button class='wrong answerBtn'>Tobias Lindholm</button>" +
    "<button class='wrong answerBtn'>Shane Black</button>" +
    "<button class='right answerBtn'>Edgar Wright</button>",
    "<h1>Question #6</h1>" +
    "<h2>Time Left: <span id='timer'>30</span> seconds</h2>" +
    "<p>" + "What is Yondu Udonta's arrow called?" + "</p>" +
    "<button class='right answerBtn'>The Yaka Arrow</button>" +
    "<button class='wrong answerBtn'>The A'askavi Arrow</button>" +
    "<button class='wrong answerBtn'>The Sakaar Arrow</button>" +
    "<button class='wrong answerBtn'>The Stakar Arrow</button>",
    "<h1>Question #7</h1>" +
    "<h2>Time Left: <span id='timer'>30</span> seconds</h2>" +
    "<p>" + "In which film do we first see Celestials?" + "</p>" +
    "<button class='wrong answerBtn'>Guardians of the Galaxy 2</button>" +
    "<button class='right answerBtn'>Guardians of the Galaxy</button>" +
    "<button class='wrong answerBtn'>Avengers: Age of Ultron</button>" +
    "<button class='wrong answerBtn'>Thor: the Dark World</button>",
    "<h1>Question #8</h1>" +
    "<h2>Time Left: <span id='timer'>30</span> seconds</h2>" +
    "<p>" + "Which of these weapons does <i>not</i> appear in Doctor Strange?" + "</p>" +
    "<button class='right answerBtn'>Dragonfang</button>" +
    "<button class='wrong answerBtn'>Staff of One</button>" +
    "<button class='wrong answerBtn'>Wand of Watoomb</button>" +
    "<button class='wrong answerBtn'>Vaulting Boots of Valtorr</button>",
    "<h1>Question #9</h1>" +
    "<h2>Time Left: <span id='timer'>30</span> seconds</h2>" +
    "<p>" + "What is the name of Scott Lang's daughter?" + "</p>" +
    "<button class='wrong answerBtn'>Maddie</button>" +
    "<button class='wrong answerBtn'>Nadia</button>" +
    "<button class='wrong answerBtn'>Hope</button>" +
    "<button class='right answerBtn'>Cassie</button>",
    "<h1>Question #10</h1>" +
    "<h2>Time Left: <span id='timer'>30</span> seconds</h2>" +
    "<p>" + "What is the name of the grubby Hell's Kitchen bar that Matt, Foggy and Karen frequent in the Daredevil Netflix series?" + "</p>" +
    "<button class='wrong answerBtn'>Jodie's</button>" +
    "<button class='right answerBtn'>Josie's</button>" +
    "<button class='wrong answerBtn'>Julie's</button>" +
    "<button class='wrong answerBtn'>Joanie's</button>",
    "<h1>Question #11</h1>" +
    "<h2>Time Left: <span id='timer'>30</span> seconds</h2>" +
    "<p>" + "Which Black Panther villain first appeared in Avengers: Age of Ultron?" + "</p>" +
    "<button class='wrong answerBtn'>Man-Ape</button>" +
    "<button class='wrong answerBtn'>Zemo</button>" +
    "<button class='right answerBtn'>Klaw</button>" +
    "<button class='wrong answerBtn'>Killmonger</button>",
    "<h1>Question #12</h1>" +
    "<h2>Time Left: <span id='timer'>30</span> seconds</h2>" +
    "<p>" + "Ty Johnson and Tandy Bowen are main characters in what TV series?" + "</p>" +
    "<button class='wrong answerBtn'>Inhumans</button>" +
    "<button class='wrong answerBtn'>The Defenders</button>" +
    "<button class='wrong answerBtn'>The Runaways</button>" +
    "<button class='right answerBtn'>Cloak & Dagger</button>",
    "<h1>Question #13</h1>" +
    "<h2>Time Left: <span id='timer'>30</span> seconds</h2>" +
    "<p>" + "In Captain America: The Winter Soldier, what is the name of the ship that he, Black Widow, and S.H.I.E.L.D. hijack in the opening scene?" + "</p>" +
    "<button class='wrong answerBtn'>The Laburnum Star</button>" +
    "<button class='wrong answerBtn'>The Liberian Star</button>" +
    "<button class='right answerBtn'>The Lemurian Star</button>" +
    "<button class='wrong answerBtn'>The Latverian Star</button>",
    "<h1>Question #14</h1>" +
    "<h2>Time Left: <span id='timer'>30</span> seconds</h2>" +
    "<p>" + "Which of these characters has no comic book counterpart?" + "</p>" +
    "<button class='wrong answerBtn'>Harold Meachum</button>" +
    "<button class='wrong answerBtn'>Ben Urich</button>" +
    "<button class='right answerBtn'>Erik Selvig</button>" +
    "<button class='wrong answerBtn'>Pepper Potts</button>",
    "<h1>Question #15</h1>" +
    "<h2>Time Left: <span id='timer'>30</span> seconds</h2>" +
    "<p>" + "Which of these Spider-Man villains has never appeared in film?" + "</p>" +
    "<button class='right answerBtn'>The Chameleon</button>" +
    "<button class='wrong answerBtn'>The Vulture</button>" +
    "<button class='wrong answerBtn'>The Shocker</button>" +
    "<button class='wrong answerBtn'>The Lizard</button>",
    ''
];