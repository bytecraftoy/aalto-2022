import { ContentPanel } from '../../components/ContentPanel';
import { useAppSelector } from '../../utils/hooks';
import { ContentPanelType } from '../../utils/types';

/**
 * Show's user the panel by the panel id
 *
 */

export const Panels = () => {
    // Get all the panels of the user
    const panels = useAppSelector((state) => state.panels.value);

    // Currently only taking the first panel from the list
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
