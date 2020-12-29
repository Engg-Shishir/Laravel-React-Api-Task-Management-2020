import React  from 'react';
import logo from './asset/logo.svg';
import './asset/Reacts.css';


const Reacts = () =>{
 return (
  <>
  <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This <code>React page</code> copy from react snipet
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

  </>
 );
};

export default Reacts;