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
import Userfavourite from './components/favourite.js';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <Userfavourite />
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
              <h1 style={{ fontFamily: 'Arial', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                CSCI 2720 Group Project Cultural Event Platform
              </h1>
              <BrowserRouter>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <Link className="navbar-brand" to="/">Home</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/number">Number of Event in a Location</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/price">Cultural Event (Price lower than $100)</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/search">Search location by keywords</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/location">Location</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/comment">Comment</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/favourite">Favourite</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin Panel</Link>
                  </li>
                </ul>
              </div>
            </div>
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