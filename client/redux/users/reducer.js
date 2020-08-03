import USER_TYPES from './types';

const initialState = {
  loggedInUser: {},
  loggedIn: false,
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPES.LOGIN:
      return {
        ...state,
        loggedIn: true,
        loggedInUser: action.user,
      };
    case USER_TYPES.LOGIN_CHECK:
      return {
        ...state,
        loggedIn: action.userData.loggedIn,
        loggedInUser: action.userData.user,
      };
    case USER_TYPES.LOG_OUT:
      return {
        ...state,
        loggedIn: false,
        loggedInUser: {},
      };
    case USER_TYPES.GET_USERS:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};

export default userReducer;
