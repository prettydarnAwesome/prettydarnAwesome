var cards = [{
  category: 'time-signature',
  value: '3/4'
}, {
  category: 'time-signature',
  value: '4/4'
}, {
  category: 'time-signature',
  value: '5/4'
}, {
  category: 'time-signature',
  value: '6/4'
}, {
  category: 'time-signature',
  value: '6/8'
}, {
  category: 'time-signature',
  value: '9/8'
}, {
  category: 'time-signature',
  value: '11/8'
}, {
  category: 'channels',
  value: '1'
}, {
  category: 'channels',
  value: '2'
}, {
  category: 'channels',
  value: '3'
}, {
  category: 'channels',
  value: '4'
}, {
  category: 'channels',
  value: '8'
}, {
  category: 'instrument',
  value: 'piano'
}, {
  category: 'instrument',
  value: 'chromatic percussion'
}, {
  category: 'instrument',
  value: 'organ'
}, {
  category: 'instrument',
  value: 'guitar'
}, {
  category: 'instrument',
  value: 'bass'
}, {
  category: 'instrument',
  value: 'strings'
}, {
  category: 'instrument',
  value: 'ensemble'
}, {
  category: 'instrument',
  value: 'brass'
}, {
  category: 'instrument',
  value: 'reed'
}, {
  category: 'instrument',
  value: 'pipe'
}, {
  category: 'instrument',
  value: 'synth'
}, {
  category: 'instrument',
  value: 'synth fx'
}, {
  category: 'instrument',
  value: 'ethnic'
}, {
  category: 'instrument',
  value: 'percussive'
}, {
  category: 'instrument',
  value: 'sfx'
}, {
  category: 'key-change',
  value: '1'
}, {
  category: 'key-change',
  value: '2'
}, {
  category: 'tempo-change',
  value: '1'
}, {
  category: 'tempo-change',
  value: '2'
}, {
  category: 'time-signature-change',
  value: '1'
}, {
  category: 'time-signature-change',
  value: '2'
}, {
  category: 'exclude-note',
  value: 'a'
}, {
  category: 'exclude-note',
  value: 'bb'
}, {
  category: 'exclude-note',
  value: 'b'
}, {
  category: 'exclude-note',
  value: 'c'
}, {
  category: 'exclude-note',
  value: 'db'
}, {
  category: 'exclude-note',
  value: 'd'
}, {
  category: 'exclude-note',
  value: 'eb'
}, {
  category: 'exclude-note',
  value: 'e'
}, {
  category: 'exclude-note',
  value: 'f'
}, {
  category: 'exclude-note',
  value: 'gb'
}, {
  category: 'exclude-note',
  value: 'g'
}, {
  category: 'exclude-note',
  value: 'ab'
}, {
  category: 'key',
  value: 'a'
}, {
  category: 'key',
  value: 'bb'
}, {
  category: 'key',
  value: 'b'
}, {
  category: 'key',
  value: 'c'
}, {
  category: 'key',
  value: 'db'
}, {
  category: 'key',
  value: 'd'
}, {
  category: 'key',
  value: 'eb'
}, {
  category: 'key',
  value: 'e'
}, {
  category: 'key',
  value: 'f'
}, {
  category: 'key',
  value: 'gb'
}, {
  category: 'key',
  value: 'g'
}, {
  category: 'key',
  value: 'ab'
}, {
  category: 'mode',
  value: 'ionian'
}, {
  category: 'mode',
  value: 'dorian'
}, {
  category: 'mode',
  value: 'phrygian'
}, {
  category: 'mode',
  value: 'lydian'
}, {
  category: 'mode',
  value: 'mixolydian'
}, {
  category: 'mode',
  value: 'aeolian'
}, {
  category: 'mode',
  value: 'locrian'
}, {
  category: 'misc',
  value: 'that contains an element of another song (melody/bass line/chords etc)'
}, {
  category: 'misc',
  value: 'which uses an instrument outside of its normal range'
}, ]

function addCard(card) {
  var category = card.category;
  var text = card.value;

  var insMod = '';
  if (card.instrumentModifier) {
    insMod = `data-instrument-modifier='` + card.instrumentModifier + `'`;
  }

  $('.cards').append(`
<div class='card'>
  <div class='card-header' data-category='` + category + `' ` + insMod + `></div>
  <div class='card-body'>
  ` + getCardText(card) + `
  </div>
</div>
`)
}

function getRandomCard() {
  var card = random(cards);
  if (card.category == 'instrument') {
    var n = Math.random();
    if (n >= 0.60 && n < 0.80) {
      card.instrumentModifier = 'without';
    } else if (n >= 0.80) {
      card.instrumentModifier = 'only';
    }
  }
  return card;
}

function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getCardText(card) {
  switch (card.category) {
    case 'time-signature':
      return 'in ' + card.value;
    case 'channels':
      return 'using ' + (card.value == '1' ? '' : 'max ') +
        card.value + ' channels';
    case 'instrument':
      if (!card.instrumentModifier) {
        return 'using ' + (/[aeiou]/.test(card.value[0]) ? 'an ' : 'a ') + card.value + ' instrument';
      } else if (card.instrumentModifier == 'without') {
        return 'without using any ' + card.value + ' instruments'
      } else if (card.instrumentModifier == 'only') {
        return 'using only ' + card.value + ' instruments'
      }
    case 'key-change':
      return 'that changes key ' + card.value + ' time' + (card.value == '1' ? '' : 's');
    case 'tempo-change':
      return 'that changes tempo ' + card.value + ' time' + (card.value == '1' ? '' : 's');
    case 'time-signature-change':
      return 'that changes time signature ' + card.value + ' time' + (card.value == '1' ? '' : 's');
    case 'exclude-note':
      return 'without using the note ' + getPrettyNote(card.value);
    case 'key':
      return 'in the key of ' + getPrettyNote(card.value);
    case 'mode':
      return 'in the ' + card.value.capitalize() + ' mode'
    default:
      return card.value;
  }
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function getPrettyNote(note) {
  var noteBase = note[0];
  var flat = note.length > 1 ? '♭' : '';
  return noteBase.toUpperCase() + flat;
}

function draw() {
  $('.cards').empty();

  var hand = [];
  for (var i = 0; i < 3; i++) hand.push(getRandomCard());

  var isValid = true;

  var maxOne = ['time-signature', 'key', 'key-change', 'time-signature-change', 'tempo-change', 'mode', 'channels'];

  maxOne.forEach(x => {
    if (hand.filter(y => y.category == x).length > 1) isValid = false
  });

  if (hand.filter(x => x.category == 'instrument' && x.instrumentModifier == 'only').length > 0 && hand.filter(x => x.category == 'instrument' && x.instrumentModifier != 'only').length > 0) isValid = false;

  if (isValid) {
    hand.forEach(x => addCard(x));
  } else {
    draw();
  }

}

var colors = [
  'E91E63',
  '9C27B0',
  '673AB7',
  '2196F3',
  '00BCD4',
  '4CAF50',
  '8BC34A',
  'CDDC39',
  'FFC107',
  'FF9800',
  'FF5722',
  '607D8B'
]

function setNewFooterColor() {
  $('.footer').css('background-color', '#' + random(colors))
}

$(document).ready(() => {
  $('.footer').click(draw).click(setNewFooterColor);
  draw();
  setNewFooterColor();
})