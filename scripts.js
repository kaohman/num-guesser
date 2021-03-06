class Player {   
  constructor(name, guess) {     
    this.name = name;
    this.guess = guess;        
  }
}

var cardNum = 0;
var cardParentDiv = document.querySelector('.right-panel');
var clearButton = document.querySelector('.clear-button');
var displayPlayer1Guess = document.querySelector('.player-1-guess-result');
var displayPlayer1Name = document.querySelector('.player-1-text');
var displayPlayer2Guess = document.querySelector('.player-2-guess-result');
var displayPlayer2Name = document.querySelector('.player-2-text');
var displayResults = document.querySelectorAll('.player-result');
var guessErrorMessages = document.querySelectorAll('.guess-error-message');
var guessInputBoxes = document.querySelectorAll('.guesses');
var maxInputBox = document.getElementById('max-input-box');
var minInputBox = document.getElementById('min-input-box');
var nameInputBoxes = document.querySelectorAll('.names');
var numOfGuesses = 0;
var player1 = new Player('Challenger 1', '');
var player2 = new Player('Challenger 2', '');
var rangeErrorMessage = document.querySelector('.range-error-message');
var resetButton = document.querySelector('.reset-button');
var submitButton = document.querySelector('.submit-button');
var updateButton = document.querySelector('.update-button');
var winCheck = false;
var cardHTML;
var endTime;
var gameLength;
var maxRangeInput;
var minRangeInput;
var newCard;
var randomNumber;
var startTime;
var winnerName;

setInitialConditions(parseInt(minRangeInput), parseInt(maxRangeInput));

updateButton.addEventListener('click', getNewMinMax);

guessInputBoxes[1].setAttribute("onkeydown", "return (event.keyCode!=13);")
submitButton.addEventListener('click', getUsersGuesses);

guessInputBoxes[0].addEventListener('input', enableResetButton);
guessInputBoxes[1].addEventListener('input', enableResetButton);
minInputBox.addEventListener('input', enableResetButton);
minInputBox.addEventListener('input', enableUpdateButton);
maxInputBox.addEventListener('input', enableResetButton);
maxInputBox.addEventListener('input', enableUpdateButton);
resetButton.addEventListener('click', resetForms);

nameInputBoxes[0].addEventListener('input', enableClearButton);
nameInputBoxes[1].addEventListener('input', enableClearButton);
guessInputBoxes[0].addEventListener('input', enableClearButton);
guessInputBoxes[1].addEventListener('input', enableClearButton);
clearButton.addEventListener('click', clearGuessInput);

nameInputBoxes[0].addEventListener('input', enableSubmitButton);
nameInputBoxes[1].addEventListener('input', enableSubmitButton);
guessInputBoxes[0].addEventListener('input', enableSubmitButton);
guessInputBoxes[1].addEventListener('input', enableSubmitButton);

cardParentDiv.addEventListener('click', function(event) {
  if (event.target.className === 'x-icon') {
    var deleteDiv = document.getElementById(event.target.id);
    deleteDiv.parentNode.removeChild(deleteDiv);
  };
});

function addPinkBorder(elementHtml) {
  elementHtml.classList.add('pink-border');
}

function assignRandomNumber(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
};

function checkForGuessError(player, i) {
  if (player.name === '') {
    guessErrorMessages[i].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a name';
    guessErrorMessages[i].classList.add('unhidden');
    addPinkBorder(nameInputBoxes[i]);
    return true;
  };

  if (player.guess === '') {
    guessErrorMessages[i].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a guess';
    guessErrorMessages[i].classList.add('unhidden');
    addPinkBorder(guessInputBoxes[i]);
    return true;
  } else if (player.guess < parseInt(minRangeInput) || parseInt(player.guess) > parseInt(maxRangeInput)) {
    guessErrorMessages[i].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Guess is outside current range';
    guessErrorMessages[i].classList.add('unhidden');
    addPinkBorder(guessInputBoxes[i]);
    return true;
  };

  guessErrorMessages[i].innerHTML = 'ERROR PLACEHOLDER';
  guessErrorMessages[i].classList.remove('unhidden');
  removePinkBorder(guessInputBoxes[i]);
  removePinkBorder(nameInputBoxes[i]);
  return false;
};

