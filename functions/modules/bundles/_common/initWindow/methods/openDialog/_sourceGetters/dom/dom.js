export default id =>
  window.__STATE__.user.data.doms
    .find(dom => dom._id === id)