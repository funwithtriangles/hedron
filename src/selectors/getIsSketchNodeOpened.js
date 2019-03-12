import getNode from './getNode'

export default (state, nodeId, showIn) => {
  switch (showIn) {
    case 'overview':
      return state.ui.openedNode === nodeId
    case 'sketch':
    default:
      const node = getNode(state, nodeId)
      return state.sketches[node.sketchId].openedNodeId === nodeId
  }
}
