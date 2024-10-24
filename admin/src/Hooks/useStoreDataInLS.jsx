
const encodeData = (data) => btoa(JSON.stringify(data));
const decodeData = (encodedData) => JSON.parse(atob(encodedData));

const useStoreDataInLS = () => {

  // Save data to localStorage with encoding
  const saveToLocalStorage = (key, value) => {
    const encodedValue = encodeData(value);
    localStorage.setItem(key, encodedValue);
  };

  // Get data from localStorage with decoding
  const getFromLocalStorage = (key) => {
    const encodedValue = localStorage.getItem(key);
    if (encodedValue) {
      return decodeData(encodedValue);
    }
    return null;
  };

  const getToLocalStorage = (key) => {
    const loadedData = getFromLocalStorage(key);
    if (loadedData) {
      return loadedData
    } else {
      return 'There is no data found'
    }
  };


    return [getToLocalStorage, saveToLocalStorage]
};

export default useStoreDataInLS;