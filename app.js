/*
GAME FUNCTION:
 - Player must guess a number between a min and max
 - Player gets a certain amount of guesses
 - Notify player of guesses remaining
 - Notify they player of the correct answer if loose 
 - Let player choose to play again
*/

//Game values
let min = 1,
    max = 10,
    winningNum = getWinningNum(min, max),
    guessLeft= 3;

//UI Elements
const game=document.querySelector('#game'),
      minNum=document.querySelector('.min-num'),
      maxNum=document.querySelector('.max-num'),
      guessBtn=document.querySelector('#guess-btn'),
      guessInput=document.querySelector('#guess-input'),
      message=document.querySelector('.message');

//Assgin UI min and 
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown',function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})

guessBtn.addEventListener('click', function(){
   let guess = parseInt(guessInput.value);

   //Validate
   if(isNaN(guess) || guess < min || guess > max) {
     setMessage("Please enter a number between"+ min+" and "+max, 'red');
   }

   //Check if won
   if(guess === winningNum){

    //Game Over - won
    
    gameOver(true,winningNum +' is correct! YOU WIN!');
      //  //Disabled input
      //  guessInput.disabled= true;
      //  //Change border color
      //  guessInput.style.borderColor = 'green';
      //  //Set Message
      //  setMessage(winningNum +' is correct! YOU WIN!','green');
   } else {
     //Wrong number
     guessLeft -= 1;

     if(guessLeft === 0) {
       //Game over - lost
        gameOver(false,"Game Over, you lost. The correct number was "+winningNum);
       //Disabled input
      //  guessInput.disabled = true;
      //  //Change border color
      //  guessInput.style.borderColor = 'red';  
      //  //Set message
      //  setMessage("Game Over, you lost. The correct number was "+winningNum, 'red');
     } else {
       //Game continues - answer wrong

       //Change border color
       guessInput.style.borderColor = 'red';

       //Clear Input
       guessInput.value = '';

       //set Message
       setMessage(guess +" is not correct, "+guessLeft+ " guesses left", 'red');
     }

   }
});

//Game Over

function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';
  //Disabled input
  guessInput.disabled= true;
  //Change border color
  guessInput.style.borderColor = color;
  //Set Message
  setMessage(msg,color);

  //Play Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';

}

//Get Winning Number
function getWinningNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+ min);
}

//set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
