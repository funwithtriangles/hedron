import { select, takeEvery, put, call } from 'redux-saga/effects'
import { getAssignedLinks } from './selectors'
import { nodeValueUpdate } from '../nodes/actions'
import { inputLinkShotFired, inputLinkShotDisarm, inputLinkShotArm } from '../inputLinks/actions'
import { projectError } from '../project/actions'
import getNodes from '../../selectors/getNodes'
import getNode from '../../selectors/getNode'
import getNodesValues from '../../selectors/getNodesValues'
import getCurrentBankIndex from '../../selectors/getCurrentBankIndex'
import lfoProcess from '../../utils/lfoProcess'
import { work } from '../../externals/modifiers'

export function* handleInput (action) {
  const p = action.payload

  try {
    const links = yield select(getAssignedLinks, p.inputId)

    for (let i = 0; i < links.length; i++) {
      let value = p.value
      let modifiers
      let skip
      if (p.meta && p.meta.type === 'midi') {
        const currentDeviceBank = yield select(getCurrentBankIndex, links[i].deviceId)
        if (currentDeviceBank !== links[i].bankIndex) skip = true
      }

      if (!skip) {
        if (p.inputId === 'lfo') {
          let o = yield select(getNodesValues, links[i].lfoOptionIds)
          value = yield call(lfoProcess, value, o.shape, o.rate)
        }

        if (links[i].modifierIds && links[i].modifierIds.length) {
          modifiers = yield select(getNodes, links[i].modifierIds)
          let vals = []
          for (let j = 0; j < modifiers.length; j++) {
            const m = modifiers[j]
            if (!m.type || m.type === p.type) {
              vals.push(m.value)
              if (!m.passToNext) {
                value = yield call(work, m.key, vals, value)
                value = Math.max(0, Math.min(1, value))
                vals = []
              }
            }
          }
        }

        switch (links[i].nodeType) {
          case 'select': {
            const node = yield select(getNode, links[i].nodeId)
            const options = node.options
            value = options[Math.floor(options.length * value)].value
            break
          }
          case 'shot': {
            const node = yield select(getNode, links[i].nodeId)
            if (p.meta && p.meta.noteOn) {
              yield put(inputLinkShotFired(node.sketchId, node.method))
            } else if (value > 0.5 && links[i].armed) {
              yield put(inputLinkShotFired(node.sketchId, node.method))
              yield put(inputLinkShotDisarm(links[i].id))
            } else if (value < 0.5) {
              yield put(inputLinkShotArm(links[i].id))
            }
          }
        }

        yield put(nodeValueUpdate(links[i].nodeId, value))
      }
    }
  } catch (error) {
    console.error(error)
    yield put(projectError(error.message))
  }
}

export function* watchInputs () {
  yield takeEvery('INPUT_FIRED', handleInput)
}
