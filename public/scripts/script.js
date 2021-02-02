var socket = io();

let selection = ''

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

    selection = '';
  } else {
    // error out
  }
}

socket.on('selection', function(msg) {
  console.log(msg);
});