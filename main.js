let numbers = [1, 2, -1, -5, -10, 10, 20, 100, 14, 24, -4, 124, 2];

let newArr = [];

for (const number of numbers) {
  newArr.push(number < 0 ? number * 2 : number * 4);
}

console.log(newArr.reduce((a, b) => a + b, 0));
