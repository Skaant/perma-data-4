import updateError from '../_helpers/updateError/updateError'

export default err => {
  updateError(err, 'user authenticated error', true)
}