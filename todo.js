var arr = [];

var myDiv = document.getElementById("cboxes");

function display() {
	arr.push(document.getElementById("userName").value);
	var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.value = arr[arr.length-1];
    myDiv.appendChild(checkBox);
    var label = document.createElement("label");
    myDiv.appendChild(label);
    label.appendChild(document.createTextNode(arr[arr.length-1]));
    addCookie("todolist", arr.toString);
}

function box() {
	var subarr = myDiv.getElementsByTagName('input');
	for(var i = 0; i < subarr.length; i++) {
		if(subarr[i].checked) {
			const index = arr.indexOf(subarr[i].value);
			arr.splice(index, 1);
			myDiv.removeChild(subarr[i]);
			myDiv.removeChild(myDiv.getElementsByTagName('label')[i]);
		}
	}
  addCookie("todolist", arr.toString);
}

function setToDoList() {
  document.getElementById("MainMenu").hidden = true;
  document.getElementById("SetupTimer").hidden = true;
  document.getElementById("TimerOn").hidden = true;
  document.getElementById("abortedScreen").hidden = true;
  document.getElementById("ToDoList").hidden = false;
  getToDoList();
  startToDo();
}

function getToDoList() {
  var s = getCookie("todolist");
  arr = s.split(",");
}

document.getElementById("ent").addEventListener("click", function() {
  display();
});

document.getElementById("todo-remove-button").addEventListener("click", function() {
  box();
});

document.getElementById("bb5").addEventListener("click", function() {
  mainMenu();
});

function startToDo() {
  for(var i = 0; i < arr.length; i++) {
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.value = arr[i];
    myDiv.appendChild(checkBox);
    var label = document.createElement("label");
    myDiv.appendChild(label);
    label.appendChild(document.createTextNode(arr[i]));
    removeCookie("todolist");
    var a = arr.toString();
    addCookie("todolist", a);
  }
}