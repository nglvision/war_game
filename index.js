const newDeck = document.getElementById("new-deck");
const cardsContainer = document.querySelector(".cards-container");
const cardsButton = document.getElementById("cards");
const cardSlot = document.querySelectorAll(".card-slot");
const computerScore = document.getElementById("computer-score");
const myScore = document.getElementById("my-score");
const war = document.getElementById("war");
const remainingCards = document.getElementById("remaining-cards");
let deckId;
let score1;
let score2;

//getting a new deck from API
async function getDeck() {
  score1 = 0;
  score2 = 0;
  war.textContent = "GOW";
  war.classList.remove("war");
  computerScore.innerHTML = score1;
  myScore.innerHTML = score2;
  cardsContainer.innerHTML =
    '<div class="card-slot cover"></div><div class="card-slot cover"></div>';
  const res = await fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
  );
  const data = await res.json();
  remainingCards.textContent = `남은 카드 수: ${data.remaining}`;
  deckId = data.deck_id;
  if (data.remaining > 0) {
    // cardsButton.textContent = "카드 뽑기";
    // cardsButton.removeAttribute("disabled");
    cardsButton.disabled = false;
  }
}
// function getDeck() {
//   score1 = 0;
//   score2 = 0;
//   war.textContent = "GOW";
//   war.classList.remove("war");
//   computerScore.innerHTML = score1;
//   myScore.innerHTML = score2;
//   cardsContainer.innerHTML =
//     '<div class="card-slot cover"></div><div class="card-slot cover"></div>';
//   fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
//     .then(res => res.json())
//     .then(data => {
//       remainingCards.textContent = `남은 카드 수: ${data.remaining}`;
//       deckId = data.deck_id;
//       if (data.remaining > 0) {
//         // cardsButton.textContent = "카드 뽑기";
//         // cardsButton.removeAttribute("disabled");
//         cardsButton.disabled = false;
//       }
//     }); //promise chaining
// }

newDeck.addEventListener("click", getDeck);

//getting two cards from the deck
// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2

async function getCards() {
  if (deckId) {
    const res = await fetch(
      `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    );
    const data = await res.json();
    // console.log(data);
    cardWinner(data.cards[0], data.cards[1]);
    cardsContainer.innerHTML = `
        <div class="card-slot">
        <img src="${data.cards[0].image}">
        </div>
        <div class="card-slot">
        <img src="${data.cards[1].image}">
        </div>`;
    remainingCards.textContent = `남은 카드 수: ${data.remaining}`;
    if (data.remaining === 0) {
      // cardsButton.textContent = "Game Over";
      // cardsButton.setAttribute("disabled", true);
      cardsButton.disabled = true;
      if (score1 > score2) {
        war.classList.add("war");
        war.textContent = "컴퓨터가 이겼습니다!";
      } else if (score2 > score1) {
        war.classList.add("war");
        war.textContent = "내가 이겼습니다!";
      } else {
        war.classList.add("war");
        war.textContent = "무승입니다!";
      }
    }
  } else {
    alert("새 덱 가져오세요");
  }
}
// function getCards() {
//   if (deckId) {
//     fetch(
//       `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
//     )
//       .then(res => res.json())
//       .then(data => {
//         // console.log(data);
//         cardWinner(data.cards[0], data.cards[1]);
//         cardsContainer.innerHTML = `
//         <div class="card-slot">
//         <img src="${data.cards[0].image}">
//         </div>
//         <div class="card-slot">
//         <img src="${data.cards[1].image}">
//         </div>`;
//         remainingCards.textContent = `남은 카드 수: ${data.remaining}`;
//         if (data.remaining === 0) {
//           // cardsButton.textContent = "Game Over";
//           // cardsButton.setAttribute("disabled", true);
//           cardsButton.disabled = true;
//           if (score1 > score2) {
//             war.classList.add("war");
//             war.textContent = "컴퓨터가 이겼습니다!";
//           } else if (score2 > score1) {
//             war.classList.add("war");
//             war.textContent = "내가 이겼습니다!";
//           } else {
//             war.classList.add("war");
//             war.textContent = "무승입니다!";
//           }
//         }
//       });
//   } else {
//     alert("새 덱 가져오세요");
//   }
// }
cardsButton.addEventListener("click", getCards);

//"2" is the lowest score and "ACE" is the highest.
const valueOptions = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
];

//The function determines which of the 2 cards (`card1`
//  or `card2`) has the higher score, or if they have the same score.
function cardWinner(card1, card2) {
  cardIndex1 = valueOptions.indexOf(card1.value); //option 1 on finding index
  cardIndex2 = valueOptions.findIndex(item => item === card2.value); //option 2 on finding index
  if (cardIndex1 > cardIndex2) {
    score1++;
    war.classList.remove("war");
    war.textContent = "GOW";
  } else if (cardIndex1 < cardIndex2) {
    score2++;
    war.classList.remove("war");
    war.textContent = "GOW";
  } else {
    war.classList.add("war");
    war.textContent = "War!";
  }
  computerScore.textContent = score1;
  myScore.textContent = score2;
}
