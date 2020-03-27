import React from 'react';
import { styles } from '../styles';

const Attachments = () => {
  const handleChange = (e) => {
    // console.log(e.target.files);
    // const file = e.target.files[0];
  };

  const renderAttachments = () => {
    return (
      <div style={{ ...styles.itemContainer, ...styles.attachmentContainer }}>
        <div style={styles.itemData}>
          <input style={styles.checkbox} type="checkbox" name="participants" />
          <div style={styles.attachmentName}>Products 2020.pdf</div>
        </div>
        <select style={styles.select} name="participants-type">
          <option value="1">Show as compressed</option>
          <option value="0">Show as expanded</option>
        </select>
      </div>
    );
  };

  return (
    <>
      <div style={styles.sectionTitle}>Attachment</div>
      <div style={{ ...styles.sectionContainer, ...styles.attachmentSection }}>
        {renderAttachments()}
        {renderAttachments()}
        {renderAttachments()}
      </div>
      <div style={styles.inputContainer}>
        <input onChange={handleChange} style={styles.fileInput} type="file" />
        <div style={styles.inputTitle}>
          <span style={{ fontSize: '35px', fontWeight: 100 }}>+</span>
          <span style={{ textDecoration: 'underline', margin: '0 5px' }}>
            Upload attachment
          </span>
          or drop files
        </div>
      </div>
    </>
  );
};

export default Attachments;
