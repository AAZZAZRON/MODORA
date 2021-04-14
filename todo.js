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
  for(int i = 0; i < arr.length; i += 1) {
    console.log(arr[0]); //here i want to print this :D
  }  //doesnt this just print in the console thing 
// i dunno how would i make it print using html part
} // https://www.w3schools.com/howto/howto_js_display_checkbox_text.asp 
//woah
//idk idt thats right but /shrug 
//thonk me no understand do i like make another div

var btn2 = document.getElementById("todobutton");
btn2.addEventListener("click", function() {
	arr.push(document.getElementById("name").value);
  deleteCookie("listtodo");
  addCookie("listtodo", arr);
  setToDoList();
}) 
