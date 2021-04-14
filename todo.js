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
  for(int i = 0; i < arr.length; i++) {
    console.log(arr[0]);
  }
}

var btn2 = document.getElementById("todobutton");
btn2.addEventListener("click", function() {
	arr.push(document.getElementById("name").value);
  deleteCookie("listtodo");
  addCookie("listtodo", arr);
  setToDoList();
}) 
