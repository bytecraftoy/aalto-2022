import React from 'react';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { TailwindTestModal } from './components/TailwindTestModal';

function App() {
    return (
        <div className="App">
            <header className="App-header min-h-screen bg-react text-white text-2xl justify-center items-center flex flex-col">
                <div className="animate-spin">
                    <CodeBracketIcon className="App-logo h-40" />
                </div>
                <p className="">
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link text-cyan-400"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <div className="min-w-full py-2">
                    <TailwindTestModal />
                </div>
            </header>
        </div>
    );
}

export default App;
