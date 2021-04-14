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
  var i;
  for(i = 0; i < arr.length; i++) {
    addToToDoList(arr[i]);
  }
}

function addToToDoList(task) { // add known blocked website to the blocked website list (in HTML)
    let check = document.createElement("INPUT");
    check.setAttribute("type", "checkbox");
    check.name = "x";
    let label = document.createElement("LABEL");
    label.innerText = task + "\n";
    label.className = "boxes";
    console.log(check);
    console.log(label);
    chooseBlocked.appendChild(check);
    chooseBlocked.appendChild(label);
}