export default () => {
  const events = window.__STATE__.user.data.events
  return events.map(event => ({
    _id: event._id
  }))
}