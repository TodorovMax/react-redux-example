import React from 'react';

const styles = {
  videoMargin: {
    margin: '10px',
  },
};

const Info = () => (
  <div>
    <iframe
      title="iFrame1"
      style={styles.videoMargin}
      width="640"
      height="320"
      src="https://www.youtube.com/embed/XmONtwxUL10"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen=""
    />
    <iframe
      title="iFrame2"
      style={styles.videoMargin}
      width="640"
      height="320"
      src="https://www.youtube.com/embed/zrFG1w1PRno"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen=""
    />
    <iframe
      title="iFrame3"
      style={styles.videoMargin}
      width="640"
      height="320"
      src="https://www.youtube.com/embed/koJUiV5TRnY"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen=""
    />
    <iframe
      title="iFrame4"
      style={styles.videoMargin}
      width="640"
      height="320"
      src="https://www.youtube.com/embed/q5V3cnTHM1w"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen=""
    />
  </div>
);

export default Info;
