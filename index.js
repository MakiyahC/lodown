'use strict';

// YOU KNOW WHAT TO DO //

/**
 * identity: Returns the input value.
 */ 
function identity(value){
    return value;
}
module.exports.identity = identity;

/**
 * typeOf: Takes a value, and returns a String 
 * representing the type of the value.
 * 
 * @param {Anything} value: Any type of value.
 * 
 * @return {String}: A String representing the 
 * type of the value.
 */
function typeOf(value) {
  if(Array.isArray(value)) return "array";
  if(value instanceof Date) return "date";
  if(value === null) return "null";
  return typeof value;
}
module.exports.typeOf = typeOf;

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 * first: Designed to pull values from the front of any array 
 * 
 * @param {Array} array: The array that will 
 * @param {Number} n: The Function to be applied to each value in the 
 * collection
 * 
 * @return {Array}: Returns the pulled values as strings in an array
 */
 function first(array, n) {
    if(!Array.isArray(array) || n < 0) return [];
    if(n === undefined) return array[0];
    return array.slice(0, n);
}
module.exports.first = first;

/**
 * last: Designed to pull values end the front of any array 
 * 
 * @param {Array} array: The array that will 
 * @param {Number} n: The Function to be applied to each value in the 
 * collection
 * 
 * @return {Array}: Returns the pulled values as strings in an array
 */

 function last(array, n) {
  if(!Array.isArray(array)) return [];
  if(n === undefined || typeof n !== "number") return array.slice(-1)[0];
  if(!Array.isArray(array) || n < 0) return [];
  return array.slice(-n);
}
module.exports.last = last;

/**
 * indexOf: Designed to search for the position of a value in an array
 * 
 * @param {Array} array: The array in which the value is searched for
 * @param {Value} value: The value that is you want to search the array for
 * 
 * @return {Number}: Returns the index of the found value
 */
function indexOf(array, value){
  for (var i = 0; i < array.length; i++){
    if (array[i] == value){
      return i;
    } 
  }
  return -1;
}
module.exports.indexOf = indexOf;


/**
 * filter: Designed to perform a test of values of a array 
 * to get a boolean value
 * 
 * @param {Array} collection: Holds values that will be tested
 * @param {Function} test: The test performed on the values of an array
 * 
 * @return {Array}: Returns an array of all filtered values 
 * (the ones that returned true)
 */
 function filter(collection, test) {
  const filtered = [];
  each(collection, function(value, position, collection) {
    if(test(value,position, collection)) filtered.push(value);
  });
  return filtered;
}
module.exports.filter = filter;

/**
 * reject: Designed to perform a test of values of a array 
 * to get a boolean value
 * 
 * @param {Array} collection: Holds values that will be tested
 * @param {Function} func: The test performed on the values of an array
 * 
 * @return {Array}: Returns an array of all filtered values 
 * (the ones that returned false)
 */
 
 function reject(collection, func) {
  const filtered = [];
  filter(collection, function(value, position, collection) {
    if(!func(value,position, collection)) filtered.push(value);
  });
  return filtered;
}
 module.exports.reject = reject;
 
 /**
 * partition: Designed to perform a test of values of a array 
 * to get a boolean value
 * 
 * @param {Array} array: Holds values that will be tested
 * @param {Function} func: The test performed on the values of an array
 * 
 * @return {Array}: Returns an array holding a truthy AND falsey 
 * arrays (2 arrays)
 */
 
 function partition(array, func){
  return [filter(array, func),reject(array, func)];
}
 module.exports.partition = partition;

/**
 * unique: Removes all duplicates from an array
 * 
 * @param {Array} array: The test checked for duplicates
 * 
 * @return {Array}: Returns a new array with duplicates removed
 */
 
 function unique(array) {
  const output = [];
  each(array, function(value) {
    if(indexOf(output, value) === -1){
      output.push(value);
    }
  });
  return output;
}
  module.exports.unique = unique;

 
/**
 * reject: Designed to alter a set of values in an array
 * 
 * @param {Array} collection: Holds values that will be changed
 * @param {Function} transform: The transformation is performed on
 * the values of any array
 * 
 * @return {Array}: Returns an array of all altered values
 */
 
  function map(collection, transform) {
  const transformed = [];   
each(collection, function(value, pos, collection) {
    transformed.push(transform(value, pos, collection));
  });
  return transformed;
}
   module.exports.map = map;
/**
 * pluck: Designed to pluck the values from a key into an array
 * 
 * @param {Array} array: An array of objects
 * @param {Property} key: 
 * 
 * @return {Array}: Returns an array of values (keys)
 */
 
 function pluck(array, key) {
  return map(array, function(obj, pos, array) {
    return obj[key];
  });
}
 
 module.exports.pluck = pluck;
 
 /**
 * contains: Designed to
 * 
 * @param {Array} arr: Where we look to see if value is
 * @param {Value} val: The value we are looking for in the array
 * 
 * @return {Boolean}: Returns whether or not a value is in the given array 
 */
 
 function contains(array, value) {
  if(array.indexOf(value) > -1){
    return true;
  }else {
    return false;
  }
}
 
 module.exports.contain = contains;
 
 /**
 * every: Designed to do a test on all elements of an array and if you get true
 * for at least one return true
 * 
 * @param {Array} collection: Where we get the elements from
 * @param {Function} test: The funtion we perform on each element
 * 
 * @return {Boolean}: Returns true of false
 */
 
  function every(collection, test) {
   if(test === undefined) test = identity;
   var result = true;
   each(collection, function(value, position, collection){
     if(!test(value, position,collection)) result = false; 
     
   });
   return result;
 }
 
 
 module.exports.every = every;
 
  /**
 * some: Designed to do a test on all elements of an array and if you get true
 * for at least one return true
 * 
 * @param {Array} collection: Where we get the elemsnts from
 * @param {Function} test: The funtion we perform on the the elements
 * 
 * @return {Boolean}: Returns true of false 
 */
 
  function some(collection, test) {
   if(test === undefined) test = identity;
   var result = false;
   each(collection, function(value, position, collection){
     if(test(value, position,collection)) result = true; 
     
   });
   return result;
 }
 
 module.exports.some = some;
 
  /**
 * reduce: Designed to do something to each element in an array and pump it to 
 * seed
 * 
 * @param {Array} array: Where we we get the elements from
 * @param {Function} combine: The action performed on each element of the array
 * @param {Seed} seed: What we would use as previous result

 * @return {Value}: Returns the value of seed 
 */
 
 function reduce(array, combine, seed) {
  let 
    combined = seed,
    i = 0;
    if(combined === undefined){
      combined = array[0];
      i = 1;
    }
    for (; i < array.length; i++){
      combined = combine(combined, array[i], i, array);
    }
    return combined;
}
 
 module.exports.reduce = reduce;
 
  /**
 * extend: Designed to copy properties from one object or objects to another
 * 
 * @param {Object} copyTo: The original object
 * @param {Objects} objs: The object whos properties you copy to CopyTo
 * 
 * @return {Boolean}: Returns updated object 
 */
 
 function extend(copyTo){
  var objs = Array.prototype.slice.call(arguments, 1);
  for (var i = 0; i < objs.length; i++) {
    // get o at i
    var obj = objs[i];
    for (var key in obj){
      copyTo[key] = obj[key];
    }
  }
  return copyTo;
}
 
 module.exports.extend = extend;
     