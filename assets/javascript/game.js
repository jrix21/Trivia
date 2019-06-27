  // array of objects to store questions, possible answers, and the answer key
  var questions =
    [ { "question"    : "Where was Gol D. Roger Born?",
        "choices"     : ["North Blue","South Blue","East Blue","West Blue"],
        "answerIndex" : 2
      },
      { "question"    : "Which of the Following is not a type of Haki?",
        "choices"     : ["Kenbunshoku","Busoshoku","Haoshoku","Kamishoku"],
        "answerIndex" : 3
      },
      { "question"    : "What is the name of the village Luffy was born in?",
        "choices"     : ["Cocoyasi","Foosha","LogueTown","Wano"],
        "answerIndex" : 1
      },
      { "question"    : "Which of the following is not one of Zoro's Swords?",
        "choices"     : ["Wado Ichimonji","Shusui","Sandai Kitetsu","Kikoku"],
        "answerIndex" : 3
      },
      { "question"    : "Who is the newest member of the Strawhat Pirates?",
        "choices"     : ["Carrot","Jinbei","Pudding","Brook"],
        "answerIndex" : 1
      },
      { "question"    : "Where is Sniper Island?",
        "choices"     : ["In your heart", "Grand Line","East Blue","North Blue" ],
        "answerIndex" : 0
      } ];

