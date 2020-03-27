import React from 'react';
import LoadingIcon from './assets/oneflow-logo.svg';
import spinner from './assets/spinner.gif';

const styles = {
  loadingContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 2,
    background: 'white',
  },
  assets: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    textAlign: 'center',
  },
  logo: {
    display: 'block',
    height: '65px',
    marginBottom: '5px',
  },
};

const Loading = ({ state }) => {
  if (!state) return null;
  return (
    <div style={styles.loadingContainer}>
      <div style={styles.assets}>
        <LoadingIcon style={styles.logo} />
        <img src={spinner} alt="spinner" />
      </div>
    </div>
  );
};

export default Loading;
