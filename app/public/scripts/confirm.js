function confirm_home() {
  let path = window.location.pathname.substring(1);
  if (path == 'play.html') {
    if (confirm("Are you sure you want to exit?!")) {
      window.location.href = 'homepage.html';
    }
  }
  else {
    window.location.href = 'homepage.html';
  }
}

function confirm_back() {
  let path = window.location.pathname.substring(1);  //learn or play
  if (path == "play.html") {
    if (confirm("Are you sure you want to go back?")) {
      window.location.href = '/ctg_play.html';
    }
  }
  else {
    window.location.href = '/ctg_learn.html';
  }
}

function confirm_settings() {
  let pass = Math.random().toString(36).substr(2, 5);
  let code = prompt(`Please type this code: ${pass}`, "");
  if (code == pass) {
    window.location.href = 'settings';
  }
}

function confirm_logout() {
  if (confirm("Are you sure you want to log out?")) {
    let pass = Math.random().toString(36).substr(2, 5);
    let code = prompt(`Please type this code: ${pass}`, "");
    if (code == pass) {
      window.location.href = 'logout';
    }
  }
}


function confirm_score_reset() {
  if (confirm("Are you sure you want to reset the score?")) {
    let pass = Math.random().toString(36).substr(2, 5);
    let code = prompt(`Please type this code: ${pass}`, "");
    if (code == pass) {
      window.location.href = '/score_reset';
    }
  }
  else {
    window.location.href = '/settings';
  }

}

