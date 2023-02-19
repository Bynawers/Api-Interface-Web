import React, {useState, useEffect } from 'react';
import axios from "axios"

import imageWineDefault from '../assets/bottle.png';

import "../styles/ValidWine.css";

import SearchBar from "../components/SearchBar.js"

function ValidWine(props) {

	const [init, setInit] = useState(false)
	const [page, setPage] = useState(0)
	const [id, setId] = useState("")

	const [name, setName] = useState(props.data.name)
	const [region, setRegion] = useState(props.data.region)
	const [type, setType] = useState(props.data.region)
	const [winery, setWinery] = useState(props.data.winery)
	const [country, setCountry] = useState(props.data.country)
	const [volume, setVolume] = useState(props.data.volume)
	const [year, setYear] = useState(props.data.year)
	const [natural, setNatural] = useState(props.data.natural)
	const [grape, setGrape] = useState(props.data.grape)
	const [characteritics, setCharacteritics] = useState(props.data.characteritics.length)
	const [temperatureServiceMin, setTemperatureServiceMin] = useState(props.data.temperature_service.min)
	const [temperatureServiceMax, setTemperatureServiceMax] = useState(props.data.temperature_service.max)

	let wine = {
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

	const [outputWine, setOutputWine] = useState(wine)

	useEffect(() => {

		wine = {
			name: name,
			country: country,
			region: region,
			volume: volume,
			winery: winery,
			year: year,
			natural: natural,
			type: type,
			grape: grape,
			characteritics: props.data.characteritics,
			temperature_service: {
				min: temperatureServiceMin,
				max: temperatureServiceMax
			},
			taste: {
				acidity: props.data.taste.taste,
				fizziness: props.data.taste.fizziness,
				intesity: props.data.taste.intesity,
				sweetness: props.data.taste.sweetness,
				tannin: props.data.taste.tannin
			},
			rating: {
				rate: props.data.rating.rate,
				count: props.data.rating.count
			},
			image: props.data.image,
			verify: props.data.verify
		}

		if (props.isLogin && !init) {
			console.log('init')
			setInit(true)
			getRandomWine(page, props.token, props.setData, setId)
		}
  });

	const handleSkipWine = () => {
		console.log("multi wine")
		getRandomWine(page + 1, props.token, props.setData, setId)
		setPage(page + 1);
	}

	const handleSearch = () => {
		console.log("one wine")
		getWine(id, props.token, props.setData, setId)
	}

    return(
      <div className='content'>
				<div className='headerContainer'>
					<SearchBar name="ID" value={props.data._id} event={null} setValue={setId}/>

					<div className='search shadow disable-text-selection' onClick={() => handleSearch()}>	
						Search
					</div>

				</div>

				{props.data.name !== null && 
				<div className='wineChecker shadow'>
					<div className='titleContainer'>
						<h3>{props.data.name}</h3>
					</div>
					<div className='description'>
						<img src={imageWineDefault} alt="Logo" className='bottle'/>
						<div className='data'>
							<DataElement name="Name : " content={name} setContent={setName} type="string"/>
							<DataElement name="Type : " content={type} setContent={setType} type="string"/>
							<DataElement name="Winery : " content={winery} setContent={setWinery} type="string"/>
							<DataElement name="Country : " content={country} setContent={setCountry} type="string"/>
							<DataElement name="Region : " content={region} setContent={setRegion} type="string"/>
							<DataElement name="Volume : " content={volume} setContent={setVolume} type="number"/>
							<DataElement name="Year : " content={String(year)} setContent={setYear} type="number"/>
							<DataElement name="Natural : " content={String(natural)} setContent={setNatural} type="boolean"/>
							<DataElement name="Grape : " content={String(grape)} setContent={setGrape} type="string"/>
							<DataElement name="Characteristics : " content={String(characteritics)} setContent={setCharacteritics} type="number"/>
							<DataElement name="Temp Min : " content={String(temperatureServiceMin)} setContent={setTemperatureServiceMin} type="number"/>
							<DataElement name="Temp Max : " content={String(temperatureServiceMax)} setContent={setTemperatureServiceMax} type="number"/>
							<ImageElement name="Image : "/>			
						</div>
					</div>
					<div className="bottomBar">
						<div className='buttonOutline skipButton' onClick={() => handleSkipWine()}>Passer</div>
						<div className='button nextButton shadow' onClick={() => handleSkipWine()}>Valider</div>
					</div>
				</div>
				}
				{props.data.name === null &&
				<div className='wineChecker shadow'>

				</div>
				}

			</div>
    );
}

const ImageElement = (props) => {
	return(
		<div>
			<span className='typeText'>{props.name}</span>
			<input 
				type="file"
				accept='image'
				className="image"
			/>
		</div>
	);
}

const DataElement = (props) => {

	const handleInput = (event) => {
		props.setContent(event.target.value)
		console.log(event.target.value)
	}

	return(
		<div>
			<span className='typeText'>{props.name}</span>
			<input 
				className={props.type === "string" ? "textInput string" : props.type === "number" ? "textInput number" : "textInput boolean"}
				value={props.content}
				onChange={(event) => handleInput(event)}
			/>
		</div>
	);
}

const getRandomWine = (page, token, setData, setId) => {

	const BASE_URL = "http://192.168.1.83:8000"

	axios.get(BASE_URL+"/api/wine?page="+page+"&size=1", {
		headers: {
			authorization: token
	}
	})
	.then(async function (response) {
		setData(response.data[0]);
		setId(response.data[0].id);
		console.log(response.data);
	})
	.catch(function (error) { alert(error) });
}

const getWine = (id, token, setData, setId) => {

	const BASE_URL = "http://192.168.1.83:8000"

	axios.get(BASE_URL+"/api/wine/"+id, {
		headers: {
			authorization: token
	}
	})
	.then(async function (response) {
		setData(response.data);
		setId(response.data._id)
		console.log(response.data)
	})
	.catch(function (error) { alert(error) });
}

const validWine = (token, id, data) => {


	const BASE_URL = "http://192.168.1.83:8000"

	axios.put(BASE_URL+"/api/wine/"+id, data, {
		headers: {
			authorization: token
	}
	})
	.then(async function (response) {
		console.log(response)
	})
	.catch(function (error) { alert(error) });
}


export default ValidWine;