import React from 'react';
import ReactLoading from "react-loading";
import Typography from '@material-ui/core/Typography';

import './index.css';

function Loading() {

  return (
    <div className='loading-screen'>
      <ReactLoading 
        className="loading-component" 
        type={"spokes"} 
        color="black"
        height={'15%'} 
        width={'15%'}
      />
      <Typography variant="h4" gutterBottom>
        Waiting for the Other Player
      </Typography>
    </div>
  );
}

export default Loading;
