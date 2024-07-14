/*
Homework #3
----------------------------------------------------------------------------
Explain what is prototype and what is prototype chain in your own words
- The prototype is a class object that other objects can inherit properties and methods from.
- The prototype chain is a mechanism for objects inheriting properties and objects from other objects, forming a chain.

----------------------------------------------------------------------------
Implement your versions of the following Array methods (choose 6).
map[X], filter[X], reduce, every[X], find[X], includes[X], join[X], pop[X], push[X], reverse[X], slice[X], sort
*/

// ----------------------------------------------------------------------------
// **** [custom map] ****
Array.prototype.myMap = function (cb) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr[i] = cb(this[i], i, this); // populate array
  }
  return newArr;
};

// ----------------------------------------------------------------------------
// **** [custom filter] ****
Array.prototype.myFilter = function (cb) {
  let tempArr = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      tempArr.push(this[i]);
    }
  }
  return tempArr;
};

// ----------------------------------------------------------------------------
// **** [custom every] ****
Array.prototype.myEvery = function (cb) {
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this) === false) {
      return false;
    }
  }
  return true;
};

// ----------------------------------------------------------------------------
// **** [custom find] ****
Array.prototype.myFind = function (cb) {
  for (let i = 0; i < this.length; i++) {
    // if true return element
    if (cb(this[i], i, this)) {
      return this[i];
    }
  }
  // otherwise didn't find anything so return undefined
  return undefined;
};

// ----------------------------------------------------------------------------
// **** [custom includes] ****
Array.prototype.myIncludes = function (value, fromIndex) {
  let startIndex = 0;
  // if fromIndex greater than array length return false
  if (fromIndex > this.length - 1) {
    return false;
  }
  // otherwise if fromIndex is 0 or doesn't exists
  for (let i = startIndex; i < this.length; i++) {
    if (value === this[i]) {
      return true;
    }
  }
  return false;
};

// ----------------------------------------------------------------------------
// **** [custom join] ****
Array.prototype.myJoin = function (value) {
  let result = "";

  // case for empty element
  if (this.length === 0) return result;

  // case for only 1 element
  if (this.length === 1) {
    result += this[0];
    return result;
  }

  let separator = ",";
  // // if separator is defined - reassign
  if (value !== undefined) {
    separator = value;
  }

  // case for element with more than 1
  for (let i = 0; i < this.length - 1; i++) {
    // case if element is undefined or null
    if (this[i] === undefined || this[i] === null) {
      result += "";
    } else {
      result += this[i] + separator;
    }
  }
  result += this[this.length - 1]; // add last value
  return result; // return
};

// ----------------------------------------------------------------------------
// **** [custom pop] ****
Array.prototype.myPop = function () {
  let value = "";
  if (this.length == 0) return undefined;

  let result = this[this.length - 1]; // save value

  // update arr
  this.length -= 1;
  return result;
};

// ----------------------------------------------------------------------------
// **** [custom push] ****
Array.prototype.myPush = function (...values) {
  for (let i = 0; i < values.length; i++) {
    this[this.length + i] = values[i]; // add to the array
  }

  this.length += values.length - 1; // update arr len
  return this.length;
};

// ----------------------------------------------------------------------------
// **** [custom slice] ****
Array.prototype.mySlice = function (start, end) {
  // case for start and end being undefined
  if (start === undefined && end === undefined) {
    return this;
  }

  let newArr = [];
  // case for start value greater than arr length
  if (start > this.length) {
    return newArr;
  }

  // case if start is between 0 and arr length
  let startIndex = 0;

  if (start >= 0 && start < this.length) {
    startIndex = start;
  }

  if (start < 0 && Math.abs(start) < this.length) {
    startIndex = this.length - Math.abs(start);
  }

  let endIndex = this.length;

  if (end !== undefined) {
    endIndex = end;
  }

  if (end > this.length) {
    endIndex = this.length;
  }

  if (end < 0 && Math.abs(end) < this.length) {
    endIndex = this.length - Math.abs(end);
  }

  // case if end index is before start index
  if (endIndex < startIndex) return newArr;

  let index = 0;
  for (let i = startIndex; i < endIndex; i++) {
    newArr[index] = this[i];
    index++;
  }
  return newArr;
};

// ----------------------------------------------------------------------------
// **** [custom reverse] ****
Array.prototype.myReverse = function () {
  let start = 0;
  let end = this.length - 1;
  while (start <= end) {
    let tempValue = this[start]; // temp
    this[start] = this[end]; // replace start with end value
    this[end] = tempValue; // replace end with old start value (temp)
    start++; // increment
    end--; // decrement
  }
  return this;
};
