import bundleReceived from './bundleReceived/bundleReceived'
import bundleDataFetch from './bundleDataFetch/bundleDataFetch'
import bundleDataProvisioned from './bundleDataProvisioned/bundleDataProvisioned'
import unauthApp from './unauthApp/unauthApp'
import userAuthenticated from './userAuthenticated/userAuthenticated'
import userDataFetch from './userDataFetch/userDataFetch'
import userDataProvisioned from './userDataProvisioned/userDataProvisioned'
import authApp from './authApp/authApp'
import userUpdated from './userUpdated/userUpdated'
import bundleError from './bundleError/bundleError'
import bundleDataError from './bundleDataError/bundleDataError'
import userAuthenticatedError from './userAuthenticatedError/userAuthenticatedError'
import userDataError from './userDataError/userDataError'

export default {
  'bundle received': bundleReceived,
  'bundle error': bundleError,
  'bundle data fetch': bundleDataFetch,
  'bundle data error': bundleDataError,
  'bundle data provisioned': bundleDataProvisioned,
  'unauth app': unauthApp,
  'user authenticated': userAuthenticated,
  'user authenticated error': userAuthenticatedError,
  'user data fetch': userDataFetch,
  'user data error': userDataError,
  'user data provisioned': userDataProvisioned,
  'auth app': authApp,
  'user updated': userUpdated
}