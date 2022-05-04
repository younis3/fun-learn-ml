
let userName;
function myScore() {
  userName = document.getElementById('navusername').innerText;
  let tbl = document.getElementById('ranktable').rows;
  let x;
  for (i = 0; i < 15; i++) {
    for (j = 0; j < 3; j++) {
      x = tbl[i].cells;
      if (x[j].innerText == userName) {
        tbl[i].style.backgroundColor = '#DCDFE6';
      }
    }
  }
}


function checkScore() {
  let td = document.getElementById('rankusername');
  console.log(td.innerText);
  if (td.innerText == userName) {
    td.style.color = 'red';
  }
}
