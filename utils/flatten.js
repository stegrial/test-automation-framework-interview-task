/**
 * Flattens nested object into single level object with dot notation keys
 * @param {object} obj - Object to flatten
 * @param {string} prefix - Prefix for keys
 * @return {object} Flattened object
 */
function flatten(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flatten(obj[k], pre + k));
    } else {
      acc[k] = obj[k];
    }
    return acc;
  }, {});
}

module.exports = flatten;

