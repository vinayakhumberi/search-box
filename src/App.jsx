import React, { useState } from 'react';
import './App.css';
import SearchBox from './components/SearchBox/SearchBox';
import Table from './components/Table/Table';

function App() {
  const [data, setData] = useState(null);
  const fetchService = (value, page) => {
    fetch(`https://hn.algolia.com/api/v1/search?${value}&page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  }
  const handleNewSearch = (value) => {
    fetchService(`query=${value}`, 0);
  }
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="search-container">
        <SearchBox handleNewSearch={handleNewSearch} />
        
        {(data && data.nbPages > 0) ? <Table data={data} fetchService={fetchService} />
            : <h4> No Results Found </h4>}
        
      </div>
    </div>
  );
}

export default App;
