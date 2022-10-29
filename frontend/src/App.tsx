import React from "react";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header h-screen bg-react text-white text-2xl justify-center items-center flex flex-col">
        <div className="animate-spin">
          <img src={logo} className="App-logo h-40" alt="logo" />
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
      </header>
    </div>
  );
}

export default App;
