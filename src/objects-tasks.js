/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */

function shallowCopy(obj) {
  const objSpread = { ...obj };
  const res = Object.assign(objSpread);
  return res;
}

/**
 * Merges array of objects into a single object. If there are overlapping keys, the values
 * should be summed.
 *
 * @param {Object[]} objects - The array of objects to merge
 * @return {Object} - The merged object
 *
 * @example
 *    mergeObjects([{a: 1, b: 2}, {b: 3, c: 5}]) => {a: 1, b: 5, c: 5}
 *    mergeObjects([]) => {}
 */
function mergeObjects(objects) {
  if (objects.length === 0) {
    return {};
  }
  if (objects.length === 1) {
    return objects[0];
  }
  const objLength = objects.length;

  const arrayOfKeys = Object.keys(objects[0]);
  const arrayOfValues = Object.values(objects[0]);

  for (let j = 1; j < objLength; j += 1) {
    const currentKeys = Object.keys(objects[j]);
    const currentValues = Object.values(objects[j]);
    for (let i = 0; i < currentKeys.length; i += 1) {
      if (arrayOfKeys.includes(currentKeys[i])) {
        const indexForMerge = arrayOfKeys.indexOf(currentKeys[i]);
        arrayOfValues[indexForMerge] += currentValues[i];
      } else {
        arrayOfKeys.push(currentKeys[i]);
        arrayOfValues.push(currentValues[i]);
      }
    }
  }
  const arrayFromResult = [];
  for (let i = 0; i < arrayOfKeys.length; i += 1) {
    arrayFromResult[i] = [`${arrayOfKeys[i]}`, arrayOfValues[i]];
  }

  const entriesFromResult = new Map(arrayFromResult);

  const result = Object.fromEntries(entriesFromResult);

  return result;
}

/**
 * Removes a properties from an object.
 *
 * @param {Object} obj - The object from which to remove the property
 * @param {Array} keys - The keys of the properties to remove
 * @return {Object} - The object with the specified key removed
 *
 * @example
 *    removeProperties({a: 1, b: 2, c: 3}, ['b', 'c']) => {a: 1}
 *    removeProperties({a: 1, b: 2, c: 3}, ['d', 'e']) => {a: 1, b: 2, c: 3}
 *    removeProperties({name: 'John', age: 30, city: 'New York'}, 'age') => {name: 'John', city: 'New York'}
 *
 */
function removeProperties(obj, keys) {
  const res = obj;
  if (keys === 'string') {
    delete res[keys];
    return res;
  }
  for (let i = 0; i < keys.length; i += 1) {
    if (Object.hasOwn(res, `${keys[i]}`)) {
      delete res[`${keys[i]}`];
    }
  }
  return res;
}

/**
 * Compares two source objects. Returns true if the objects are equal and false otherwise.
 * There are no nested objects.
 *
 * @param {Object} obj1 - The first object to compare
 * @param {Object} obj2 - The second object to compare
 * @return {boolean} - True if the objects are equal, false otherwise
 *
 * @example
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 2}) => true
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 3}) => false
 */
function compareObjects(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Checks if the source object is empty.
 * Returns true if the object contains no enumerable own properties, false otherwise.
 *
 * @param {Object} obj - The object to check
 * @return {boolean} - True if the object is empty, false otherwise
 *
 * @example
 *    isEmptyObject({}) => true
 *    isEmptyObject({a: 1}) => false
 */
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Makes the source object immutable by preventing any changes to its properties.
 *
 * @param {Object} obj - The source object to make immutable
 * @return {Object} - The immutable version of the object
 *
 * @example
 *    const obj = {a: 1, b: 2};
 *    const immutableObj = makeImmutable(obj);
 *    immutableObj.a = 5;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    delete immutableObj.a;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    immutableObj.newProp = 'new';
 *    console.log(immutableObj) => {a: 1, b: 2}
 */
function makeImmutable(obj) {
  return Object.freeze(obj);
}

/**
 * Returns a word from letters whose positions are provided as an object.
 *
 * @param {Object} lettersObject - An object where keys are letters and values are arrays of positions
 * @return {string} - The constructed word
 *
 * @example
 *    makeWord({ a: [0, 1], b: [2, 3], c: [4, 5] }) => 'aabbcc'
 *    makeWord({ H:[0], e: [1], l: [2, 3, 8], o: [4, 6], W:[5], r:[7], d:[9]}) => 'HelloWorld'
 */
function makeWord(lettersObject) {
  const keysLetters = Object.keys(lettersObject);
  const valuesIndex = Object.values(lettersObject);
  const resultArrayLength = Object.values(lettersObject)
    .join(',')
    .split(',')
    .join('').length;
  const resultArray = Array(resultArrayLength);

  for (let i = 0; i < resultArrayLength; i += 1) {
    if (valuesIndex[i] !== undefined) {
      for (let j = 0; j < valuesIndex[i].length; j += 1) {
        resultArray[valuesIndex[i][j]] = keysLetters[i];
      }
    }
  }
  return resultArray.join('');
}

/**
 * There is a queue for tickets to a popular movie.
 * The ticket seller sells one ticket at a time strictly in order and give the change.
 * The ticket costs 25. Customers pay with bills of 25, 50, or 100.
 * Initially the seller has no money for change.
 * Return true if the seller can sell tickets, false otherwise
 *
 * @param {number[]} queue - The array representing the bills each customer pays with
 * @return {boolean} - True if the seller can sell tickets to everyone, false otherwise
 *
 * @example
 *    sellTickets([25, 25, 50]) => true
 *    sellTickets([25, 100]) => false (The seller does not have enough money to give change.)
 */
function sellTickets(queue) {
  let cash = 0;
  for (let i = 0; i < queue.length; i += 1) {
    if (queue[i] === 25) {
      cash += 25;
    } else if (queue[i] === 50) {
      cash -= 25;
    } else {
      cash -= 75;
    }
    if (cash < 0) {
      return false;
    }
  }
  return true;
}

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = () => this.width * this.height;
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const object = JSON.parse(json);
  const objectValues = Object.values(object);

  const result = new proto.constructor(...objectValues);

  return result;
}

