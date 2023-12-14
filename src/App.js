import ReactDOM from "react-dom/client";
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Table from './components/home.js';

const Home = () => (
  <div>
    <Table />
  </div>
);

const List = () => (
  <div>
    <h2>List</h2>
    <p>This is the List page.</p>
  </div>
);

const Location = () => (
  <div>
    
  </div>
);

const Search = () => (
  <div>
    <h2>Search</h2>
    <p>Search.</p>
  </div>
);

class App extends React.Component{
  render(){
      return(
          <>
              
              <BrowserRouter>
                <nav style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f5f5f5', padding: '10px' }}>
                  
                  <ul style={{ listStyle: 'none', padding: '0', margin: '0', display: 'flex' }}>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/" >Home</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/list" >List</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/location" >Location</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/search" >Search</Link>
                    </li>
                  </ul>
                </nav>

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/list" element={<List />} />
                  <Route path="/location" element={<Location />} />
                  <Route path="/search" element={<Search />} />
                </Routes>
              </BrowserRouter>

              {/* <Gallery /> */}
          </>
      )
  }
}

export default App;