import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/config'
import Layout from '@/components/dom/layout/Layout'
import '@/styles/index.css'
import { ThemeOptions, ThemeProvider, createTheme , CssBaseline} from '@mui/material'
import { Exo } from '@next/font/google'
import { Analytics } from '@vercel/analytics/react';
import { Provider } from 'react-redux'
import {store} from '../redux/store'
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })

const exo = Exo({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})
export const themeOptions= {
  palette: {
    mode: 'dark',
    primary: {
      main: '#16c0c7',
    },
    secondary: {
      main: '#8b00f5',
    },
    background: {
      default: 'rgba(0,0,0,1)',
      paper: 'rgba(0,0,0,1)',
    },
  },
  typography: {
    fontFamily: exo.style.fontFamily
  }
} satisfies ThemeOptions
const theme = createTheme(themeOptions)
export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef()
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${exo.style.fontFamily};
        }
      `}</style>
      <Header title={pageProps.title} />
      <Analytics />
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Layout >
            <Component {...pageProps} />
            {Component?.canvas && (
              <Scene
                eventPrefix='client'>
                {Component.canvas(pageProps)}
              </Scene>
            )}
          </Layout>
      </ThemeProvider>
      </Provider>
    </>
  )
}
