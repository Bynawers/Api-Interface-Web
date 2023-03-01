import React, {useState, useEffect } from 'react';
import axios from "axios"

import imageWineDefault from '../assets/bottle.png';
import SearchBar from "../components/SearchBar.js"

import "../styles/ValidWine.css";

function ValidWine(props) {

	const BASE_URL = "http://192.168.1.83:8000"

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
	const [characteritics, setCharacteritics] = useState(props.data.characteritics ? props.data.characteritics.length : 0)
	const [temperatureServiceMin, setTemperatureServiceMin] = useState(props.data.temperature_service ? props.data.temperature_service.min : null)
	const [temperatureServiceMax, setTemperatureServiceMax] = useState(props.data.temperature_service ? props.data.temperature_service.max : null)
	const [image, setImage] = useState(props.data.image)

	useEffect(() => {
		if (props.isLogin && !init) {
			console.log('init')
			setInit(true)
			getRandomWine(page, props.token, props.setData, setId)
		}
  });

	useEffect(() => {
		setRenderData()
	}, [props.data]);

	const handleSkipWine = () => {
		getRandomWine(page + 1, props.token, props.setData, setId)
		setPage(page + 1);
	}

	const handleSearch = () => {
		getWine(id, props.token, props.setData, setId)
	}

	const setRenderData = () => {
		setId(props.data._id)
		setName(props.data.name)
		setRegion(props.data.region)
		setType(props.data.type)
		setWinery(props.data.winery)
		setCountry(props.data.country)
		setVolume(props.data.volume ? props.data.volume : null)
		setYear(props.data.year)
		setNatural(props.data.natural ? props.data.natural : null)
		setGrape(props.data.grape ? props.data.grape : null)
		setCharacteritics(props.data.characteritics ? props.data.characteritics : null)
		setTemperatureServiceMin(props.data.temperature_service ? props.data.temperature_service.min : null)
		setTemperatureServiceMax(props.data.temperature_service ? props.data.temperature_service.max : null)
		console.log(BASE_URL + "/images/"+ id+".png")
		setImage(props.data.image)
	}

    return(
      <div className='content'>
				<div className='headerContainer'>
					<SearchBar name="ID" value={id} event={null} setValue={setId} placeholder={id}/>

					<div className='search shadow disable-text-selection' onClick={() => handleSearch()}>	
						Search
					</div>

				</div>

				{props.data.name !== null && 
				<div className='wineChecker shadow'>
					<div className='description'>
						<img src={image ? URL.createObjectURL(BASE_URL + "/images/"+ id+".png") : imageWineDefault} alt="Logo" className='bottle' style={{ opacity: props.data.image ? 1 : 0.2 }}/>
						<div className='data'>
							<DataElement name="Name : " content={name} setContent={setName} type="string"/>
							<DataElement name="Type : " content={type} setContent={setType} type="string" placeholder="rouge/blanc/rose"/>
							<DataElement name="Winery : " content={winery} setContent={setWinery} type="string"/>
							<DataElement name="Country : " content={country} setContent={setCountry} type="string"/>
							<DataElement name="Region : " content={region} setContent={setRegion} type="string"/>
							<DataElement name="Volume : " content={volume} setContent={setVolume} type="number" placeholder="ml"/>
							<DataElement name="Year : " content={String(year)} setContent={setYear} type="number"/>
							<DataElement name="Natural : " content={String(natural)} setContent={setNatural} type="boolean" placeholder="false/true"/>
							<DataElement name="Grape : " content={String(grape)} setContent={setGrape} type="string"/>
							<DataElement name="Characteristics : " content={String(characteritics)} setContent={setCharacteritics} type="number" placeholder="fruité/puissant/..."/>
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
				value={props.content || ""}
				onChange={(event) => handleInput(event)}
				placeholder={props.placeholder}
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
		console.log(response.data);
	})
	.catch(function (error) { alert(error) });
}

const getWine = (id, token, setData, setId) => {

	const BASE_URL = "http://192.168.1.83:8000"

	console.log(BASE_URL+"/api/wine/"+id)

	axios.get(BASE_URL+"/api/wine/"+id, {
		headers: {
			authorization: token
	}
	})
	.then(async function (response) {
		setData(response.data)
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