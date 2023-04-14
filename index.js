document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const resultDisplay = document.getElementById('result');

  const width = 4;
  let squares = [];
  let score = 0;
  // creating a playing board
  const playBoard = () => {
    for (let i = 0; i < width * width; i++) {
      let square = document.createElement('div');
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generateRandomNumbers();
  };
  playBoard();

  // generate random numbers
  function generateRandomNumbers() {
    let randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
    } else generateRandomNumbers();
  }
  // swipe right
  const swipeRight = () => {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);
        console.log(filteredRow);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);

        let newRow = zeros.concat(filteredRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  };

  // swipe down

  const swipeDown = () => {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + 2 * width].innerHTML;
      let totalFour = squares[i + 3 * width].innerHTML;
      let columns = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      let filteredColumns = columns.filter((num) => num);
      let missing = 4 - filteredColumns.length;
      let zeros = Array(missing).fill(0);
      let newColumns = zeros.concat(filteredColumns);
      squares[i].innerHTML = newColumns[0];
      squares[i + width].innerHTML = newColumns[1];
      squares[i + 2 * width].innerHTML = newColumns[2];
      squares[i + 3 * width].innerHTML = newColumns[3];
    }
  };

  // swipe up

  const swipeUp = () => {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + 2 * width].innerHTML;
      let totalFour = squares[i + 3 * width].innerHTML;
      let columns = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      let filteredColumns = columns.filter((num) => num);
      let missing = 4 - filteredColumns.length;
      let zeros = Array(missing).fill(0);
      let newColumns = filteredColumns.concat(zeros);
      squares[i].innerHTML = newColumns[0];
      squares[i + width].innerHTML = newColumns[1];
      squares[i + 2 * width].innerHTML = newColumns[2];
      squares[i + 3 * width].innerHTML = newColumns[3];
    }
  };

  // swipe left
  const swipeLeft = () => {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);

        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);

        let newRow = filteredRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  };

  const combinedSquares = () => {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  };

  const combinedSquaresColumns = () => {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + width].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  };
  // assign keyCodes
  const control = (e) => {
    if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 38) {
      keyUp();
    } else if (e.keyCode === 40) {
      keyDown();
    }
  };

  document.addEventListener('keyup', control);

  const keyRight = () => {
    swipeRight();
    combinedSquares();
    swipeRight();
    generateRandomNumbers();
  };
  const keyLeft = () => {
    swipeLeft();
    combinedSquares();
    swipeLeft();
    generateRandomNumbers();
  };

  const keyDown = () => {
    swipeDown();
    combinedSquaresColumns();
    swipeDown();
    generateRandomNumbers();
  };

  const keyUp = () => {
    swipeUp();
    combinedSquaresColumns();
    swipeUp();
    generateRandomNumbers();
  };

  // function for checking 2048 score/win

  const checkForWin = () => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = 'You win';
        document.removeEventListener('Keyup', control);
      }
    }
  };

  // for lose, check if there is no zeroes in the board

  const checkForNoZeroes = () => {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++;
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = 'You lose';
      document.removeEventListener('Keyup', control);
    }
  };
});
