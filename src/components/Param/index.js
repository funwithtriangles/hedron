import React from 'react'
import PropTypes from 'prop-types'
import ParamBar from '../../containers/ParamBar'
import ParamInputSelect from '../../containers/ParamInputSelect'
import Modifier from '../../containers/Modifier'
import Select from '../../containers/Select'
import styled from 'styled-components'

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 1rem;
  margin: 0 0.5rem 0.5rem 0;
`

const Items = styled.div`

`

const Param = ({ title, nodeId, modifierIds, lfoOptionIds }) => (
  <Wrapper>
    {title}
    <br />
    <ParamBar nodeId={nodeId} />
    <ParamInputSelect nodeId={nodeId} />

    <Items>
      {lfoOptionIds.map((id) => (
        <Select nodeId={id} key={id} />
      ))}
    </Items>

    <Items>
      {modifierIds.map((id) => (
        <Modifier nodeId={id} key={id} />
      ))}
    </Items>
  </Wrapper>
)

Param.propTypes = {
  title: PropTypes.string.isRequired,
  nodeId: PropTypes.string.isRequired,
  modifierIds: PropTypes.arrayOf(
    PropTypes.string
  ),
  lfoOptionIds: PropTypes.arrayOf(
    PropTypes.string
  )
}

export default Param
