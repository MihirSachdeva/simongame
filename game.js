var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var gameStarted = false;

$(document).keydown(function()
{
  if(!gameStarted)
  {
    $("#level-title").text("Level "+level);
    gameStarted = true;
    nextSequence();
  }
});

$(".btn").click(function()
{
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(this.id);
  animatePress(this.id);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence()
{
  level++;
  $("#level-title").text("Level "+ level);
  userClickedPattern = [];

  var randomVariable = Math.round(Math.random()*3);
  var randomChosenColor = buttonColors[randomVariable];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function()
  {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function()
      {
        nextSequence();
      }, 1000);
    }

  }
  else
  {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! Press Any Key to Restart.");
    playSound("wrong");
    setTimeout(function()
    {
      $("body").removeClass("game-over");
    }, 2000);
    if(gameStarted)
    {
      startOver();
    }
  }
}

function startOver()
{
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
