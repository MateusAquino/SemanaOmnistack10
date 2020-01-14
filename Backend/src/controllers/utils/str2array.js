module.exports = (str, regex = false) => str.split(',').map(t => regex ? new RegExp(`^${t.trim()}$`, 'i'): t.trim());
