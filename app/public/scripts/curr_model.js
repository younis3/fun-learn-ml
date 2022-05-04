
function model_id(clicked_btn) {
  let modelName = clicked_btn;
  //console.log(typeof (modelName));
  localStorage.setItem('model_name', modelName);

  let path = window.location.pathname.substring(5);  //learn or play
  window.location.href = '/' + path;
}



function get_model_name() {
  //console.log(localStorage.getItem('model_name'));
  return localStorage.getItem('model_name');
}











/*
function model_id_1(clicked_btn) {
  let modelName = "";
  console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
  modelName = document.getElementById(clicked_btn).id;
  localStorage.setItem('model_name', modelName)

  let path = window.location.pathname.substring(5);  //learn or play
  window.location.href = '/' + path;
}
*/

