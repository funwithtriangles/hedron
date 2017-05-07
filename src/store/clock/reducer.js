const defaultState = {
  beat: 0,
  bpm: 0
}

const clockReducer = (state = defaultState, action) => {
  const p = action.payload

  switch (action.type) {
    case 'CLOCK_BEAT_INC': {
      let beat = state.beat + 1
      if (beat > 63) beat = 0

      return {
        ...state,
        beat
      }
    }
    case 'CLOCK_BPM_UPDATE': {
      return {
        ...state,
        bpm: p.bpm
      }
    }
    case 'CLOCK_RESET': {
      return {
        ...state,
        beat: 0
      }
    }
    default:
      return state
  }
}

export default clockReducer
