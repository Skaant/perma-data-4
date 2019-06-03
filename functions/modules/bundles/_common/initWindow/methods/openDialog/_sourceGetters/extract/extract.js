export default id =>
  window.__STATE__.user.data.extracts
  .find(extract => extract._id === id)