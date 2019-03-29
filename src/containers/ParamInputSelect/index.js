import { connect } from 'react-redux'
import InputSelect from '../../components/InputSelect'
import { uInputLinkCreate } from '../../store/inputLinks/actions'
import getNodeInputOptions from '../../selectors/getNodeInputOptions'

const mapStateToProps = (state, ownProps) => ({
  options: getNodeInputOptions(state, ownProps.nodeId),
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onInputChange: (option) => {
      dispatch(uInputLinkCreate(ownProps.nodeId, option.value, option.type))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputSelect)
