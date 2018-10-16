// Javascript for Number Guesser

// VARIABLES
class Player {
  constructor(name, guess) {
    this.name = name;
    this.guess = guess;
    this.win = false;
  }

// use command to reassign win to true when player wins.
// could also employ named function from outside object.
  winCheck(ranNum) {
    if (parseInt(this.guess) === ranNum) {
      this.win = true;
    }
  }
}

var player1 = new Player('Challenger 1', '');
var player2 = new Player('Challenger 2', '');
var displayPlayer1Guess = document.querySelector('.player-1-guess-result');
var displayPlayer2Guess = document.querySelector('.player-2-guess-result');
var displayPlayer1Name = document.querySelector('.player-1-text');
var displayPlayer2Name = document.querySelector('.player-2-text');
var displayResults = document.querySelectorAll('.player-result');
var guessErrorMessages = document.querySelectorAll('.guess-error-message');
var rangeErrorMessage = document.querySelector('.range-error-message');
var nameInputBoxes = document.querySelectorAll('.names');
var guessInputBoxes = document.querySelectorAll('.guesses');
var minInputBox = document.getElementById('min-input-box');
var maxInputBox = document.getElementById('max-input-box');
var minRangeInput;
var maxRangeInput;

var randomNumber;

var clearButton = document.querySelector('.clear-button');
var resetButton = document.querySelector('.reset-button');
var submitButton = document.querySelector('.submit-button');
var updateButton = document.querySelector('.update-button');

var winCheck = false;

// ACTIONS
setInitialConditions(parseInt(minRangeInput), parseInt(maxRangeInput));

updateButton.addEventListener('click', getNewMinMax);

guessInputBoxes[1].setAttribute("onkeydown", "return (event.keyCode!=13);")
submitButton.addEventListener('click', getUserGuess);

guessInputBoxes[0].addEventListener('input', enableResetButton);
guessInputBoxes[1].addEventListener('input', enableResetButton);
minInputBox.addEventListener('input', enableResetButton);
maxInputBox.addEventListener('input', enableResetButton);
resetButton.addEventListener('click', resetForms);

// Enable clear for all name/guess boxes
nameInputBoxes[0].addEventListener('input', enableClearButton);
nameInputBoxes[1].addEventListener('input', enableClearButton);
guessInputBoxes[0].addEventListener('input', enableClearButton);
guessInputBoxes[1].addEventListener('input', enableClearButton);
clearButton.addEventListener('click', clearGuessInput);

// FUNCTIONS
function assignRandomNumber(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
};

function clearGuessInput() {
  nameInputBoxes[0].value = '';
  nameInputBoxes[1].value = '';
  guessInputBoxes[0].value = '';
  guessInputBoxes[1].value = '';
  clearButton.disabled = true;
};

function checkForGuessError(player, i) {
  // checks name first until name is correct
  if (player.name === '') {
    guessErrorMessages[i].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a name';
    guessErrorMessages[i].classList.add('unhidden');
    return true;
  };

  if (player.guess === '') {
    guessErrorMessages[i].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a guess';
    guessErrorMessages[i].classList.add('unhidden');
    return true;
  } else if (player.guess < parseInt(minRangeInput) || parseInt(player.guess) > parseInt(maxRangeInput)) {
    guessErrorMessages[i].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Guess is outside current range';
    guessErrorMessages[i].classList.add('unhidden');
    return true;
  };

  guessErrorMessages[i].innerHTML = '';
  guessErrorMessages[i].classList.remove('unhidden');
  return false;
};

function checkForRangeError(min, max) {
  if ((min === '') && (max === '')) {
    rangeErrorMessage.innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a min and max range';
    rangeErrorMessage.classList.add('unhidden');
    return true;
  } else if (min === '') {
    rangeErrorMessage.innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a min range';
    rangeErrorMessage.classList.add('unhidden');
    return true;
  } else if (max === '') {
    rangeErrorMessage.innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a max range';
    rangeErrorMessage.classList.add('unhidden');
    return true;
  } else if (parseInt(min) > parseInt(max)) {
    rangeErrorMessage.innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Min is greater than max, enter new range';
    rangeErrorMessage.classList.add('unhidden');
    return true;
  } else {
    rangeErrorMessage.innerHTML = '';
    rangeErrorMessage.classList.remove('unhidden');
    return false;
  };
};

