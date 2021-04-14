var arr = [];

var btn = document.getElementById("ToDoListButton");
btn.addEventListener("click", function() {
	setToDoList();
})

function setToDoList() {
  document.getElementById("MainMenu").hidden = true;
  document.getElementById("SetupTimer").hidden = true;
  document.getElementById("TimerOn").hidden = true;
  document.getElementById("ToDoList").hidden = false;
}

var btn2 = document.getElementById("todobutton");
btn2.addEventListener("click", function() {
	arr.push(document.getElementById("name").value);
})