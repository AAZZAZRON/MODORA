var arr = [];
var beenToToDo = false;

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
    if(!getCookie("todolist") === "") {
      removeCookie("todolist");
    }
    addCookie("todolist", arr.join(","));
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
  if(!getCookie("todolist") === "") {
      removeCookie("todolist");
    }
  addCookie("todolist", arr.join(","));
}

function setToDoList() {
  document.getElementById("MainMenu").hidden = true;
  document.getElementById("SetupTimer").hidden = true;
  document.getElementById("TimerOn").hidden = true;
  document.getElementById("abortedScreen").hidden = true;
  document.getElementById("ToDoList").hidden = false;
  if(!beenToToDo) {
    getToDoList();
    startToDo();
    beenToToDo = true;
  }
}

function getToDoList() {
  var s = getCookie("todolist");
  if(s === "") {
    return;
  }
  console.log(s);
  arr = s.split(",");
}

document.getElementById("ent").addEventListener("click", function() {
  display();
  document.getElementById("userName").value = "";
});

document.getElementById("todo-remove-button").addEventListener("click", function() {
  box();
});

document.getElementById("bb5").addEventListener("click", function() {
  mainMenu();
});

function startToDo() {
  for(var i = 0; i < arr.length; i++) {
    var checkBox2 = document.createElement("input");
    checkBox2.type = "checkbox";
    checkBox2.value = arr[i];
    myDiv.appendChild(checkBox2);
    var label2 = document.createElement("label");
    myDiv.appendChild(label2);
    label2.appendChild(document.createTextNode(arr[i]));
  }
  if(!getCookie("todolist") === "") {
      removeCookie("todolist");
    }
    var a = arr.join(",");
    addCookie("todolist", a);
}
