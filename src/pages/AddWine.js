import React, { useState } from 'react';
import "../styles/AddWine.css"
import axios from "axios"

import imageWineDefault from '../assets/bottle.png';

function Add(props) {

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

  const handleAddWine = () => {
    if (checkAddForm()) {
      // good
    }
    /*
    addWine(props.token, {
      name: name,
      region: region,
      type: type,
      winery: winery,
      country: country,
      volume: volume,
      year: year,
      natural: natural,
      grape: grape,
      characteritics: characteritics,
      temperature_service: {
        min: temperatureServiceMin,
        max: temperatureServiceMax
      }
    })*/
  }

  const checkAddForm = () => {
    if (name == "" || country == "" || region == "" || winery == "" || type == "" ) {
      return false;
    }

  }

  return(
  	<div className='content'>
      <div className='wineChecker shadow'>
        <div className='titleContainer'>
          <h3>Ajouter un vin :</h3>
        </div>
					<div className='description'>
						<img src={imageWineDefault} alt="Logo" className='bottle'/>
						<div className='data'>
							<DataElement name="Name* : " content={name} setContent={setName} type="string"/>
							<DataElement name="Type* : " content={type} setContent={setType} type="string"/>
							<DataElement name="Winery* : " content={winery} setContent={setWinery} type="string"/>
							<DataElement name="Country* : " content={country} setContent={setCountry} type="string"/>
							<DataElement name="Region* : " content={region} setContent={setRegion} type="string"/>
							<DataElement name="Volume : " content={volume} setContent={setVolume} type="number"/>
							<DataElement name="Year : " content={year} setContent={setYear} type="number"/>
							<DataElement name="Natural : " content={natural} setContent={setNatural} type="boolean"/>
							<DataElement name="Grape : " content={grape} setContent={setGrape} type="string"/>
							<DataElement name="Characteristics : " content={characteritics} setContent={setCharacteritics} type="number"/>
							<DataElement name="Temp Min : " content={temperatureServiceMin} setContent={setTemperatureServiceMin} type="number"/>
							<DataElement name="Temp Max : " content={temperatureServiceMax} setContent={setTemperatureServiceMax} type="number"/>
              <ImageElement name="Image : "/>	
						</div>
					</div>
					<div className="bottomBar">
            <div className='button'></div>
						<div className='button addButton' onClick={() => handleAddWine()}>Ajouter</div>
					</div>
				</div>
    </div>
  )
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
        autoComplete="new-password"
			/>
		</div>
	);
}

const addWine = (token, data) => {

	const BASE_URL = "http://192.168.1.83:8000"

	axios.post(BASE_URL+"/api/wine", data, {
		headers: {
			authorization: token
	}
	})
	.then(async function (response) {
		console.log(response)
	})
	.catch(function (error) { alert(error) });
}

export default Add;