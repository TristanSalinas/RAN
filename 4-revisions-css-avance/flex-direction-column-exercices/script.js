const button1 = document.getElementById("1");
const button2 = document.getElementById("2");
const button3 = document.getElementById("3");
const button4 = document.getElementById("4");
const button5 = document.getElementById("5");
const button6 = document.getElementById("6");

const boxes = document.querySelectorAll(".box");
const container = document.getElementById("container");
const title = document.getElementById("title");

button1.addEventListener("click", () => {
  boxes.forEach((element) => {
    element.className = "box box1";
  });
  container.className = "flex flex1";
});

button2.addEventListener("click", () => {
  boxes.forEach((element) => {
    element.className = "box box2";
  });
  container.className = "flex flex2";
});

button3.addEventListener("click", () => {
  boxes.forEach((element) => {
    element.className = "box box3";
  });
  container.className = "flex flex3";
});
button4.addEventListener("click", () => {
  boxes.forEach((element) => {
    element.className = "box box4";
  });
  container.className = "flex flex4";
});
button5.addEventListener("click", () => {
  boxes.forEach((element) => {
    element.className = "box box5";
  });
  container.className = "flex flex5";
});

button6.addEventListener("click", () => {
  boxes.forEach((element) => {
    element.className = "box box6";
  });
  container.className = "flex flex6";
});
