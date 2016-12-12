import { Map } from 'immutable';
import * as types from 'ShoppingCartActions';
/* Lodash is a very nifty library for various array/map/list manipulation
 * tasks, so we use this instead of writing our own utilities */
import _ from 'lodash';

export const initialState = {
	items: [],
  sum: 0,
  discount: 0,
  selectedItem: null,
  selectedAmount: 0
};

function reset() {
	return Map(initialState);
}

function addItem(state, item, amount) {
  item['amount'] = amount;
  const items    = mergeIntoArray(state.get('items').slice(), item);
  const sum      = calculateSum(items);
  const discount = calculateDiscount(items);
  return state.set('items', items)
              .set('sum', sum)
              .set('discount', discount);
}

function selectItem(state, item) {
  return state.set('selectedItem', item);
}

function selectAmount(state, amount) {
  return state.set('selectedAmount', amount)
}

/* Override previous item record in the item cart or push a new one */
function mergeIntoArray(array, item) {
  const index = _.indexOf(array, _.find(array, {id: item.id}));
  if (index != -1) {
    array.splice(index, 1, item);
  } else {
    array.push(item);
  }
  return array;
}

/* Since .toFixed() returns a string, we have to cast it back */
function calculateSum(items) {
  let sum = 0;
  items.map((item) => {
    sum += +((item.price * item.amount).toFixed(2));
  });
  return sum;
}

function calculateDiscount(items) {
  const discountItem = _.find(items, {id: 3});
  return discountItem ? +((Math.floor(discountItem.amount / 3) * discountItem.price).toFixed(2)) : 0;
}

/* As we use immutable.js, we initialize the state as a immutable map. */
export default function(state = Map(initialState), action) {
  switch (action.type) {
    case types.RESET:
      return reset();
    case types.ADD_ITEM:
      return addItem(state, action.item, action.amount);
    case types.SELECT_ITEM:
      return selectItem(state, action.item);
    case types.SELECT_AMOUNT:
      return selectAmount(state, action.amount);
  }
  return state;
}