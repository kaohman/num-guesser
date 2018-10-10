// Javascript for Number Guesser

// Set initial custom range from range text and generate first random number in that range.
var minRangeInputInitial = parseInt(document.querySelector('.min-range-text').innerText);
var maxRangeInputInitial = parseInt(document.querySelector('.max-range-text').innerText);
var currentRangeArray = [minRangeInputInitial, maxRangeInputInitial];

var randomNumber = assignRandomNumber(minRangeInputInitial, maxRangeInputInitial);
console.log('The initial random number is: ' + randomNumber);

function assignRandomNumber(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
};

// Get custom range inputs from user and update min/max range and text when update button is clicked. 
// Also give error messages if values are missing/not valid.
var updateButton = document.querySelector('.update-button');
updateButton.addEventListener('click', getNewMinMax);

function getNewMinMax() {
  var minRangeInput = document.querySelector('.min-range-input').value;
  var maxRangeInput = document.querySelector('.max-range-input').value;

  var minRangeInputNew = parseInt(minRangeInput);
  var maxRangeInputNew = parseInt(maxRangeInput);

  if ((minRangeInput === '') || (maxRangeInput === '')) {
    if (minRangeInput === '') {
      alert('Enter a Min Range.');
    };

    if (maxRangeInput === '') {
      alert('Enter a Max Range.');
    };
  } else if (minRangeInputNew > maxRangeInputNew || maxRangeInputNew < minRangeInputNew) {
    alert('The Min Range is greater than the Max Range, try another range.');
  } else {
    randomNumber = assignRandomNumber(minRangeInputNew, maxRangeInputNew);
    console.log('The updated random number is: ' + randomNumber);
    
    document.querySelector('.min-range-text').innerText = minRangeInputNew;
    document.querySelector('.max-range-text').innerText = maxRangeInputNew;

    currentRangeArray = [minRangeInputNew, maxRangeInputNew];
    return currentRangeArray
  };
};

// Get user's new guess when submit guess button is clicked, displays that guess and the result. 
// Also sends error messages if values are missing or not valid.
var submitButton = document.querySelector('.submit-button');
var guessInputBox = document.querySelector('.lg-input-box');
var displayRecentGuess = document.querySelector('.guess-number');
var displayResult = document.querySelector('.guess-result');

submitButton.addEventListener('click', getUserGuess);

function getUserGuess() {
  var usersGuess = guessInputBox.value;
  console.log('The users guess is: ' + usersGuess);
  clearGuessInput();

  if (usersGuess === '') {
    alert('Enter a guess.');
  } else if (isNaN(parseInt(usersGuess))) {
    alert('Guess is not a number, try another guess.');
  } else if (parseInt(usersGuess) < currentRangeArray[0] || parseInt(usersGuess) > currentRangeArray[1]) {
    alert('Your guess is outside the current range, try another guess.');
  } else {
    displayRecentGuess.innerText = usersGuess;

    if (usersGuess > randomNumber) {
      displayResult.innerText = 'Sorry, that is too High';
    } else if (usersGuess < randomNumber) {
      displayResult.innerText = 'Sorry, that is too low';
    } else {
      displayResult.innerText = 'BOOM!';
    };
  };
};

// Interactive clear button to clear user guess input field.
// Also disable/enable clear button with input.
var clearButton = document.querySelector('.clear-button');

clearButton.addEventListener('click', clearGuessInput);

function clearGuessInput() {
  guessInputBox.value = '';
  clearButton.disabled = true;
};

clearButton.disabled = true;

//When the user inputs their guess into guess input box, the clear button is enabled
guessInputBox.addEventListener('input', enableClearButton);

function enableClearButton () {
 clearButton.disabled = false;
};

// Interactive reset button to reset game - done in HTML

