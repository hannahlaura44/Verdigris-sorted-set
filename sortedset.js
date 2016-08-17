(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    global.SortedSet = factory();
  }
}(this, function() {
  "use strict";

  // Internal private array which holds actual set elements
  var setArray;

  // Constructor for the SortedSet class
  function SortedSet(initial) {
    setArray = [];
    if (arguments.length > 0) {
      // TODO: Handle the case when initial array is provided; if array has
      // elements of duplicate value, reduce down to one instance and sort the
      // elements in ascending order.
      for (var i = 0; i < initial.length; i++) {
        this.add(initial[i]);
      }
      // console.log('setArray no duplicates: ', setArray);
    }
  }

  /* Accessor; returns element at index
   */
  SortedSet.prototype.at = function(index) {
    return setArray[index];
  };

  /* Converts a set into an Array and returns the result
   */
  SortedSet.prototype.toArray = function() {
    return setArray.slice(0);
  };

  /* Converts a set into a String and returns the result
   */
  SortedSet.prototype.toString = function() {
    return setArray.toString();
  };

  /* Synchronously iterates elements in the set
   */
  SortedSet.prototype.forEach = function(callback, thisArg) {
    if (this === void 0 || this === null ||
        setArray === void 0 || setArray === null) {
      throw new TypeError();
    }

    var t = Object(setArray);
    var len = t.length >>> 0;
    if (typeof callback !== "function") {
      throw new TypeError();
    }

    var context = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t) callback.call(context, t[i], i, t);
    }
  };

  /* Read-only property for getting number of elements in sorted set
   */
  Object.defineProperty(SortedSet.prototype, 'length', {
    get: function() {
      return setArray.length;
    }
  });

  /* Returns true if a given element exists in the set
   */
  SortedSet.prototype.contains = function(element) {
    // TODO: Implement contains method
    if (setArray.indexOf(element) === -1) {
      return false;
    } else {
      return true;
    }
  };

  /* Gets elements between startIndex and endIndex. If endIndex is omitted, a
   * single element at startIndex is returned.
   */
  SortedSet.prototype.get = function(startIndex, endIndex) {
    // TODO: Implement get method
    // console.log('startIndex: ',startIndex);
    // console.log('endIndex: ',endIndex);
    // console.log('setArray: ',setArray);
    if (!endIndex) {
       // console.log('no end index');
      return setArray[startIndex];
    } else {
      var result = setArray.slice(startIndex,endIndex);
      result.push(setArray[endIndex]);
      // console.log('result: ',result);
      return result;
    }
  };

  /* Gets all items between specified value range. If exclusive is set, values
   * at lower bound and upper bound are not included.
   */
  SortedSet.prototype.getBetween = function(lbound, ubound, exclusive) {
    // TODO: Implement getBetween method
    // console.log('lbound: ',lbound);
    // console.log('ubound: ',ubound);
    // console.log('setArray: ',setArray);
    var startIndex;
    // define start index (iterate front to back)
    for (var i = 0; i < setArray.length; i++) {
      if (setArray[i] >= lbound) {
        startIndex = i;
        break;
      }
    }
    var endIndex;
    // define end index (iterate back to front)
    for (i = setArray.length; i > 0; i--) {
      if (setArray[i] <= ubound) {
        endIndex = i;
        break;
      }
    }
    // console.log('startIndex: ',startIndex);
    // console.log('endIndex: ',endIndex);
    var result = this.get(startIndex,endIndex);
    // console.log('result inclusive: ',result);
    if (exclusive) {
      if (result[0] === lbound) {
        result.shift();
      }
      if (result[result.length-1] === ubound) {
        result.pop();
      }      
      // console.log('result exclusive: ',result);
      return result;
    }
    return result;
  };

  /* Adds new element to the set if not already in set
   */
  SortedSet.prototype.add = function(element) {
    // TODO: Implement add method

    // console.log('setArray before add: ', setArray)
    // console.log('element to add: ', element)

    if (this.contains(element)) {
      return;
    }
    setArray.push(element);
    setArray.sort(sortNumber);
    return;
  };

  function sortNumber(a,b) {
    return a - b;
  }


  /* BONUS MARKS AWARDED IF IMPLEMENTED
   * Implement an asynchronous forEach function. (See above for synchrnous
   * implementation). This method ASYNCHRONOUSLY iterates through each elements
   * in the array and calls a callback function.
   */

  /* Removes element from set and returns the element
   */
  SortedSet.prototype.remove = function(element) {
    // TODO: Implement remove method\\
    // console.log('setArray ',setArray);
    // console.log('el ',element);
    if (!this.contains(element)) {
      console.log('element does not exist in the setArray');
      return;
    }
    var index = setArray.indexOf(element);
    if (index === 0) {
      return setArray.shift();
    }
    var front = this.get(0,index-1);
    var back = this.get(index+1,setArray.length-1);
    if (front.constructor === Array) { //if front is an array
      setArray = front.concat(back);
      return element;
    }
    // if front is a single element
    setArray = back;
    setArray.unshift(front);
    return element;
  };

  /* Removes element at index location and returns the element
   */
  SortedSet.prototype.removeAt = function(index) {
    // TODO: Implement removeAt method
    // self.remove(setArray[index])
    var el = this.get(index);
    return this.remove(el);
  };

  /* Removes elements that are larger than lower bound and smaller than upper
   * bound and returns removed elements.
   */
  SortedSet.prototype.removeBetween = function(lbound, ubound, exclusive) {
    // TODO: Implement removeBetween method
    var remove = this.getBetween(lbound,ubound,exclusive);
    for (var i = 0; i < remove.length; i++) {
      this.remove(remove[i]);
    }
    return remove;
  };

  /* Removes all elements from the set
   */
  SortedSet.prototype.clear = function() {
    // TODO: Implement clear method
    setArray.splice(0);
  };

  SortedSet.prototype.forEachAsync = function(callback, thisArg) {
    // TODO: Implement for bonus marks
  };

  return SortedSet;
}));
