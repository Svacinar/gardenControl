import React from 'react';

import Grass from './videoBackground/grass.mp4';

const videoFeature = () => (
  <div>
    <video
      autoPlay
      loop
      muted
      style={{
        position: 'absolute',
        opacity: 0.6,
        width: '100%',
        left: '50%',
        top: '50%',
        height: '100%',
        objectFit: 'cover',
        transform: 'translate( -50%, -50%)',
        zIndex: '-1',
      }}
    >
      <source src={Grass} type="video/mp4" />
    </video>
  </div>
);

export default videoFeature;
