var socket = io();

let selection = ''
let selectionCount = 0;

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

socket.on('selection', function(msg) {
  selectionCount++;
  if (selectionCount == 2) {
    lockInput(false);
    selectionCount = 0;
  }
});