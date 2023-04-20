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
        <div>
            <h1 className="py-16 text-center text-4xl text-neutral-30">
                Projects
            </h1>
            <ProjectView projects={projects} />
        </div>
    );
};
