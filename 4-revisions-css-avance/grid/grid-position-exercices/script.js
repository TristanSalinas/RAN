const button1 = document.getElementById("ex1");
const button2 = document.getElementById("ex2");
const button3 = document.getElementById("ex3");
const button4 = document.getElementById("ex4");
const button5 = document.getElementById("ex5");

const boxes = document.querySelectorAll(".box");
const container = document.getElementById("container");
const title = document.getElementById("title");

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

button1.addEventListener("click", () => {
  boxes.forEach((element) => {
    element.className = "box box1";
    element.style.backgroundColor = getRandomColor();
  });
  container.className = "grid grid1";
});

button2.addEventListener("click", () => {
  boxes.forEach((element) => {
    element.className = "box box2";
    element.style.backgroundColor = getRandomColor();
  });
  container.className = "grid grid2";
});

button3.addEventListener("click", () => {
  boxes.forEach((element) => {
    element.className = "box box3";
    element.style.backgroundColor = getRandomColor();
  });
  container.className = "grid grid3";
});
button4.addEventListener("click", () => {
  boxes.forEach((element) => {
    element.className = "box box4";
    element.style.backgroundColor = getRandomColor();
  });
  container.className = "grid grid4";
});

button5.addEventListener("click", () => {
  boxes.forEach((element) => {
    element.className = "box box5";
    element.style.backgroundColor = getRandomColor();
  });
  container.className = "grid grid5";
});
