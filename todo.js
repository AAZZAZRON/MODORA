var arr = [];
var built = false;
var myDiv;
document.getElementById("ent").onclick = () => display();
document.getElementById("todo-remove-button").onclick = () => box();
document.getElementById("bb5").onclick = () => mainMenu();

function display() {
	arr.push(document.getElementById("userName").value + "\n");
  let checkBox = document.createElement("INPUT");
  checkBox.setAttribute("type", "checkbox");
  myDiv.appendChild(checkBox);
  let label = document.createElement("LABEL");
  label.innerText = arr[arr.length-1];
  myDiv.appendChild(label);
  addCookie("todolist", arr.join("!@#$%^&*"));
  document.getElementById("userName").value = "";
}

function box() {
	var subarr = myDiv.children;
  var i = subarr.length - 2;
	while (i >= 0) {
		if (subarr[i].checked) {
			const index = arr.indexOf(subarr[i].value);
			arr.splice(index, 1);
			myDiv.removeChild(subarr[i]);
			myDiv.removeChild(subarr[i]);
		}
    i -= 2;
	}
  addCookie("todolist", arr.join("!@#$%^&*"));
}

function setToDoList() {
  myDiv = document.createElement("div");
  document.getElementById("cboxes").appendChild(myDiv);
  document.getElementById("MainMenu").hidden = true;
  document.getElementById("SetupTimer").hidden = true;
  document.getElementById("TimerOn").hidden = true;
  document.getElementById("abortedScreen").hidden = true;
  document.getElementById("ToDoList").hidden = false;
  if (!built) {
    getToDoList();
    startToDo();
    built = true;
  }
}

function getToDoList() {
  var s = getCookie("todolist");
  if (s == "") {
    return;
  }
  arr = s.split("!@#$%^&*");
}

function startToDo() {
  for(var i = 0; i < arr.length; i++) {
    var checkBox2 = document.createElement("input");
    checkBox2.type = "checkbox";
    checkBox2.value = arr[i];
    myDiv.appendChild(checkBox2);
    var label2 = document.createElement("label");
    myDiv.appendChild(label2);
    label2.innerText = arr[i];
  }
  addCookie("todolist", arr.join("!@#$%^&*"));
}
