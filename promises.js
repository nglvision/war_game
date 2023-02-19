// Promise: "we'll let you know in a week"
// stages of promise:
// 1. Pending - the promise has yet to be completed
// 2. Fullfilled - the promise was completed as promised (resolved): run .then() blocks
// 3. Rejected - the promise was not completed as promised (rejecte d)

// document
//   .getElementById("new-deck")
//   .addEventListener("click", () => console.log("clicked"));

const button = document.querySelector("button");
button.addEventListener("click", getDeck);

function getDeck() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => console.log(data)); //promise chaining
}

// 2. Given the array below, chain the `.filter` and `.map` array methods
// together to turn the array into an array of string email addresses
// of only the people in the array who voted. Log the array of email addresses
// to the console

const voters = [
  { name: "Joe", email: "joe@joe.com", voted: true },
  { name: "Jane", email: "jane@jane.com", voted: true },
  { name: "Bo", email: "bo@bo.com", voted: false },
  { name: "Bane", email: "bane@bane.com", voted: false },
];

const finalResult = voters
  .filter(voter => voter.voted)
  .map(voter => voter.email);

// console.log(finalResult);

/**
 * Time to be curious!
 *
 * What would happen if you didn't return `res.json()`
 * from the first .then block?
 *
 * What would the next .then() callback receive as its
 * parameter if you returned something totally different??
 */

fetch("https://apis.scrimba.com/bored/api/activity")
  .then(function (res) {
    return "Hello";
  })
  .then(function (whatever) {
    console.log(whatever);
    return "World";
  })
  .then(function (another) {
    console.log(another);
  });
