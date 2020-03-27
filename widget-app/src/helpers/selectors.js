export const filterTemplates = (selectedCollectionId, templates) => {
  let check;
  const arr = [...templates];
  arr.forEach(item => {
    const availableCollections = item.agreement.collections;
    availableCollections.forEach(availableCollection => {
      if (availableCollection.id === selectedCollectionId) {
        check = true;
        item.available = true;
      } else {
        item.available = false;
      }
    });
  });

  if (!check) {
    console.log('User doesn’t have access to any template');
    return [];
  }
  return arr;
};

export const filterCollections = (collections, templates) => {
  const sortedCollections = [];

  collections.forEach(collection => {
    templates.forEach(template => {
      const availableCollections = template.agreement.collections;
      const added = sortedCollections.find(
        sortedCollection => sortedCollection.value === collection.value,
      );
      const fit = availableCollections.find(
        availableCollection => availableCollection.id === collection.value,
      );
      if (fit && !added) {
        sortedCollections.push(collection);
      }
    });
  });

  return sortedCollections;
};
