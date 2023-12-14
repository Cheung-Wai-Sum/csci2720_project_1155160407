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
  </div>
);
const Separate = () => (
  <div>
  </div>
);
const Favourite = () => (
  <div>
  </div>
);
const Price = () => (
  <div>
    
  </div>
);
const Login = () => (
  <div>
  </div>
);

class App extends React.Component{
  render(){
      return(
          <>
              <h1>CSCI 2720 Group Project 1155160407</h1>
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
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/separate" >Separate</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/favourite" >Favourite</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/price" >Search for event(lower than $100)</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/login" >Login</Link>
                    </li>
                  </ul>
                </nav>

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/list" element={<List />} />
                  <Route path="/location" element={<Location />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/separate" element={<Separate />} />
                  <Route path="/favourite" element={<Favourite />} />
                  <Route path="/price" element={<Price />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </BrowserRouter>

              {/* <Gallery /> */}
          </>
      )
  }
}

export default App;