// array of objects to store info related to the user's answers
// isCorrect returns a boolean based on whether the user's choice matches the
// answer to the question.
var userResults =
  [ { "question"  : questions[0].question,
      "choice"    : "",
      "isCorrect" : false
    },
    { "question"  : questions[1].question,
      "choice"    : "",
      "isCorrect" : false
    },
    { "question"  : questions[2].question,
      "choice"    : "",
      "isCorrect" : false
    },
    { "question"  : questions[3].question,
      "choice"    : "",
      "isCorrect" : false
    },
    { "question"  : questions[4].question,
      "choice"    : "",
      "isCorrect" : false
    },
    { "question"  : questions[5].question,
      "choice"    : "",
      "isCorrect" : false
    }];

  // dialogue to display for user
  var wrong =
    ["Nope, He was born in LogueTown which is in the East Blue",
     "Kamishoku would be considered Divine Haki, Which doesn't exist.. Yet",
     "He was born in Foosha Village",
     "Zoro's sad now",
     "Incorrect",
     "Shame on you!"];

  var correct =
    ["Well Done!",
     "Impressive",
     "Yes indeed.",
     "Correct",
     "I figured you knew that one.",
     "When you're right, you're right"];

  var QnumIter = 0;

  // First function run to start the game. Display begin game dialogue & initialize
  function getReady() {
    // initialize user answers to nothing
    for ( i=0; i < questions.length; i++ ) {
      userResults[i].choice = "";
    }
    // reset the questions array iterator to zero
    QnumIter = 0;
    // build and display begin game button or restart
    $("#questions").html("<h2>Are you ready for some One Piece trivia?</h2>");
    $("#questions").append("<p>you have 15 seconds to answer each question</p>");
    $("#buttonBox").html('<button class="startButton">Bring it on!</button>');
    // listen for click on <button> element
    $("#buttonBox").on("click", ".startButton", function(){
        // turn off event listener
        event.stopPropagation();
        $("#buttonBox").off("click",".startButton");
        // remove button from document
        $(".startButton").remove();
        //--- START THE Q&A PORTION
        beginGame();
    });
  }

  function beginGame() {
    // display the first question & answers
    var currentQuestion = questions[QnumIter].question;
    askQuestion(currentQuestion);
  }

  // displays the question
  function askQuestion(question) {
    $("#questions").html("<h2>"+question+"</h2>");
    displayChoices(QnumIter);
    console.log("in askQuestion: QnumIter is = "+QnumIter);
  }


  // display answer choices-- runs once every time a question is displayed
  function displayChoices(qnum) {
    // questions is an array of objects, the value of the choices property is also an array
    // choices contains all the possible answers for the current question
    var numOfChoices = questions[qnum].choices.length;
    // HTML for the radio buttons cookie cutter beginning tag
    var radBtn = '<input type="radio" name="choice" value="';
    $("#buttonBox").html('<form>')
    for (var i=0; i < numOfChoices; i++ ) {
      // set the radio button id to 'Q'+ i
      radBtnId = '" id="Q'+i+'">';
      // fetch an answer option for display from the array of answers
      var answerOption = questions[qnum].choices[i];
      // display the radio button with value= an answer option and id='Q' + i
      $("form").append(radBtn+answerOption+radBtnId);
      // display the label for the input with for='Q' + i matching question index
      // and the label text is the current answer option
      $("form").append("<label for=Q"+i+">"+answerOption+'</label><br>');
    }

      //------- nested timer functionality for questions -----------
      //setTimeout(timedOut, 1000*15);

      var timerNumber = 15;
      var intervalId;

      function run() {
        intervalID = setInterval(decrement,1000);
      }

      function decrement() {
        timerNumber--;
        if (timerNumber <=10) {
          $("#questions").find("h3").remove();
          $("#questions").append("<h3>" + timerNumber + "</h3>");

        }

        if (timerNumber === 0) {
          clearInterval(intervalID);
          timedOut();
        }
      }


      run();

     // add event listener for radio buttons to get user response
    $("#buttonBox").on("click","input",function(){
      // record the users choice for the current question
      userResults[qnum].choice = $(this).val();
      event.stopPropagation();
      clearInterval(intervalID);
      $("#buttonBox").off("click","input");
      // remove the form with questions and the radio buttons
      // event listener is waiting for
      $("form").remove();
      // check the user's answer and display right or wrong
      displayResult(qnum);
    });
      //------ end of radio button event listener ------
  }

  function checkAnswer(choice,answer) {
    if (choice===answer) {
      return true;
    } else {
      return false;
    }
  }

  function timedOut(){
    $("#buttonBox").off("click","input");
      // remove the form with questions and the radio buttons
      // event listener is waiting for
      $("form").remove();
      // check the user's answer and display right or wrong
      displayResult(QnumIter);
  }

  // display text depending on whether user is right or wrong
  function displayResult(qnum) {
    // fetch the answer index from the questions object as an integer
    var getIndex = questions[qnum].answerIndex;
    // fetch the correct answer as a string
    var theRightAnswer = questions[qnum].choices[getIndex];
    // fetch the user's guess as a string
    var theUserGuess = userResults[qnum].choice;
    // check to see if the user choice is correct - returned  as boolean
    var correctAnswer = checkAnswer(theUserGuess,theRightAnswer);
    // run conditional to display response to user
    if (correctAnswer) {
      $("#buttonBox").html("<h3>"+correct[qnum]+"</h3>");
      userResults[qnum].isCorrect = true;
    } else {
      $("#buttonBox").html("<h3>"+wrong[qnum]+"</h3>");
      userResults[qnum].isCorrect = false;
    }

    // create a button to request the next question
    $("#buttonBox").append('<div class="row"><button class="startButton">Next Question</button></div>');
    // listen for click on <button> element
    $("#buttonBox").on("click", ".startButton", function(){
        // turn off event listener
        event.stopPropagation();
        $("#buttonBox").off("click", ".startButton");
        // remove button from document
        $(".startButton").remove();
        // show next question
        if (qnum < questions.length-1) {
          nextUp();
        } else
          {
            displayEndResult();
          }
    });
  }

  // display the questions and answers
  function nextUp () {
    // increment the iterator for the question and answer arrays
    QnumIter++;
    var newQuestion = questions[QnumIter].question;
    askQuestion(newQuestion);
  }

  // display the final results of the game and offer chance to replay

  function displayEndResult() {
    var correctAnswers = 0;
    for (i=0; i<questions.length; i++) {
      if (userResults[i].isCorrect) {
        correctAnswers++;
      }
    }
    //---------- display the final score --------------
    $("#questions").html("<h2>Let's see how you did!</h2>");
    $("#answers").html('<h2>Correct Answers: '+correctAnswers+'</h2>');
    $("#answers").append('<h2>Wrong Answers: '+(questions.length-correctAnswers)+'</h2>');
    $("#answers").append('<h2>Questions answered incorrectly:</h2>');
    for (i=0; i<questions.length; i++){
      if(!(userResults[i].isCorrect)){
        $("#answers").append('<p>'+questions[i].question+'</p>');
      }
    }

    //--------  display button to restart the game -------------
    $("#answers").append('<button class="startButton">Try Again</button>');
    // listen for click on <button> element
    $("#answers").on("click", ".startButton", function(){
        // turn off event listener
        $("#answers").off("click",".startButton");
        event.stopPropagation();
        // remove button from document
        $(".startButton").remove();
        for ( i=0; i < userResults.length; i++ ) {
          userResults[i].choice = "";
        }
        // reset the questions array iterator to zero
        QnumIter = 0;
        //----- restart the Q&A portion
        $("#answers").html('<div id="buttonBox" class="col-6"></div>');
        beginGame();
    });
  }

/* *************** WAIT FOR DOCUMENT LOAD AND START THE GAME **************** */

$(document).ready(function() {

  getReady();


}); //------ end of document ready function