/**
 * Sorts the specified array by country name first and city name
 * (if countries are equal) in ascending order.
 *
 * @param {array} arr
 * @return {array}
 *
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 *    ]
 */
function sortCitiesArray(arr) {
  return arr.sort(function hi(a, b) {
    if (a.country !== b.country) {
      if (a.country > b.country) {
        return 1;
      }
      if (a.country < b.country) {
        return -1;
      }
      return 0;
    }
    if (a.city > b.city) {
      return 1;
    }
    if (a.city < b.city) {
      return -1;
    }
    return 0;
  });
}

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @param {array} array
 * @param {Function} keySelector
 * @param {Function} valueSelector
 * @return {Map}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ],
 *     item => item.country,
 *     item => item.city
 *   )
 *            =>
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"],
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
  const MAP = new Map();
  array.map(function hi(element) {
    const hasKey = !MAP.has(keySelector(element));
    if (hasKey) {
      MAP.set(keySelector(element), []);
    }
    MAP.get(keySelector(element)).push(valueSelector(element));
    return element;
  });
  return MAP;
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class CssBuilder {
  constructor(object, result) {
    Object.assign(this, object, result);
  }
}

const cssSelectorBuilder = {
  result: [],

  element(value) {
    if (this.result.includes('first')) {
      throw new TypeError(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    if (this.result.includes('second')) {
      throw new TypeError(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    if (this.result.includes('third')) {
      throw new TypeError(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    if (this.result.includes('fourth')) {
      throw new TypeError(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    if (this.result.includes('fifth')) {
      throw new TypeError(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    if (this.result.includes('sixth')) {
      throw new TypeError(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    const sel = [...this.result, `${value}`];
    sel.unshift('first');
    const obj = new CssBuilder(this, {
      result: sel,
    });
    return obj;
  },

  id(value) {
    if (this.result.includes('second')) {
      throw new TypeError(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }

    if (this.result.includes('third')) {
      throw new TypeError(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    if (this.result.includes('fourth')) {
      throw new TypeError(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    if (this.result.includes('fifth')) {
      throw new TypeError(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    if (this.result.includes('sixth')) {
      throw new TypeError(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }

    const sel = [...this.result, `#${value}`];
    sel.unshift('second');
    const obj = new CssBuilder(this, {
      result: sel,
    });
    return obj;
  },

  class(value) {
    if (this.result.includes('fourth')) {
      throw new TypeError(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    if (this.result.includes('fifth')) {
      throw new TypeError(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    if (this.result.includes('sixth')) {
      throw new TypeError(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    const sel = [...this.result, `.${value}`];
    sel.unshift('third');
    const obj = new CssBuilder(this, {
      result: sel,
    });
    return obj;
  },

  attr(value) {
    if (this.result.includes('fifth')) {
      throw new TypeError(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    if (this.result.includes('sixth')) {
      throw new TypeError(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    const sel = [...this.result, `[${value}]`];
    sel.unshift('fourth');
    const obj = new CssBuilder(this, {
      result: sel,
    });
    return obj;
  },

  pseudoClass(value) {
    if (this.result.includes('sixth')) {
      throw new TypeError(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    const sel = [...this.result, `:${value}`];
    sel.unshift('fifth');
    const obj = new CssBuilder(this, {
      result: sel,
    });
    return obj;
  },

  pseudoElement(value) {
    if (this.result.includes('sixth')) {
      throw new TypeError(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    const sel = [...this.result, `::${value}`];
    sel.unshift('sixth');
    const obj = new CssBuilder(this, {
      result: sel,
    });
    return obj;
  },

  combine(selector1, combinator, selector2) {
    const res = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;

    return {
      stringify: function str() {
        return res;
      },
    };
  },
  stringify() {
    for (let i = 0; i < 10; i += 1) {
      if (this.result.includes('first')) {
        this.result.splice(this.result.indexOf('first'), 1);
      }
      if (this.result.includes('second')) {
        this.result.splice(this.result.indexOf('second'), 1);
      }
      if (this.result.includes('third')) {
        this.result.splice(this.result.indexOf('third'), 1);
      }
      if (this.result.includes('fourth')) {
        this.result.splice(this.result.indexOf('fourth'), 1);
      }
      if (this.result.includes('fifth')) {
        this.result.splice(this.result.indexOf('fifth'), 1);
      }
      if (this.result.includes('sixth')) {
        this.result.splice(this.result.indexOf('sixth'), 1);
      }
    }

    return this.result.join(',').split(',').join('');
  },
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
