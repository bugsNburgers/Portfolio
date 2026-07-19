'use client';

import React from 'react';
import styled from 'styled-components';

// This uses a CSS mask to perfectly match the theme colors (currentColor)
// just like the SVG icons. It requires Favicon.png to have a transparent background.
const CruxMask = styled.div`
  width: 20px;
  height: 20px;
  background-color: currentColor;
  -webkit-mask-image: url('/Favicon.png');
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-image: url('/Favicon.png');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-type: luminance;
  -webkit-mask-box-image: url('/Favicon.png');
  
  /* Visually scale up to compensate for any empty padding inside the PNG */
  transform: scale(1.3);
  
  /* If the logo doesn't have a transparent background, 
     you might need to use mix-blend-mode instead, or upload a transparent PNG. */
`;

const IconCrux = (): React.ReactElement => (
  <CruxMask title="Crux Studios" className="feather" />
);

export default IconCrux;
