import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import UserList from './components/UserList.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import UserFrom from './components/UserFrom.jsx';
import UserDetail from "./components/UserDetail.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/users/create" element={<UserFrom />} />
                <Route path="/users/edit/:id" element={<UserFrom />} />
                <Route path="/users/:id" element={<UserDetail />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);