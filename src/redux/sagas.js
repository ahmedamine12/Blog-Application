import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  GET_RECENT_POSTS_REQUEST,
  GET_RECENT_POSTS_SUCCESS,
  GET_RECENT_POSTS_FAILURE,
  GET_ALL_POSTS_REQUEST, // Add the new action types
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE
} from './actions';

function* createUser(action) {
  try {
    const response = yield axios.post('http://localhost:8088/api/users/', action.payload);
    yield put({ type: CREATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: CREATE_USER_FAILURE, payload: error.message });
  }
}

function* getAllUsers() {
  try {
    const response = yield axios.get('http://localhost:8088/api/users/');
    yield put({ type: GET_ALL_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: GET_ALL_USERS_FAILURE, payload: error.message });
  }
}

function* createPost(action) {
  try {
    yield axios.post('http://localhost:8088/api/posts/1', action.payload);
    yield put({ type: CREATE_POST_SUCCESS });
  } catch (error) {
    yield put({ type: CREATE_POST_FAILURE, payload: error.message });
  }
}

function* getRecentPosts() {
  try {
    const response = yield axios.get('http://localhost:8088/api/posts/recent');
    yield put({ type: GET_RECENT_POSTS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: GET_RECENT_POSTS_FAILURE, payload: error.message });
  }
}

function* getAllPosts() { // Add a new saga function to handle getting all posts
  try {
    const response = yield axios.get('http://localhost:8088/api/posts/');
    yield put({ type: GET_ALL_POSTS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: GET_ALL_POSTS_FAILURE, payload: error.message });
  }
}

export default function* rootSaga() {
  yield takeLatest(CREATE_USER_REQUEST, createUser);
  yield takeLatest(GET_ALL_USERS_REQUEST, getAllUsers);
  yield takeLatest(CREATE_POST_REQUEST, createPost);
  yield takeLatest(GET_RECENT_POSTS_REQUEST, getRecentPosts);
  yield takeLatest(GET_ALL_POSTS_REQUEST, getAllPosts); // Listen for the new action type
}
