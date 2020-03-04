import { fork } from 'redux-saga/effects'
import { watchInputLinks } from './inputLinks/sagas'
import { watchClock } from './clock/sagas'
import { watchWindows } from './windows/sagas'
import { watchMacros } from './macros/sagas'

export default function* rootSaga (dispatch) {
  yield [
    fork(watchInputLinks),
    fork(watchClock),
    fork(watchWindows),
    fork(watchMacros),
  ]
}
