import {
  CREATE_USER_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  CREATE_POST_SUCCESS,
  GET_RECENT_POSTS_SUCCESS,
  GET_ALL_POSTS_SUCCESS
} from './actions';

const initialState = {
  users: [],
  recentPosts: [],
  allPosts: [] // Add allPosts to the initial state
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload
      };
    case CREATE_POST_SUCCESS:
      return state;
    case GET_RECENT_POSTS_SUCCESS:
      return {
        ...state,
        recentPosts: action.payload
      };
    case GET_ALL_POSTS_SUCCESS: // Handle the action for getting all posts
      return {
        ...state,
        allPosts: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
