import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {createRoot} from 'react-dom/client'
import App from './components/main';
import Header from './components/Header';


createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <div>
            <Header/>
            <Routes>
            <Route path='/add' element={< App/>} />
            </Routes>

        </div>
    </BrowserRouter>
)
