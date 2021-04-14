var arr = [];

function setToDoList() {
  document.getElementById("MainMenu").hidden = true;
  document.getElementById("SetupTimer").hidden = true;
  document.getElementById("TimerOn").hidden = true;
  document.getElementById("abortedScreen").hidden = true;
  document.getElementById("ToDoList").hidden = false;
  getToDoList();
}

function getToDoList() {
  var s = getCookie("todolist");
  arr = s.split("<br>");
}

document.getElementById("addtask").onclick = () => display();

function display(){
	arr.push(document.getElementById("userName").value);
  var p = arr.toString().replaceAll(",", "<br>");
  document.getElementById("output").innerHTML = p;
  addCookie("todolist", p);
}
