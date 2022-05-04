//--Decide which camera to start depends on screen size (rear for mobile, front for pc)
let facing = "";
let classFacing = "";

if (window.screen.height / window.screen.width > 1.4) {
  facing = "environment";
  classFacing = "webcam-rear";
}
else {
  facing = "user";
  classFacing = "webcam-front";
}

let constraints = {
  video: {
    facingMode: facing,
    width: {
      ideal: 640,
    },
    height: {
      ideal: 400,
    }
  },
};

//-----------------------------------------
const IMG_SIZE = 80;
//const INTERVAL = 1500;


let videoStream;
let canvas = document.getElementById("canvas");
let video = document.getElementById("webcam");
const snapSoundElement = document.getElementById("snapSound");
//let videoStarted = false;
const btnScreenshot = document.querySelector("#btnScreenshot2")
const screenshotsContainer = document.querySelector("#snapContainer");

start_cam();  //start camera
document.getElementById('nextques').style.display = "none";
setTimeout(function () { _init_(); }, 800);


async function start_cam() {
  if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    videoStream = await navigator.mediaDevices.getUserMedia(constraints);
    let video = document.querySelector("#webcam");
    document.getElementById("webcam").className = classFacing;
    video.srcObject = videoStream;
    $('.flash').hide();
  }
}


function flip() {
  videoStream.getTracks().forEach((track) => {
    track.stop();
  });
  if (constraints.video.facingMode == "user") {
    constraints.video.facingMode = "environment";
    classFacing = "webcam-rear";
  }
  else {
    constraints.video.facingMode = "user";
    classFacing = "webcam-front";
  }
  start_cam();
}





function snap() {
  $('.flash')
    .show()
    .animate({ opacity: 0.3 }, 500)
    .fadeOut(500)
    .css({ 'opacity': 0.7 });
  //window.scrollTo(0, 0);

  //hide buttons
  document.getElementById('backbtn').style.display = 'none';
  document.getElementById('btnScreenshot2').style.display = 'none';
  document.getElementById('toggle').style.display = 'none';
  document.getElementById('nextques').style.display = "block";

  if (canvas != null) {
    if (snapSoundElement != null) {
      snapSoundElement.play();
    }
    canvas.height = video.scrollHeight;
    canvas.width = video.scrollWidth;

    callToPredict(model, video);
    if (gameover && falseAnswers < 3) {
      return;
    }

    let context = canvas.getContext('2d');
    if (facing == 'user') {
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
    }
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    data = canvas.toDataURL('image/png');
    stopCam(video.srcObject);
    $('#canvas').removeClass('d-none');
    document.getElementById("canvas").src = data;
    return data;
  }
  else {
    throw "canvas element is missing";
  }
}


// stop camera
function stopCam(stream) {
  stream.getTracks().forEach(function (track) {
    if (track.readyState == 'live') {
      track.stop();
    }
  });
}





//----------------prediction----------------//

let model;
let data;
let model_url;
let classNames;
let voices;
let gameCounter = 0;
let correctAnswers = 0;
let falseAnswers = 0;
let gameover = false;
let nwscorelast;
const SCORE_CORRECT = 15;
const SCORE_ALL_CORRECT = 300;



//--Decide which model category to load
function model_ctg() {
  let ctg = get_model_name();
  switch (ctg) {
    case ('animals'):
      model_url = "https://raw.githubusercontent.com/testjson123/FunLearntest/main/model/savedModels/tfjs/animals/model.json";
      classNames = ANIMALS_NAMES;
      break;
    case ('fruits'):
      model_url = "https://raw.githubusercontent.com/testjson123/FunLearntest/main/model/savedModels/tfjs/fruits/model.json";
      classNames = FRUITS_NAMES;
      break;
    case ('shapes'):
      model_url = "https://raw.githubusercontent.com/testjson123/FunLearntest/main/model/savedModels/tfjs/shapes/model.json";
      classNames = SHAPES_NAMES;
      break;
    case ('colors'):
      model_url = "https://raw.githubusercontent.com/testjson123/FunLearntest/main/model/savedModels/tfjs/colors/model.json";
      classNames = COLORS_NAMES;
      break;
  }
}


async function _init_() {
  //console.log(gameCounter); 
  get_voices();
  updateScore(0);
  model_ctg();
  if (classNames) {
    setTimeout(function () { renderQues(); }, 200);
  }
  if (model_url) {
    model = await tf.loadLayersModel(model_url);
    console.log("model loaded");
  }
}


