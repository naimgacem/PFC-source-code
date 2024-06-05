import '@/styles/globals.css'
import { store } from '@/Store/store'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
})
{
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}