function checkForRangeError(min, max) {
  if (min === '' && max === '') {
    rangeErrorMessage.innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a min and max range';
    rangeErrorMessage.classList.add('unhidden');
    addPinkBorder(minInputBox);
    addPinkBorder(maxInputBox);
  } else if (min === '') {
    rangeErrorMessage.innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a min range';
    rangeErrorMessage.classList.add('unhidden');
    addPinkBorder(minInputBox);
    removePinkBorder(maxInputBox);
    return true;
  } else if (max === '') {
    rangeErrorMessage.innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a max range';
    rangeErrorMessage.classList.add('unhidden');
    addPinkBorder(maxInputBox);
    return true;
  } else if (parseInt(min) > parseInt(max)) {
    rangeErrorMessage.innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Min is greater than max, enter new range';
    rangeErrorMessage.classList.add('unhidden');
    addPinkBorder(minInputBox);
    return true;
  } else if (parseInt(min) === parseInt(max)) {
    rangeErrorMessage.innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Min equals max, enter new range';
    rangeErrorMessage.classList.add('unhidden');
    addPinkBorder(minInputBox);
    addPinkBorder(maxInputBox);
    return true;
  } else {
    rangeErrorMessage.innerHTML = 'ERROR PLACEHOLDER';
    rangeErrorMessage.classList.remove('unhidden');
    removePinkBorder(minInputBox);
    removePinkBorder(maxInputBox);
    return false;
  };
};

function clearGuesses() {
  guessInputBoxes[0].value = '';
  guessInputBoxes[1].value = '';
  clearButton.disabled = true;
};

function clearGuessInput() {
  nameInputBoxes[0].value = '';
  nameInputBoxes[1].value = '';
  clearGuesses();
}

function compareGuess(player, i) {
  if (parseInt(player.guess) > randomNumber) {
    displayResults[i].innerText = 'Sorry, that is too High';
  } else if (parseInt(player.guess) < randomNumber) {
    displayResults[i].innerText = 'Sorry, that is too low';
  } else {
    displayResults[i].innerText = 'BOOM!';
    getGameTime();
    winnerName = player.name;
    winCheck = true;
    createCard();
    submitButton.disabled = true;
  };
};

function createCard() {
  cardHTML = `<section class="result-card animation" id="card-${cardNum}"><p class="player-names"><span class="card-player-text">${player1.name}</span><span class="vs"> VS </span><span class="card-player-text">${player2.name}</span></p><div class="winner"><h1 class="winner-name animate-text">${winnerName}</h1><h1 class="winner-light">WINNER</h1></div><div class="stats"><p class="total-num-guess"><span class="bold">${numOfGuesses}</span> GUESSES</p><p class="guess-num"><span class="bold">${gameLength}</span> MINUTES</p><img class="x-icon" id="card-${cardNum}" src="delete.svg" alt="delete icon"></div></section>`;
  cardNum++;
  newCard = document.createElement('div');
  newCard.innerHTML = cardHTML;
  cardParentDiv.appendChild(newCard);
};

function enableClearButton() {
  clearButton.disabled = false;
};

function enableResetButton() {
  resetButton.disabled = false;
};

function enableUpdateButton() {
  updateButton.disabled = false;
}

function enableSubmitButton() {
  submitButton.disabled = false;
}

function getGameTime() {
  endTime = Date.now();
  var gameLengthMs = (endTime - startTime) / 60000;
  gameLength = gameLengthMs.toFixed(2);
  startTime = 0;
  endTime = 0;
}

