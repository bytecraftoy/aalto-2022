import { ContentPanel } from '../../components/ContentPanel';
import { useAppSelector } from '../../utils/hooks';
import { ContentPanelType } from '../../utils/types';

/**
 * Home page of the application
 *  Shows user the first content panel in user's list
 */

export const Home = () => {
    // Get all the panels of the user
    const panels = useAppSelector((state) => state.panels.value);

    // Home takes the first panel in the list
    const panel: ContentPanelType = panels[0];

    return (
        <div className="App bg-neutral-99 h-full flex flex-col justify-start items-center">
            <ContentPanel
                id={panel.id}
                initialCategory={panel.category}
                initialPrompts={panel.prompts}
            />
        </div>
    );
};
