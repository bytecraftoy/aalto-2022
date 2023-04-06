import { useAppSelector, useLoginRedirect } from '../../utils/hooks';
import { ProjectView } from '../../components/ProjectView';

/**
 * Shows user's projects
 *
 */

export const Projects = () => {
    // Redirect anonymous users from this page to the login page
    useLoginRedirect();

    const projects = useAppSelector((state) => state.projects.value);

    return (
        <div className="App bg-neutral-99 flex-1 flex flex-col justify-start items-center">
            <ProjectView projects={projects} />
        </div>
    );
};