function getNewMinMax() {
  minRangeInput = document.querySelector('.min-range-input').value;
  maxRangeInput = document.querySelector('.max-range-input').value;

  var errorCheck = checkForRangeError(minRangeInput, maxRangeInput);

  if (errorCheck === false) {
    randomNumber = assignRandomNumber(parseInt(minRangeInput), parseInt(maxRangeInput));

    startTime = 0;
    endTime = 0;
    numOfGuesses = 0;
    
    document.querySelector('.min-range-text').innerText = minRangeInput;
    document.querySelector('.max-range-text').innerText = maxRangeInput;
  };

  updateButton.disabled = true;
};

function getUsersGuesses() {
  player1.name = nameInputBoxes[0].value;
  player1.guess = guessInputBoxes[0].value;
  player2.name = nameInputBoxes[1].value;
  player2.guess = guessInputBoxes[1].value;

  var errorCheck1 = checkForGuessError(player1, 0);
  var errorCheck2 = checkForGuessError(player2, 1);

  if ((errorCheck1 === false) && (errorCheck2 === false)) {
    displayPlayer1Name.innerText = player1.name;
    displayPlayer2Name.innerText = player2.name;

    displayPlayer1Guess.innerText = player1.guess;
    displayPlayer2Guess.innerText = player2.guess;

    clearGuesses();

    if (startTime === 0) {
      startTime = Date.now();
    };

    ++numOfGuesses;
    
    compareGuess(player1, 0);
    compareGuess(player2, 1);
  };
};

function removeErrorMessages() {
  guessErrorMessages[0].innerHTML = 'ERROR PLACEHOLDER';
  guessErrorMessages[1].innerHTML = 'ERROR PLACEHOLDER';
  rangeErrorMessage.innerHTML = 'ERROR PLACEHOLDER';

  guessErrorMessages[0].classList.remove('unhidden');
  guessErrorMessages[1].classList.remove('unhidden');
  rangeErrorMessage.classList.remove('unhidden');
};

function removePinkBorder(elementHtml) {
  elementHtml.classList.remove('pink-border');
}

function resetForms() {
  document.querySelector('.range-form').reset();
  document.querySelector('.player-form').reset();

  resetLatestScorecard();

  if (winCheck === true){
    setHigherRange();
  } else {
    setInitialConditions();
  };
};

function resetLatestScorecard() {
  displayPlayer1Guess = document.querySelector('.player-1-guess-result');
  displayPlayer2Guess = document.querySelector('.player-2-guess-result');
  displayPlayer1Guess.innerText = '??';
  displayPlayer2Guess.innerText = '??';

  displayPlayer1Name = document.querySelector('.player-1-text');
  displayPlayer2Name = document.querySelector('.player-2-text');
  displayPlayer1Name.innerText = 'Challenger 1 Name';
  displayPlayer2Name.innerText = 'Challenger 2 Name';

  displayResults = document.querySelectorAll('.player-result');
  displayResults[0].innerText = '';
  displayResults[1].innerText = '';
};

function setHigherRange() {
  winCheck = false;
  minRangeInput = parseInt(minRangeInput) - 10;
  maxRangeInput = parseInt(maxRangeInput) + 10;

  minRangeInput.toString();
  maxRangeInput.toString();

  randomNumber = assignRandomNumber(parseInt(minRangeInput), parseInt(maxRangeInput));
  document.querySelector('.min-range-text').innerText = minRangeInput;
  document.querySelector('.max-range-text').innerText = maxRangeInput;
};

function setInitialConditions() {
  minRangeInput = '1';
  maxRangeInput = '100';
  
  randomNumber = assignRandomNumber(parseInt(minRangeInput), parseInt(maxRangeInput));
  document.querySelector('.min-range-text').innerText = minRangeInput;
  document.querySelector('.max-range-text').innerText = maxRangeInput;

  resetButton.disabled = true;
  clearButton.disabled = true;
  updateButton.disabled = true;

  startTime = 0;
  endTime = 0;

  removeErrorMessages();
};




