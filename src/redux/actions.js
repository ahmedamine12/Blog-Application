export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAILURE = 'GET_ALL_USERS_FAILURE';
export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';
export const GET_RECENT_POSTS_REQUEST = 'GET_RECENT_POSTS_REQUEST';
export const GET_RECENT_POSTS_SUCCESS = 'GET_RECENT_POSTS_SUCCESS';
export const GET_RECENT_POSTS_FAILURE = 'GET_RECENT_POSTS_FAILURE';
export const GET_ALL_POSTS_REQUEST = 'GET_ALL_POSTS_REQUEST';
export const GET_ALL_POSTS_SUCCESS = 'GET_ALL_POSTS_SUCCESS';
export const GET_ALL_POSTS_FAILURE = 'GET_ALL_POSTS_FAILURE';
export const createUser = (userData) => ({
  type: CREATE_USER_REQUEST,
  payload: userData
});

export const getAllUsers = () => ({
  type: GET_ALL_USERS_REQUEST
});

export const createPost = (postData) => ({
  type: CREATE_POST_REQUEST,
  payload: postData
});

export const getRecentPosts = () => ({
  type: GET_RECENT_POSTS_REQUEST
});
export const getAllPosts = () => ({
  type: GET_ALL_POSTS_REQUEST
});
