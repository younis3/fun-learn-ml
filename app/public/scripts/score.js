
let new_score;

function updateScore(score) {
  let str = document.getElementById('score').innerText;
  let old_score = parseInt(str.substring(7));
  new_score = old_score + score;
  document.getElementById('score').innerText = `Score: ${new_score}`;
  return new_score;
}


function saveScore() {
  document.getElementById('nwscore').value = new_score;
  window.location.href = 'save_score';
}



function scoreAnimation(score) {
  $('<span class="score-popup"/>', {
    style: 'display:none'
  })
    .html(`+${score}`)
    .appendTo($('.add-comment'))
    .fadeIn('1000', function () {
      var el = $(this);
      setTimeout(function () {
        el.remove();
      }, 2000);
    });
}

