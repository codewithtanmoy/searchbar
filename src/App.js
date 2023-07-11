import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SearchBar from "./Searchbar";

const App = () => {
  return (
    <div className="container-fluid">
      <h1 className="text-center">Search Countries Details</h1>
      <div className="py-3">
        <SearchBar />
      </div>
    </div>
  );
};

export default App;
