const initalItems = [
  { name: "Snake", img: "./imgs/snake.jpg" },
  { name: "Hamster", img: "./imgs/hamster.jpg" },
  { name: "Fish", img: "./imgs/fish.jpg" },
  { name: "Rabbit", img: "./imgs/rabbit.jpg" },
  { name: "Cat", img: "./imgs/cat.jpg" },
  { name: "Dog", img: "./imgs/dog.jpg" },
];
let selected = [];
let matched = [];
const messageElement = document.querySelector("#message");
const wrongAnswersElement = document.querySelector("#wrong-answers");
let wrongAnswers = 0;

const duplicateItems = (items) => {
  return [...items, ...items];
};

const randomiseItems = (items) => {
  const arrLength = items.length; // length will always be one more than the actuall indexs (basically counts like us 1,2,3)
  for (let i = 0; i < arrLength; i++) {
    const randomIndex = Math.floor(Math.random() * arrLength); // math.floor rounds down and random will scale from 0 the just under the range so the range is 6 so it will go to 5.999999
    let temp = items[i];
    items[i] = items[randomIndex];
    items[randomIndex] = temp;
  }
  return items;
};

const renderItems = (items) => {
  const gameArea = document.querySelector("#game-area");
  items.map((item, itemIndex) => {
    const square = document.createElement("div");
    // const title = document.createElement("h2");
    // title.innerText = item;
    // square.appendChild(title);
    square.style.boxShadow = "4px 2px 2px black";
    square.style.padding = "4px";
    square.style.width = "100px";
    square.style.height = "100px";
    square.style.margin = "10px";
    square.style.cursor = "pointer";
    square.style.border = "4px solid white";
    square.style.borderRadius = "10px";
    square.setAttribute("data-img", item.img);
    square.setAttribute("data-item", item.name);
    // title.style.visibility = "hidden"
    gameArea.appendChild(square);
    square.addEventListener("click", onSquareClick);
  });
};

const loadGame = (initalItems) => {
  const duplicatedArr = duplicateItems(initalItems);
  const randomisedArr = randomiseItems(duplicatedArr);
  renderItems(randomisedArr);
};

const onSquareClick = (event) => {
  const square = event.target;
  if (selected.includes(square)) {
    message("Cannot select the same square!", "orange");
    return;
  }
  if (selected.length < 2) {
    square.style.border = "4px solid greenyellow";
    const imageAttr = square.getAttribute("data-img");
    square.style.backgroundImage = `url("${imageAttr}")`;
    square.style.backgroundSize = "cover";
    square.style.backgroundRepeat = "no-repeat";
    selected.push(square);

    if (selected.length === 2) {
      setTimeout(() => {
        checkMatch();
      }, 1000);
    }
  }
};

const checkMatch = () => {
  if (selected.length === 2) {
    const itemOne = selected[0];
    const itemTwo = selected[1];
    const itemOneName = itemOne.getAttribute("data-item");
    const itemTwoName = itemTwo.getAttribute("data-item");
    itemOneName === itemTwoName
      ? match(itemOne, itemTwo)
      : noMatch(itemOne, itemTwo);
    gameOver();
  } else {
    message("Select a second square!", "orange");
  }
};

const match = (itemOne, itemTwo) => {
  selected = [];
  matched.push(itemOne, itemTwo);
  itemOne.style.border = "4px solid gold";
  itemOne.style.cursor = "auto";
  itemTwo.style.border = "4px solid gold";
  itemTwo.style.cursor = "auto";
  itemOne.removeEventListener("click", onSquareClick);
  itemTwo.removeEventListener("click", onSquareClick);
  message("Match!", "green");
};

const noMatch = (itemOne, itemTwo) => {
  itemOne.style.border = "4px solid red";
  itemTwo.style.border = "4px solid red";
  wrongAnswers++
  wrongAnswersCount()
  message("No match!", "red");
  setTimeout(() => {
    selected = [];
    itemOne.style.border = "4px solid white";
    itemOne.style.backgroundImage = "none";
    itemTwo.style.border = "4px solid white";
    itemTwo.style.backgroundImage = "none";
  }, 1000);
};

const message = (msg, color) => {
  messageElement.style.color = color;
  messageElement.innerHTML = msg;
  setTimeout(() => {
    messageElement.innerHTML = "";
  }, 1000);
};

const wrongAnswersCount = () => {
  const pluralOrNot = wrongAnswers === 1 ? "wrong answer" : "wrong answers"
  wrongAnswersElement.innerHTML = `${wrongAnswers} ${pluralOrNot}`
}

const run = (items) => {
  loadGame(items);
};

const gameOver = () => {
  if (matched.length === 12) {
    location.reload();
  }
};

run(initalItems);
