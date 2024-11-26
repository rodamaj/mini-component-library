/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import VisuallyHidden from '../VisuallyHidden';

const SIZES = {
  small: {
    '--height': '8px',
    '--padding': '0',
    '--outer-radius': '4px',
  },
  medium: {
    '--height': '12px',
    '--padding': '0',
    '--outer-radius': '4px',
  },
  large: {
    '--height': '24px',
    '--padding': '4px',
    '--outer-radius': '8px',
  },
};

const ProgressBar = ({ value, size }) => {
  const style = SIZES[size];

  return (<>
    <VisuallyHidden>
      <label for='progress-bar'>Loaded</label>
    </VisuallyHidden>
    <Wrapper style={style} id='progress-bar' value={value} max={100}>{value}</Wrapper>
  </>);
};

const Wrapper = styled.progress`
  box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};
  border-radius: var(--outer-radius);
  height: var(--height);

  &::-webkit-progress-bar {
    background-color: ${COLORS.transparentGray15};
    border-radius: var(--outer-radius);
    padding: var(--padding);
  }

  &::-webkit-progress-value {
    background-color: ${COLORS.primary};
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: ${p => calculateRightRadius(p.value)}px;
    border-bottom-right-radius: ${p => calculateRightRadius(p.value)}px;
  }
`;

function calculateRightRadius(value) {
  /*
    >= 100% -> 4px
    99.5% -> 3px
    99% -> 2px
    98.5% -> 1px
    <= 98% -> 0px
  */

  if (value > 100) {
    return 4;
  } else if (value < 98) {
    return 0;
  } else {
    // function that linearly and continuosly maps [98,100] to [0,4]
    return 2 * value - 196;
  }
}


export default ProgressBar;
