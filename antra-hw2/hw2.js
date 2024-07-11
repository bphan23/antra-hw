/*
---------------------------------------------------------------------
Why are closures useful in JavaScript? Give an example use case.
- Closures are useful in JavaScript because you can access and manipulate variables that were defined in their outer scope.
- Use Case: Create private variables like we did in training so that the data is encapsulated and protected so that it can't be accessed or modified outside the scope.

---------------------------------------------------------------------
When should you choose to use “let” or “const”
- You should use let for variable that get updated
- You should use const for variables that don't get updated (they remain constant)

---------------------------------------------------------------------
Give an example of a common mistake related to hoisting and explain how to fix it.
- A common mistake for hoisting is when using var and defining it after calling it, only the declaration is hoisted not the assignment of the function, leading to a TypeError.
- You can fix this by using the function keyword for functions or making sure the function expression is defined before it's called.

---------------------------------------------------------------------
What will the outcome of each console.log() be after the function calls? Why?
- 1.) Outcome: [1, 2, 3] --> we push 3 to the array [1, 2]
- 2.) Outcome: [1, 2, 3] --> remain the same, assigns passed in arg to new array
- 3.) Outcome: [1, 2, 3, 3] --> point b to arr, push in 3
- 4.) Outcome: [1, 2, 3, 3] --> remains the same, assigns b to new array locally

---------------------------------------------------------------------
*/

// const arr = [1, 2];
// function foo1(arg) {
//   arg.push(3);
// }
// foo1(arr);
// console.log(arr);

// function foo2(arg) {
//   arg = [1, 2, 3, 4];
// }
// foo2(arr);
// console.log(arr);

// function foo3(arg) {
//   let b = arg;
//   b.push(3);
// }
// foo3(arr);
// console.log(arr);

// function foo4(arg) {
//   let b = arg;
//   b = [1, 2, 3, 4];
// }
// foo4(arr);
// console.log(arr);
