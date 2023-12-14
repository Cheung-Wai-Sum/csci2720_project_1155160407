import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  } from 'react-router-dom';


import Table from './components/home.js';
import './components/home.css';
import SearchKeyword from './components/keyword.js';
import SearchPrice from './components/price.js';
import Sorting from './components/sort.js';
import Pannel from './components/pannel.jsx';
import Login from './components/loginPage.js';
import UserComment from './components/comment.js';
const Home = () => (
  <div>
    <Table />
  </div>
);

const Number = () => (
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
const Comment = () => (
  <div>
    <UserComment/>
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
const Admin = () => (
  <div>
    <Pannel/>
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
                      <Link to="/number" >Number of Event in a Location</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/price" >Cultural Event(Price lower than $100)</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/search" >Search location by keywords</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/location" >Location</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/comment" >Comment</Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                      <Link to="/favourite" >Favourite</Link>
                    </li>

                    <li style={{ marginRight: '10px' }}>
                      <Link to="/admin" >Admin pannel</Link>
                    </li>
                  </ul>
                </nav>

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/number" element={<Number />} />
                  <Route path="/location" element={<Location />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/comment" element={<Comment />} />
                  <Route path="/favourite" element={<Favourite />} />
                  <Route path="/price" element={<Price />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </BrowserRouter>

              {/* <Gallery /> */}
          </>
      )
  }
}

export default App;