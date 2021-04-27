import React from 'react';
import ReactLoading from "react-loading";
import Typography from '@material-ui/core/Typography';

function Loading() {
  const loadingTextStyle = {
    fontFamily: 'VT323',
    color: 'white', 
    fontSize: '38px',
    textAlign: 'center', 
    marginTop: '35px', 
  };

  return (
    <div className='loading-screen'>
      <ReactLoading 
        className="loading-component" 
        type={"spokes"} 
        color="white"
        height={'15%'} 
        width={'15%'}
      />
      <Typography variant="h4" gutterBottom style={loadingTextStyle}>
        Waiting for Player 2
      </Typography>
    </div>
  );
}

export default Loading;
