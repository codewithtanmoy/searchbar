import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
//import "./styles.css";
import 'jquery/dist/jquery.min.js';
 
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
//import $ from 'jquery'; 

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://restcountries.com/v3/name/${searchQuery}`
      );
      setResults(response.data);
      //initialize datatable
    // $(document).ready(function () {
    //     setTimeout(function(){
    //     //$('#example').DataTable();
    //     $('#example').dataTable( {
    //       "aaSorting": [[ 2, "asc" ]]
    //      } );
        
    //      } ,1000);
    // });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderResults = useMemo(() => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (results.length === 0) {
      return <p>No results found.</p>;
    }
    return (
        <div className="container-fluid">
        <table id="example" class="table table-hover table-bordered">
        <thead>
            <tr>
            <th>Country</th>
            <th>Offical Name</th>
            <th>Flag</th>
            <th>Maps</th>
            <th>Population</th>
            </tr>
        </thead>
        <tbody>
        {results.map((res) => (
          <tr key={res.cca2} align="center">
            <td className="card-title">{res.name.common}</td>
            <td className="card-subtitle">{res.name.official}</td>
            <td className="card-flag">{res.flag}</td>
            <td className="card-maps">
              {res.maps.googleMaps}, {res.maps.openStreetMaps}
            </td>
            <td className="card-population">{res.population}</td>
          </tr>
        ))}
        </tbody>
        <tfoot>
            <tr>
                <th>Country</th>
                <th>Offical Name</th>
                <th>Flag</th>
                <th>Maps</th>
                <th>Population</th>
            </tr>
        </tfoot>
        </table>
        </div>
    );
  }, [results, loading]);

  return (
    <>
      {/* <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <button onClick={handleSearch}>Search</button>
      </div> */}
        <div className="container-fluid text-center">
            <div className="row">

                <div className="col-sm-11">
                    <input type="text" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={searchQuery} onChange={handleInputChange} ref={inputRef} />
                </div>
                <div className="col-sm-1">
                    <button type="button" className="btn btn-default btn-success"  onClick={handleSearch}>search</button>
                </div>
            </div>
       
        </div>
      <div className="py-3">{renderResults}</div>
    </>
  );
};

export default SearchBar;
