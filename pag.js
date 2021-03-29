function a(){
    let a = document.getElementById("inpt");
    let b = document.getElementById("output");
    b.insertAdjacentHTML("beforeend", a.value);
}
var btn = document.getElementById("btn");
btn.addEventListener("click", a);
