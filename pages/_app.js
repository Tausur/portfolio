import '../styles/globals.css'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {

  const [mode, setMode] = useState('dark')

  const getData = (data) => {
    setMode(data)
  }

  return <>
    <div className='fixed w-full backdrop-blur'>
      <Navbar onSubmit={getData}/>
    </div>

    <Component {...pageProps} theme={mode}/>
    <Footer theme={mode} />
  </>
}

export default MyApp
