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
import './components/home.css';
import SearchKeyword from './components/keyword.js';
import SearchPrice from './components/price.js';
import Sorting from './components/sort.js';
const Home = () => (
  <div>
    <Table />
  </div>
);

const Sort = () => (
  <div>
    <Sorting />
  </div>
);

const Location = () => (
  <div>
    
  </div>
);

const Search = () => (
  <div>
    <SearchKeyword />
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
    <SearchPrice />
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
              <h1>CSCI 2720 Group Project Cultural Event Platform</h1>
              <BrowserRouter>
                <nav style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f5f5f5', padding: '10px' }}>
                  
                  <ul style={{ listStyle: 'none', padding: '0', margin: '0', display: 'flex' }}>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/" >Home</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/sort" >Sorting</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/location" >Location</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/search" >Search location by keywords</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/separate" >Separate</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/favourite" >Favourite</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/price" >Cultural Event(Price lower than $100)</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/login" >Login</Link>
                    </li>
                  </ul>
                </nav>

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/sort" element={<Sort />} />
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