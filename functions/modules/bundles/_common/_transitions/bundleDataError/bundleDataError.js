import updateError from '../_helpers/updateError/updateError'

export default err => {
  updateError(err, 'bundle data error')
}