var socket = io();

let selection = ''
let selectionCount = 0;
let playersSelections = [];

function choiceSelected(option) {
  selection = option;
}

function lockIn() {
  if (selection) {
    const player = {
      'id': socket.id,
      'selection': selection
    }
    socket.emit('selection', player);
    lockInput(true);
  } else {
    // error out
  }
}

function lockInput(status) {
  document.getElementById('rock').disabled = status;
  document.getElementById('paper').disabled = status;
  document.getElementById('scissors').disabled = status;
  document.getElementById('lockIn').disabled = status;
}

function checkWinner() {
  player1 = playersSelections[0].selection;
  player2 = playersSelections[1].selection;
  winner = getWinner(player1, player2);
  displayWinner(winner)
}

let getWinner = (player1, player2) => {
  let winner = '';
  if (player1 !== player2) {
    if (player1 === "rock") {
      if (player2 === "scissors") {
        // 1 wins
        winner = 'player1';
      } else {
        // 2 wins
        winner = 'player2';
      }
    }
    if (player1 === "paper") {
      if (player2 === "rock") {
        // 1 wins
        winner = 'player1';
      } else {
        // 2 wins
        winner = 'player2';
      }
    }
    if (player1 === "scissors") {
      if (player2 === "rock") {
        // 1 wins
        winner = 'player1';
      } else {
        // 2 wins
        winner = 'player2';
      }
    }
  }
  return winner;
}

let displayWinner = (winner) => {
  if (winner == 'player1') {
    if (playersSelections[0].id == socket.id) {
      console.log('you win');
    } else {
      console.log('you lose');
    }
  } else if (winner == 'player2') {
    if (playersSelections[1].id == socket.id) {
      console.log('you win');
    } else {
      console.log('you lose');
    }
  } else {
    console.log('tie');
  }

}

socket.on('selection', function (msg) {
  selectionCount++;
  playersSelections.push(msg);
  if (selectionCount == 2) {
    checkWinner();
    lockInput(false);
    selectionCount = 0;
  }
});