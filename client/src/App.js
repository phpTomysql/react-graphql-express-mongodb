import React from 'react';
import AddBook from './components/AddBook';
import BookList from './components/BookList';
function App() {
  return (
    <div className="container">
      <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-12">
      <AddBook />
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12 m-10 p-3 bg-light">
      <h5>List <span className="badge badge-secondary">Book</span></h5>
        <div className="clear-both"></div>
      <div className="row">
        <BookList />
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
