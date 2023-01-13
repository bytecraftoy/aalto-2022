import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import { About } from './pages/About';
import { Panels } from './pages/Panels';

export const Routes = () => {
    return (
        <Switch>
            <Route path="/about" element={<About />} />
            <Route
                path="/panels/:panelId"
                element={<Panels />}
            />
            <Route path="/" element={<Panels />} />
        </Switch>
    );
};
