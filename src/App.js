import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
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
  handleLogout = () =>{
    localStorage.removeItem('permission')
    localStorage.removeItem('username')
    window.location.href = 'http://localhost:3001/admin'
  }
  render(){
      const permission  = localStorage.getItem('permission');
      const username = localStorage.getItem('username')
      return(
          <>
              <div className="d-flex align-items-center justify-content-between bg-primary p-2">
                <h1 className="text-white m-0" style={{ fontFamily: 'Arial', fontSize: '24px', fontWeight: 'bold' }}>
                  CSCI 2720 Group Project Cultural Event Platform
                </h1>
                <h1 className="text-white m-0" style={{fontSize: '24px'}}>{username}</h1>
              </div>
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
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout" onClick={this.handleLogout}>Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

                <Routes>
                  <Route path="/" element={permission ? <Home /> : <Navigate to="/login" replace />} />
                  <Route path="/number" element={permission ? <Number /> : <Navigate to="/login" replace />} />
                  <Route path="/location" element={permission ? <Location /> : <Navigate to="/login" replace />} />
                  <Route path="/search" element={permission ? <Search /> : <Navigate to="/login" replace />} />
                  <Route path="/comment" element={permission ? <Comment /> : <Navigate to="/login" replace />} />
                  <Route path="/favourite" element={permission ? <Favourite /> : <Navigate to="/login" replace />} />
                  <Route path="/price" element={permission ? <Price /> : <Navigate to="/login" replace />} />
                  <Route path="/admin" element={permission === 'admin' ? <Admin /> : (permission === 'user' ? <Navigate to="/" replace /> : <Navigate to="/login" replace />)} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </BrowserRouter>

              {/* <Gallery /> */}
          </>
      )
  }
}

export default App;