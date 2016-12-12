/**
* @providesModule ShoppingCartActions
*/

export const RESET = 'shopping_cart/reset';
export const ADD_ITEM = 'shopping_cart/add_item';
export const SELECT_ITEM = 'shopping_cart/select_item';
export const SELECT_AMOUNT = 'shopping_cart/select_amount';

export function reset() {
  return {
    type: RESET
  };
}

export function addItem(item, amount) {
  return {
    type: ADD_ITEM,
    item,
    amount
  };
}

export function selectItem(item) {
  return {
    type: SELECT_ITEM,
    item
  };
}

export function selectAmount(amount) {
  return {
    type: SELECT_AMOUNT,
    amount
  };
}