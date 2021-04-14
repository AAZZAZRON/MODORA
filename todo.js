var arr = [];
var outerDiv;

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

function display() {
  getToToDoList();
	arr.push(document.getElementById("userName").value);
  var p = arr.toString().replaceAll(",", "<br>");
  addCookie("todolist", p);
  var i;
  outerDiv = document.createElement("div");
  document.getElementById("websites-list").appendChild(outerDiv);
  for(i = 0; i < arr.length; i++) {
    document.getElementById("output").innerText = arr[i];
    addToToDoList(arr[i]);
  }
}

function addToToDoList(task) { // add known blocked website to the blocked website list (in HTML)
    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.name = "x";
    let label = document.createElement("label");
    label.innerText = task + "\n";
    label.className = "boxes";
    console.log(check);
    console.log(label);
    outerDiv.appendChild(check);
    outerDiv.appendChild(label);
}