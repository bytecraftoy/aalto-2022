import { ContentPanel } from '../../components/ContentPanel';
import { useAppSelector, useLoginRedirect } from '../../utils/hooks';
import { useParams } from 'react-router-dom';

/**
 * Show's user the panel by the panel id
 *
 */

export const Panels = () => {
    // Redirect anonymous users from this page to the login page
    useLoginRedirect();

    // Get all the panels of the user
    const panels = useAppSelector((state) => state.panels.value);

    // Get the panel id from the route
    const { panelId } = useParams();

    // There should always be at least one panel
    // Current panel of the application, or the first one if the id is incorrect
    const panel = panels.find((e) => e.id === panelId) || panels[0];

    return (
        <div className="App bg-neutral-99 flex-1 flex flex-col justify-start items-center">
            <ContentPanel key={panel.id} id={panel.id} />
        </div>
    );
};
