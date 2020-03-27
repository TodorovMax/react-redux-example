import React, { useState, useEffect } from 'react';
import { filterTemplates } from '../../../helpers/selectors';
import { styles } from '../styles';

const Selectors = ({
  handleChange,
  currentCollection,
  collections,
  templates,
  setCurrentTemplate,
}) => {
  const [sortedTemplates, setSortedTemplates] = useState([]);

  const collectionOptions = collections.map(collection => (
    <option value={collection.value} key={collection.value}>
      {collection.text}
    </option>
  ));

  useEffect(() => {
    const sortedTemplates = filterTemplates(currentCollection.value, templates);
    const selected = sortedTemplates.find(template => template.available);
    setCurrentTemplate(selected ? selected : null);
    setSortedTemplates(sortedTemplates);
  }, [
    currentCollection.value,
    setSortedTemplates,
    templates,
    setCurrentTemplate,
  ]);

  const templateOptions = sortedTemplates.map(template => {
    if (template.available) {
      return (
        <option value={template.value} key={template.value}>
          {template.text}
        </option>
      );
    }
    return false;
  });

  return (
    <div style={styles.section}>
      <select
        style={{
          ...styles.select,
          marginRight: '30px',
          marginTop: '10px',
          marginBottom: '20px',
        }}
        onChange={handleChange}
        name="collections"
      >
        {collectionOptions}
      </select>
      <select
        style={{
          ...styles.select,
          marginRight: '30px',
          marginTop: '10px',
          marginBottom: '20px',
        }}
        onChange={handleChange}
        name="templates"
      >
        {templateOptions}
      </select>
    </div>
  );
};

export default Selectors;
