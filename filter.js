/**
 Challenge: Add a button that, when clicked, gets a new deck of cards from the deckofcards API
 
 URL: https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/
 
 Log the whole response to the console
 */

const button = document.querySelector("button");
button.addEventListener("click", getDeck);

function getDeck() {
  fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/",
    function (res) {
      return res.json(data => {
        console.log(data);
      });
    }
  );
}

// function getDeck() {
//   fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
//     .then(res => res.json())
//     .then(data => console.log(data));
// }

/**
 * Challenge:
 *
 * Part 1: Given the array of objects below, create a new array with the `.filter()`
 * array method that contains only the objects where "hasPet" is true
 *
 * Part 2: Move the anonymous in-line function to its own, named function
 */

const people = [
  { name: "Jack", hasPet: true, age: 12 },
  { name: "Jill", hasPet: false, age: 18 },
  { name: "Alice", hasPet: true, age: 22 },
  { name: "Bob", hasPet: false, age: 32 },
];

// console.log(people.filter(person => person.hasPet)); anonymous function
console.log(people.filter(withPet)); // named function

function withPet(person) {
  return person.hasPet;
}

/**
 * Extra challenge to practice array.filter:
 *
 * Using .filter, create a new array of people who are 18 and older
 * (should be Jill, Alice, and Bob)
 */

console.log(people.filter(olderAge)); // named function

function olderAge(person) {
  return person.age >= 18;
}

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => console.log(data));
}

document.getElementById("new-deck").addEventListener("click", handleClick);

// function callback() {
//     console.log("I finally ran!")
// }

// setTimeout(callback, 2000)

// const people = [
//     { name: "Jack", hasPet: true },
//     { name: "Jill", hasPet: false },
//     { name: "Alice", hasPet: true },
//     { name: "Bob", hasPet: false },
// ]

// function gimmeThePets(number) {
//     return person.hasPet
// }

// const peopleWithPets = people.filter(gimmeThePets)
// console.log(peopleWithPets)

/**
* Challenge: 
* 
* Write your own `filter` function! Don't worry about adding it to the 
prototype of arrays or anything.
* This function should take 2 parameters:
* 1. The array you want to filter through, and
* 2. A callback function
* 
* Steps for filterArray function logic:
* 1. Initialize a new, empty array which will be returned at the end 
of the `filterArray`s operations (Completed ✅)
* 2. Loop through the array passed as the 1st parameter
* 3. Inside the loop, call the callback function, passing the individual item 
you're currently looping over as the argument to your callback function
* 4. If the callback function returns `true`, push the current item 
you're iterating on in the loop to the new array. If it returns `false`, 
don't push it to the array.
* 5. When the loop is over, return the new array
*/

function filterArray(array, callback) {
  const resultingArray = [];
  // Write your filtering logic here
  for (let item of array) {
    callback(item) ? resultingArray.push(item) : resultingArray;
  }
  return resultingArray;
}
/**
 * Challenge: Use your filter array method!
 * Given the above `people` array, return a new array with only people
 * where `hasPet` is true
 * Note: Remember that your callback function will be given
 * the individual item in the array for a parameter
 */

// function callback(person) {
//   return person.hasPet;
// }
// const peopleWithPets = filterArray(people, callback);
const peopleWithPets = filterArray(people, function (person) {
  return person.hasPet;
});
console.log(peopleWithPets);
