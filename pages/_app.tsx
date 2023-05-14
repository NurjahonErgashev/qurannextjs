import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { appWithTranslation } from 'next-i18next'
import React from 'react'
import { useRouter } from 'next/router'
import Loader from '../components/Loading'
import Player from '../components/player'
import { useStorage } from '../hooks/useStorage'
function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  let [isLoading, setIsLoading] = React.useState(false);
  let router = useRouter();
  const audio = useStorage(state => state.audio)
  React.useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setIsLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {audio != 0 && <Player />}
      {
        isLoading && <Loader />
      }
      <Component {...pageProps} />
      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp)
