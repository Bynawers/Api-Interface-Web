import React, { useState } from 'react';
import axios from "axios"

import "../styles/SearchWine.css"

import SearchBar from '../components/SearchBar';

function SearchWine(props) {

  const BASE_URL = "http://192.168.1.83:8000"

  const [value, setValue] = useState("");

  const handleChange = (value) => {
    axios.get(BASE_URL+"/api/wine?name="+value, {
      headers: {
        authorization: props.token
    }
    })
    .then(async function (response) {
      props.setData(response.data);
      console.log(response.data)
    })
    .catch(function (error) { alert(error) });
  }

  return(
  	<div className="content">
      <div className='headerContainer'>
        <SearchBar icon="searchIcon" value={""} event={handleChange} setValue={setValue}/>
      </div>
      <div className="contentResult">
        {value && <Items data={props.data}/>}
      </div>
    </div>
  )
}

const Items = (props) => {

  return(
    <React.Fragment>
      {props.data.map(item => {

        const copyToClipboard = (value) => {
          navigator.clipboard.writeText(value);
        };

        return(
          <>
            <div className='item' onClick={() => copyToClipboard(item._id)}>
              {item.name} - {item.year}
            </div>
            <div className='separation'/>
          </>
        );
      })}
    </React.Fragment>
  );
  
}

export default SearchWine;