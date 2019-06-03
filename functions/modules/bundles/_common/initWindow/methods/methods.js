import updateUserFactory from './updateUserFactory/updateUserFactory'
import openDialog from './openDialog/openDialog'
import closeDialog from './closeDialog/closeDialog'

export default ({ userUpdated }) => {
  window.__METHODS__= {
    updateUser: updateUserFactory(userUpdated),
    openDialog,
    closeDialog
  }
}