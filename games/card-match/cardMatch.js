// array with 6
// duplicate the 6 and randomise there placements in the arr
// render them as squares
// when the first square is clicked we flip it to show its value
// we hold this value and wait for the next selection
// we check if the two match
// if success they stay flipped else they both revert back and we clear the selections

const initalItems = ["Snake", "Hamster", "Fish", "Rabbit", "Cat", "Dog"];

const duplicateItems = (items) => {
  let duplicatedItems = [...items];
  items.map((item) => {
    duplicatedItems.push(item);
  });
  return duplicatedItems;
};

const randomiseItems = (items) => {
  const arrLength = items.length; // length will always be one more than the actuall indexs (basically counts like us 1,2,3)
  for (i = 0; i < arrLength; i++) {
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
    square.style.border = "1px solid red";
    square.style.padding = "4px";
    square.style.width = "60px";
    square.style.height = "60px";
    square.style.margin = "10px";
    gameArea.appendChild(square);
  });
};

const loadGame = (initalItems) => {
  const duplicatedArr = duplicateItems(initalItems);
  const randomisedArr = randomiseItems(duplicatedArr);
  const render = renderItems(randomisedArr);
  console.log(render)
};
loadGame(initalItems);
