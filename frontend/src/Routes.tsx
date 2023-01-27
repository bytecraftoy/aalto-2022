import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import { About } from './pages/About';
import { Panels } from './pages/Panels';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';

export const Routes = () => {
    return (
        <Switch>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/panels/:panelId" element={<Panels />} />
            <Route path="/" element={<Home />} />
        </Switch>
    );
};
