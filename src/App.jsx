import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ContentPage from './pages/ContentPage'
import FilePage from './pages/FilePage'
import { FileProvider } from './context/FileContext'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <FileProvider>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<HomePage/>}/>
        <Route path = "/content" element = {<ContentPage/>}/>
        <Route path = "/filePage" element = {<FilePage/>}/>
      </Routes>
    </FileProvider>
  )
}

export default App;