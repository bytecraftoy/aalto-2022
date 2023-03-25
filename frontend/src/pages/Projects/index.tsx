import { ContentPanel } from '../../components/ContentPanel';
import { useAppSelector, useLoginRedirect } from '../../utils/hooks';
import { useParams } from 'react-router-dom';
import { CategoryView } from '../../components/CategoryView';

/**
 * Show's user the panel by the panel id
 *
 */

export const Projects = () => {
    // Redirect anonymous users from this page to the login page
    useLoginRedirect();

    const panels = useAppSelector((state) => state.panels.value);

        return (
            <div className="App bg-neutral-99 flex-1 flex flex-col justify-start items-center">
            <CategoryView panels={panels}/>
        </div>
        );

};
