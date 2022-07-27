import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Main from './components/Main';
import PersonAdd from './components/user/user-add.component';
import PersonList from './components/user/user-list.component';


function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Menu Bar
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/users"} className="nav-link">
              Person Show
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/person-add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        {/* <Router> */}
        <Routes>
          <Route path="/users" element={<PersonList />} />
          <Route path="/user/add" element={<PersonAdd />} />
          <Route path="/" element={<Main />} />
        </Routes>
        {/* </Router> */}
      </div>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     Hello World !!!
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     <Router>
    //       <Routes>
    //         <Route path="/person-show" element={<PersonShow />} />
    //         <Route path="/person-add" element={<PersonAdd />} />
    //         <Route path="/" element={<Main />} />
    //       </Routes>
    //     </Router>
    //   </header>
    // </div>
  );
}

export default App;
