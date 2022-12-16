import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';

export const Routes = () => {
    return (
        <Switch>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
        </Switch>
    );
};
