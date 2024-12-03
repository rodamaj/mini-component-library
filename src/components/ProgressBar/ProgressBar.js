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

const STYLES = {
  small: {
    height: 8,
    padding: 0,
    radius: 4,
  },
  medium: {
    height: 12,
    padding: 0,
    radius: 4,
  },
  large: {
    height: 24,
    padding: 4,
    radius: 8,
  },
};

const ProgressBarJosue = ({ value, size }) => {
  const style = SIZES[size];

  return (
    <>
      <VisuallyHidden>
        <label for='progress-bar'>Loaded</label>
      </VisuallyHidden>
      <WrapperJosue style={style} id='progress-bar' value={value} max={100}>
        {value}
      </WrapperJosue>
    </>
  );
};

const ProgressBar = ({ value, size }) => {
  const style = STYLES[size];
  if (!style) {
    throw new Error(`Unknown size passed to ProgressBar: ${size}`);
  }

  return (
    <Wrapper
      role='progressbar'
      aria-valuenow={value}
      aria-valuemin='0'
      aria-valuemax='100'
      style={{
        '--padding': style.padding + 'px',
        '--radius': style.radius + 'px',
      }}
    >
      <VisuallyHidden>{value}%</VisuallyHidden>
      <BarWrapper>
        <Bar
          style={{ '--width': value + '%', '--height': style.height + 'px' }}
        />
      </BarWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.transparentGray15};
  box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};
  border-radius: var(--radius);
  padding: var(--padding);
`;

const BarWrapper = styled.div`
  border-radius: 4px;
  /* trim off cormers when progress bar is near full */
  overflow: hidden;
`;

const Bar = styled.div`
  width: var(--width);
  height: var(--height);
  background-color: ${COLORS.primary};
  border-radius: 4px 0 0 4px;
`;

const WrapperJosue = styled.progress`
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
    border-top-right-radius: ${(p) => calculateRightRadius(p.value)}px;
    border-bottom-right-radius: ${(p) => calculateRightRadius(p.value)}px;
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
