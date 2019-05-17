import updateUser from '../_helpers/updateUser/updateUser'

export default () => {
  updateUser()
  $('#anchor-user-panel').removeClass('d-none')
  $('#launch-info').addClass('d-none')
}