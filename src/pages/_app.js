import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Inter } from 'next/font/google'
 
const inter = Inter({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})


export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main className={`${inter.variable} font-inter`}>
        <Component {...pageProps} />
      </main>
  </QueryClientProvider>
  )
}