function callToPredict(model, image) {
  let className = document.getElementById('question').innerText;
  let res = predict(model, image);

  if (className == `${res[1]}`) {
    text_to_speech('Correct, good job');
    document.getElementById('webcamContainer').style.backgroundColor = "#3f6b3b";
    console.log('correct');
    gameCounter++;
    if (gameCounter == Object.entries(classNames).length) {
      let scoretoupdt = SCORE_CORRECT + SCORE_ALL_CORRECT;
      scoreAnimation(scoretoupdt);
      nwscorelast = updateScore(scoretoupdt);
      congrats();
    }
    else {
      scoreAnimation(SCORE_CORRECT);
      updateScore(SCORE_CORRECT);
    }
    return true;
  }
  else {
    document.getElementById('webcamContainer').style.backgroundColor = "#FF3232";
    text_to_speech(`Answer is not correct`)
    console.log('false');
    falseAnswers++;
    if (falseAnswers == 1) {
      document.getElementById("live1").classList.remove('fas');
      document.getElementById('live1').classList.add('far');
    }
    else if (falseAnswers == 2) {
      document.getElementById("live2").classList.remove('fas');
      document.getElementById('live2').classList.add('far');
    }
    else if (falseAnswers == 3) {
      document.getElementById("live3").classList.remove('fas');
      document.getElementById('live3').classList.add('far');
      gameover = true;
    }
    return false;
  }
}


function predict(model, image) {
  const tensor = tf.browser
    .fromPixels(image)
    .toFloat()
    .div(tf.scalar(255.0))
    .expandDims();

  const imageResize = tf.image.resizeBilinear(tensor, [IMG_SIZE, IMG_SIZE]);
  const prediction = model.predict(imageResize);

  let result = prediction.dataSync();
  console.log(result);
  return showResult(result);
}



function showResult(arr) {
  if (arr.length === 0) {
    return -1;
  }
  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }
  return [maxIndex, classNames[maxIndex], max.toFixed(2)];
}


function text_to_speech(txt) {
  let msg = new SpeechSynthesisUtterance();
  msg.voice = voices[3];
  msg.text = txt;
  msg.rate = 0.5;
  window.speechSynthesis.speak(msg);
  //speechSynthesis.cancel();
}



//more voices for text to speech
async function get_voices() {
  setTimeout(() => {
    voices = window.speechSynthesis.getVoices();
  }, 50);
}



function renderQues() {
  document.getElementById('webcamContainer').style.backgroundColor = "black";
  document.getElementById('nextques').style.display = "none";
  document.getElementById('btns').style.display = 'flex';
  document.getElementById('backbtn').style.display = 'block';
  document.getElementById('btnScreenshot2').style.display = 'block';
  document.getElementById('toggle').style.display = 'block';

  if (!gameover) {
    let name = classNames[gameCounter];
    if (name == 'Chicken') {    //temporarely skip chicken (low accuracy)
      gameCounter++;
      return renderQues();
    }
    console.log(name);
    document.getElementById("question").innerText = name;
    let ques = `Find me a ${name}`;
    text_to_speech(ques);
  }
}



function nextQues() {
  if (!gameover) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    start_cam();
    renderQues();
  }
  else if (falseAnswers == 3) {
    gamelost();
  }
}



function gamelost() {
  console.log('X: ' + falseAnswers);
  stopCam(video.srcObject);
  let txt = "Oh no, You lost. Good Luck next time!";
  text_to_speech(txt);
  document.getElementById('ques').innerHTML = `<br><br><h3>${txt}</h3>`;
  document.getElementById('webcamContainer').remove();
  document.getElementById('btnScreenshot2').remove();
  document.getElementById('toggle').remove();
  document.getElementById('nextques').remove();
  document.getElementById('lives').remove();
  document.getElementById('backbtn').style.display = 'block';
  document.getElementById('savescorebtn').style.display = 'block';
  let imgelmlost = document.getElementById('gamelost');
  imgelmlost.style.display = 'block';
}


function congrats() {
  gameover = true;
  stopCam(video.srcObject);
  let txt = "Congratulations, You have completed all questions";
  text_to_speech(txt);
  document.getElementById('ques').innerHTML = `<br><br><h3>${txt}<br>Your new score is: ${nwscorelast}</h3>`;
  document.getElementById('webcamContainer').remove();
  document.getElementById('btnScreenshot2').remove();
  document.getElementById('toggle').remove();
  document.getElementById('nextques').remove();
  document.getElementById('lives').remove();
  document.getElementById('backbtn').style.display = 'block';
  document.getElementById('savescorebtn').style.display = 'block';
  let imgelm = document.getElementById('congrats');
  imgelm.style.display = 'block';
}


