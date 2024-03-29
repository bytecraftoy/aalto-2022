import { ContentPanel } from '../../components/ContentPanel';
import { useAppSelector, useLoginRedirect } from '../../utils/hooks';

/**
 * Home page of the application
 *  Shows user the first content panel in user's list
 */

export const Home = () => {
    // Redirect anonymous users from this page to the login page
    useLoginRedirect();

    return (
        <div className="App flex-1 bg-neutral-99 h-full flex flex-col justify-start items-center">
            <HomePage />
        </div>
    );
};

// Fix for redundant requests sent by loginredirect
// separate functionality to one component down to prevent useEffect from getting spammed

const HomePage = () => {
    // Get all the panels of the user
    const panels = useAppSelector((state) => state.panels.value);

    // Home takes the first panel in the list
    const panel = panels[0];

    return <ContentPanel id={panel.id} key={panel.id} />;
};
