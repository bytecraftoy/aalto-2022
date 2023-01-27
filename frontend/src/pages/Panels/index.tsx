import { ContentPanel } from '../../components/ContentPanel';
import { useAppSelector } from '../../utils/hooks';
import { ContentPanelType } from '../../utils/types';
import { useParams } from 'react-router-dom';

/**
 * Show's user the panel by the panel id
 *
 */

export const Panels = () => {
    // Get all the panels of the user
    const panels = useAppSelector((state) => state.panels.value);

    // Get the panel id from the route
    const { panelId } = useParams();

    // Panel of the application
    const panel: ContentPanelType | undefined = panels.find(
        (e) => e.id === panelId
    );

    // If not panel found with the id === panelId
    // TODO! Some "Page not found" component
    if (!panel) {
        return <div>id not found</div>;
    }

    return (
        <div className="App bg-neutral-99 h-full flex flex-col justify-start items-center">
            <ContentPanel
                key={panel.id}
                id={panel.id}
                initialCategory={panel.category}
                initialPrompts={panel.prompts}
            />
        </div>
    );
};
