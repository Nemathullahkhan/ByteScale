import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ContentPage from './pages/ContentPage'

const App = () => {
  return (
    <Routes>
      <Route path = "/" element = {<HomePage/>}/>
      <Route path = "/content" element = {<ContentPage/>}/>
    </Routes>
  )
}

export default App;