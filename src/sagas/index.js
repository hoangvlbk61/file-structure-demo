import { all } from "redux-saga/effects";
import post from './post'
export default function* root() {
    yield all([
        post(),
    ]);
  }
  