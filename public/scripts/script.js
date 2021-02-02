var socket = io();

let selection = ''
let selectionCount = 0;
let playerCount = 0;
const player = {
  'id': socket.id,
  'selection': "",
  'username': ""
}

const submitUsername = () => {
  const username = document.getElementById("username_Entry_Field").value;
  player.username = username;
  document.getElementById('username_Section_Title_Waiting').style.display = 'block';
  document.getElementById('username_Input_Section').style.display = 'none';
  socket.emit('playerCreated');
};

function choiceSelected(option) {
  selection = option;
}

function lockIn() {
  if (selection) {
    player.selection = selection;
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

socket.on('selection', function (msg) {
  selectionCount++;
  if (selectionCount == 2) {
    lockInput(false);
    selectionCount = 0;
  }
});

socket.on('playerCreated', function () {
  console.log("did run");
  playerCount++;
  if (playerCount == 2) {
    document.getElementById("username_Section").style.display = "none";
    document.getElementById("gameSection").style.display = "block";
  }
});