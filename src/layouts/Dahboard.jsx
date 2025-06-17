import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Menu from "../pages/Menu"
import Home from "../pages/Home"
import About from "../pages/About"

export default function Dahboard() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/about' element={<About/>}/>
        </Routes>



    </div>
  )
}
