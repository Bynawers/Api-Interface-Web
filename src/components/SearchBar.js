import React, { useState } from 'react';
import * as Icon from 'react-feather';

import "../styles/AddWine.css"


function SearchBar(props) {

	const [search, setSearch] = useState("");

	const handleInput = (event) => {
		setSearch(event.target.value)
		props.setValue(event.target.value)
		if (props.event !== null) {
			props.event(search)
		}
	}

  return(
  	<div className='idSearchContainer shadow'>{props.name}
		{props.icon && <Icon.Search color="#A1A1A1"/>}
			<input 
				className='idSearch'
				value={search}
				type="text"
				placeholder={props.placeholder}
				onChange={(event) => handleInput(event)}
			/>
		</div>
  )
}

export default SearchBar;