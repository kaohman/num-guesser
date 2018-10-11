// Javascript for Number Guesser

// VARIABLES
var clearButton = document.querySelector('.clear-button');
var displayRecentGuess = document.querySelector('.guess-number');
var displayResult = document.querySelector('.guess-result');
var errorMessages = document.querySelectorAll('.error-message');
var guessInputBox = document.querySelector('.lg-input-box');
var minInputBox = document.getElementById('min-input-box');
var maxInputBox = document.getElementById('max-input-box');
var minRangeInput;
var maxRangeInput;
var randomNumber;
var resetButton = document.querySelector('.reset-button');
var submitButton = document.querySelector('.submit-button');
var updateButton = document.querySelector('.update-button');
var winCheck = false;

// ACTIONS
setInitialConditions(parseInt(minRangeInput), parseInt(maxRangeInput));

updateButton.addEventListener('click', getNewMinMax);

guessInputBox.setAttribute("onkeydown", "return (event.keyCode!=13);")
submitButton.addEventListener('click', getUserGuess);

guessInputBox.addEventListener('input', enableResetButton);
minInputBox.addEventListener('input', enableResetButton);
maxInputBox.addEventListener('input', enableResetButton);
resetButton.addEventListener('click', resetForms);

guessInputBox.addEventListener('input', enableClearButton);
clearButton.addEventListener('click', clearGuessInput);

// FUNCTIONS
function assignRandomNumber(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
};

function clearGuessInput() {
  guessInputBox.value = '';
  clearButton.disabled = true;
};

function checkForGuessError(guess) {
  if (guess === '') {
    errorMessages[1].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a guess';
  } else if (parseInt(guess) < parseInt(minRangeInput) || parseInt(guess) > parseInt(maxRangeInput)) {
    errorMessages[1].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Guess is outside current range';
    return true;
  } else {
    errorMessages[1].innerHTML = '';
    return false;
  };
};

function checkForRangeError(min, max) {
  if ((min === '') && (max === '')) {
    errorMessages[0].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a min and max range';
    return true;
  } else if (min === '') {
    errorMessages[0].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a min range';
    return true;
  } else if (max === '') {
    errorMessages[0].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a max range';
    return true;
  } else if (parseInt(min) > parseInt(max)) {
    errorMessages[0].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Min is greater than max, enter new range';
    return true;
  } else {
    errorMessages[0].innerHTML = '';
    return false;
  };
};

function enableClearButton () {
 clearButton.disabled = false;
};

function enableResetButton() {
  resetButton.disabled = false;
};

function getNewMinMax() {
  errorMessages[0].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a min range';
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
  var usersGuess = guessInputBox.value;
  console.log('The users guess is: ' + usersGuess);

  clearGuessInput();

  var errorCheck = checkForGuessError(usersGuess);

  if (errorCheck === false) {
    displayRecentGuess.innerText = usersGuess;
    if (parseInt(usersGuess) > randomNumber) {
      displayResult.innerText = 'Sorry, that is too High';
    } else if (parseInt(usersGuess) < randomNumber) {
      displayResult.innerText = 'Sorry, that is too low';
    } else {
      displayResult.innerText = 'BOOM!';
      winCheck = true;
    };
  };
};

function resetForms() {
  document.querySelector('.top-form').reset();
  document.querySelector('.bottom-form').reset();

  if (winCheck === true){
    setHigherRange(parseInt(minRangeInput), parseInt(maxRangeInput));
  } else {
    setInitialConditions();
  };
};

function setInitialConditions() {
  minRangeInput = '1';
  maxRangeInput = '100';
  console.log('The range is: ' + minRangeInput + " " + maxRangeInput);
  
  randomNumber = assignRandomNumber(parseInt(minRangeInput), parseInt(maxRangeInput));
  
  console.log('The initial random number is: ' + randomNumber);
  document.querySelector('.min-range-text').innerText = minRangeInput;
  document.querySelector('.max-range-text').innerText = maxRangeInput;
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

