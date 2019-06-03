export default id =>
  window.__STATE__.user.data.events
    .find(event => event._id === id)