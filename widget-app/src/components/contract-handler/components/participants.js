import React from 'react';
import { styles } from '../styles';

const Participants = ({ contacts, handleChange }) => {
  const renderParticipants = contacts.map(contact => {
    const ref = React.createRef();
    return (
      <div style={styles.itemContainer} key={contact.id}>
        <div style={styles.itemData}>
          <input
            style={styles.checkbox}
            type="checkbox"
            name="participants"
            value={contact.id}
            onChange={handleChange(ref)}
          />
          <div>
            {contact.contact && (
              <div style={{ ...styles.contactData, ...styles.contact }}>
                {contact.contact}
                {contact.company && ', ' + contact.company}
              </div>
            )}
            {contact.email && (
              <div style={styles.contactData} className="contact-email">
                {contact.email}
              </div>
            )}
            {contact.phone && (
              <div style={styles.contactData} className="contact-phone">
                {contact.phone}
              </div>
            )}
          </div>
        </div>
        <select
          style={styles.select}
          onChange={handleChange()}
          ref={ref}
          name="participants-type"
          id={contact.id}
        >
          <option value="1">Signatory</option>
          <option value="0">Influencer</option>
          <option value="3">Viewer</option>
        </select>
      </div>
    );
  });

  return (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>Participant</div>
      <div style={styles.sectionContainer}>{renderParticipants}</div>
    </div>
  );
};

export default Participants;
