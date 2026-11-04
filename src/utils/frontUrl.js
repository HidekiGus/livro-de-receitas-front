const frontUrl =
  process.env.REACT_APP_FRONT_URL ||
  (typeof window !== 'undefined' ? window.location.origin : '');

export default frontUrl;
