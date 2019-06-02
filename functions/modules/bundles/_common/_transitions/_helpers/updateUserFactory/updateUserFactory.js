export default transition => {
  const updateUser =
    (updates = {}) => {
      const updatedData = Object.assign({}, window.__STATE__.user.data, updates)
      window.__STATE__.user.data = updatedData

      transition(updates)
    }
  return updateUser
}