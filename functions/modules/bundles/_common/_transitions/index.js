import bundleReceived from './bundleReceived/bundleReceived'
import bundleDataFetch from './bundleDataFetch/bundleDataFetch'
import bundleDataProvisioned from './bundleDataProvisioned/bundleDataProvisioned'
import unauthApp from './unauthApp/unauthApp'
import userAuthenticated from './userAuthenticated/userAuthenticated'
import userDataFetch from './userDataFetch/userDataFetch'
import userDataProvisioned from './userDataProvisioned/userDataProvisioned'
import authApp from './authApp/authApp'

export default {
  'bundle received': bundleReceived,
  'bundle data fetch': bundleDataFetch,
  'bundle data provisioned': bundleDataProvisioned,
  'unauth app': unauthApp,
  'user authenticated': userAuthenticated,
  'user data fetch': userDataFetch,
  'user data provisioned': userDataProvisioned,
  'auth app': authApp
}