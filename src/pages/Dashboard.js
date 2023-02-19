import React, { useState } from 'react';
import "../styles/Dashboard.css"

import Header from "../shared/Header.js"

import ValidWine from './ValidWine.js';
import SearchWine from './SearchWine.js';
import AddWine from './AddWine.js';

function Dashboard(props) {

	const wine = {
		name: null,
		country: null,
		region: null,
		volume: null,
		winery: null,
		year: null,
		natural: null,
		type: null,
		natural: null,
		grape: null,
		characteritics: [],
		temperature_service: {
			min: null,
			max: null
		},
		taste: {
			acidity: null,
			fizziness: null,
			intesity: null,
			sweetness: null,
			tannin: null
		},
		rating: {
			rate: null,
			count: null
		},
		image: null,
		verify: null
	}

	const [page, setPage] = useState("Valid");

	const [dataValid, setDataValid] = useState(wine);
	const [dataWineValid, setWineValid] = useState(wine);
	const [dataWineAdd, setWineAdd] = useState(wine);

	const [dataSearch, setDataSearch] = useState([wine]);

  return(
  	<div className="dashboardAppContainer" style={{ display: props.isLogin ? "flex" : "none"}}>
			<Header setIsLogin={props.setIsLogin} setPage={setPage} page={page}/>

			{page === "Valid" && <ValidWine token={props.token} data={dataValid} setData={setDataValid} isLogin={props.isLogin}/>}
			{page === "Search" && <SearchWine token={props.token} data={dataSearch} setData={setDataSearch} info={dataWineValid} setInfo={setWineValid}/>}
			{page === "Add" && <AddWine token={props.token} data={dataWineAdd} setData={setWineAdd}/>}
    </div>
  )
}

export default Dashboard;