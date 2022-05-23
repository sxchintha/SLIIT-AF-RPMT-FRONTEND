import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from './src/components/main';
import Header from './src/components/Header';
import CreateMarking from './src/pages/createMarking'


createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <div>
            {/* <Header /> */}
            <Routes>
                <Route exact path='/' element={< App />} />
                <Route path='/marking-schemes' element={< App />} >
                    <Route path='create' element={<CreateMarking />} />
                </Route>
            </Routes>

        </div>
    </BrowserRouter>
)
