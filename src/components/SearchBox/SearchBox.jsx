import React, { useRef } from 'react';
import './searchbox.css';

export default function (props) {
  const inputRef = useRef();
  const handleSearch = () => {
    const value = inputRef.current.value;
    props.handleNewSearch(value);
    inputRef.current.value = "";
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const value = inputRef.current.value;
      props.handleNewSearch(value);
      inputRef.current.value = "";
    }
  }
  return (
    <div className={"search-box"}>
      <input ref={inputRef} type="text" placeholder="Enter Search key" onKeyDown={handleKeyDown}  />
      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}