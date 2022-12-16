import { ContentPanel } from '../../components/ContentPanel';

export const Home = () => {
    return (
        <div className="App bg-neutral-99 h-full flex flex-col justify-start items-center">
            <ContentPanel getMasterCategory={() => ''} />
        </div>
    );
};
