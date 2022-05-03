import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from './components/main';
import Header from './components/Header';
import CreateMarking from './components/marking_scheme/createMarking'


createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <div>
            <Header />
            <Routes>
                <Route exact path='/' element={< App />} />
                <Route path='/marking-schemes' element={< App />} >
                    <Route path='create' element={<CreateMarking />} />
                </Route>
            </Routes>

        </div>
    </BrowserRouter>
)
