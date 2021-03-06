/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import Alert from 'react-s-alert';
import CART_TYPES from './types';
import store from '../store';

const axios = require('axios');

export const addToCart = (movieId, quantity, title) => async (dispatch) => {
  await axios.post('/api/cart/addtocart', { movieId, quantity })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: CART_TYPES.ADD_TO_CART,
        order: res.data,
        price: Number((res.data.quantity * 0.99).toFixed(2)),
      });
      Alert.success(`${title} added to cart!`, {
        effect: 'slide',
        timeout: 1500,
      });
      console.log('UPDATED STORE', store.getState().cartReducer);
    });
};

export const getCartItems = () => async (dispatch) => {
  await axios.get('/api/cart')
    .then((res) => {
      if (res.data.length) {
        dispatch({
          type: CART_TYPES.GET_CART_ITEMS,
          orders: res.data,
          total: res.data.map((order) => Number(order.quantity)).reduce((a, b) => a + (b * 0.99)),
        });
      } else {
        dispatch({
          type: CART_TYPES.GET_CART_ITEMS,
          orders: res.data,
          total: Number(0),
        });
      }
    });
};

export const getActiveCartItems = () => async (dispatch) => {
  await axios.get('api/cart/active')
    .then((res) => {
      if (res.data.length) {
        dispatch({
          type: CART_TYPES.GET_ACTIVE_CART_ITEMS,
          orders: res.data,
          total: res.data.map((order) => Number(order.quantity)).reduce((a, b) => a + (b * 0.99)),
        });
      } else {
        dispatch({
          type: CART_TYPES.GET_ACTIVE_CART_ITEMS,
          orders: res.data,
          total: Number(0),
        });
      }
    });
};

export const removeFromCart = (movieId, cartId, title) => async (dispatch) => {
  await axios.delete(`/api/cart/removefromcart/${movieId}/${cartId}`);
  await axios.get('/api/cart/active')
    .then((res) => {
      if (res.data.length) {
        dispatch({
          type: CART_TYPES.REMOVE_FROM_CART,
          orders: res.data,
          total: res.data.map((order) => Number(order.quantity)).reduce((a, b) => a + (b * 0.99)),
        });
        Alert.error(`${title} removed from cart`, {
          effect: 'slide',
          timeout: 1500,
        });
      } else {
        dispatch({
          type: CART_TYPES.REMOVE_FROM_CART,
          orders: res.data,
          total: Number(0),
        });
        Alert.error(`${title} removed from cart`, {
          effect: 'slide',
          timeout: 1500,
        });
      }
    });
};

export const editCartQuantity = (movieId, cartId, quantity) => async (dispatch) => {
  await axios.put(`/api/cart/editcartquantity/${movieId}/${cartId}`, {
    quantity,
  });
  await axios.get('/api/cart/active')
    .then((res) => {
      if (res.data.length) {
        dispatch({
          type: CART_TYPES.EDIT_CART_QUANTITY,
          orders: res.data,
          total: res.data.map((order) => Number(order.quantity)).reduce((a, b) => a + (b * 0.99)),
        });
      } else {
        dispatch({
          type: CART_TYPES.EDIT_CART_QUANTITY,
          orders: res.data,
          total: Number(0),
        });
      }
    });
};

export const checkoutCart = () => async (dispatch) => {
  console.log('checkoutCart called');
  await axios.put('/api/cart/checkoutCart')
    .then((res) => {
      // console.log('CHECKOUT', res);
      if (res.data.length) {
        dispatch({
          type: CART_TYPES.CHECKOUT_CART,
          orders: [],
          total: res.data.map((order) => Number(order.quantity)).reduce((a, b) => a + (b * 0.99)),
        });
      } else {
        dispatch({
          type: CART_TYPES.CHECKOUT_CART,
          orders: [],
          total: Number(0),
        });
      }
    });
};

export const adminPreviousOrders = () => async (dispatch) => {
  await axios.get('/api/cart/adminPreviousOrders')
    .then((res) => {
      dispatch({
        type: CART_TYPES.ADMIN_PREV_ORDERS,
        inactiveOrders: res.data,
      });
    });
};
