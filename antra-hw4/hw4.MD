#HW4

## What is the difference between instance methods and static methods?

- The difference between instance methods and static methods are:

Instance methods:

- Are called on instances (objects) of that class --> create instance (obj = MyClass(10))
- Operate on data that is specific to the instance
- Ex. obj.instanceMethod()

Static methods:

- Are not tied to specific instances --> using the MyClass
- Does not operate on instance data but can be used for utility or helper functions that relate to the class
- Ex. MyClass.staticMethod()

## How does Javascript handle concurrency?

- JavaScript handles concurrency primarily through the use of the event loop and the callback queue. First, synchronous code is executed line by line and added to the callstack. When asynchronous operations are encountered they are handed off to the browser or Node.js. When the async operations complete, its callback is placed in the callback queue. Lastly, the event loop constantly checks if the call stack is empty and if it is it takes the first callback from the callback queue and places it on the call stack, and executes it.

## What is async/await? How does it differ from using the promise instance methods?

- Async / await is fetching data asychronously and waiting for the results to arrive using the await. It provides a cleaner and more readable way to handle asynchronous operations. While both handle async operations, the promise instance methods is different because it often involves chaining. Async / await avoids the chaining and nesting that comes with promises. Additionally, promises use .then(), .catch(), and .finally() while async / await use try / catch blocks.

## Can you use await outside of an async function?

- No you cant use await oustide of an async function, they come in as a pair. You can only use await inside of an async function.

## What is callback hell and why is it considered a problem?

- Callback hell is when multiple nested callbacks are used in asynchronous programming. It's considered a problem because it makes the code hard to read and unmaintainable.
