import { Route, Routes as Switch } from 'react-router-dom';
import { About } from './pages/About';
import { Panels } from './pages/Panels';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Projects } from './pages/Projects';

/**
 *  Routes of the application
 */

export const Routes = () => {
    return (
        <Switch>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/panels/:panelId" element={<Panels />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
        </Switch>
    );
};
