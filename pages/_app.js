import AppState from '../context/appState'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppState>
      <Component {...pageProps} />
    </AppState>
  )
}

export default MyApp