function compareGuess(guess, i) {
  if (parseInt(guess) > randomNumber) {
    displayResults[i].innerText = 'Sorry, that is too High';
  } else if (parseInt(guess) < randomNumber) {
    displayResults[i].innerText = 'Sorry, that is too low';
  } else {
    displayResults[i].innerText = 'BOOM!';
    winCheck = true;
  };
};

function enableClearButton () {
  clearButton.disabled = false;
};

function enableResetButton() {
  resetButton.disabled = false;
};

function getNewMinMax() {
  minRangeInput = document.querySelector('.min-range-input').value;
  maxRangeInput = document.querySelector('.max-range-input').value;

  var errorCheck = checkForRangeError(minRangeInput, maxRangeInput);

  if (errorCheck === false) {
    randomNumber = assignRandomNumber(parseInt(minRangeInput), parseInt(maxRangeInput));
    console.log('The updated random number is: ' + randomNumber);
    
    document.querySelector('.min-range-text').innerText = minRangeInput;
    document.querySelector('.max-range-text').innerText = maxRangeInput;
  };
};

function getUserGuess() {
  player1.name = nameInputBoxes[0].value;
  player1.guess = guessInputBoxes[0].value;
  player2.name = nameInputBoxes[1].value;
  player2.guess = guessInputBoxes[1].value;

  console.log("user 1 name: " + player1.name + " user 2 name: " + player2.name);
  console.log('User 1 guess is: ' + player1.guess + ', User 2 guess is: ' + player2.guess);

  clearGuessInput();

  var errorCheck1 = checkForGuessError(player1, 0);
  var errorCheck2 = checkForGuessError(player2, 1);

  if ((errorCheck1 === false) && (errorCheck2 === false)) {
    displayPlayer1Name.innerText = player1.name;
    displayPlayer2Name.innerText = player2.name;

    displayPlayer1Guess.innerText = player1.guess;
    displayPlayer2Guess.innerText = player2.guess;
    
    compareGuess(player1.guess, 0);
    compareGuess(player2.guess, 1);
  };
};

function resetForms() {
  document.querySelector('.range-form').reset();
  document.querySelector('.player-form').reset();

  if (winCheck === true){
    setHigherRange(parseInt(minRangeInput), parseInt(maxRangeInput));
  } else {
    setInitialConditions();
  };
};

function removeErrorMessages() {
  guessErrorMessages[0].innerHTML = 'ERROR PLACEHOLDER';
  guessErrorMessages[1].innerHTML = 'ERROR PLACEHOLDER';
  rangeErrorMessage.innerHTML = 'ERROR PLACEHOLDER';

  guessErrorMessages[0].classList.remove('unhidden');
  guessErrorMessages[1].classList.remove('unhidden');
  rangeErrorMessage.classList.remove('unhidden');
}

function setInitialConditions() {
  minRangeInput = '1';
  maxRangeInput = '100';
  console.log('The range is: ' + minRangeInput + " " + maxRangeInput);
  
  randomNumber = assignRandomNumber(parseInt(minRangeInput), parseInt(maxRangeInput));
  
  console.log('The initial random number is: ' + randomNumber);
  document.querySelector('.min-range-text').innerText = minRangeInput;
  document.querySelector('.max-range-text').innerText = maxRangeInput;

  resetButton.disabled = true;
  clearButton.disabled = true;

  removeErrorMessages();
};

function setHigherRange(min, max) {
  winCheck = false;
  var newMin = min - 10;
  var newMax = max + 10;

  randomNumber = assignRandomNumber(newMin, newMax);
  console.log('The random number is: ' + randomNumber);
  document.querySelector('.min-range-text').innerText = newMin;
  document.querySelector('.max-range-text').innerText = newMax;
};







