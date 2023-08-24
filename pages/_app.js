import '../styles/global.css'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 10000,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}
