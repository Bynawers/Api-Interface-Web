import React, { useState, useEffect } from 'react';
import "../styles/AddWine.css"
import axios from "axios"

import imageWineDefault from '../assets/bottle.png';

function Add(props) {

  const [goodForm, setGoodForm] = useState(false)

  const [name, setName] = useState("")
	const [region, setRegion] = useState("")
	const [type, setType] = useState("")
	const [winery, setWinery] = useState("")
	const [country, setCountry] = useState("")
	const [volume, setVolume] = useState("")
	const [year, setYear] = useState("")
	const [natural, setNatural] = useState("")
	const [grape, setGrape] = useState("")
  const [characteritics, setCharacteritics] = useState("")
	const [temperatureServiceMin, setTemperatureServiceMin] = useState("")
	const [temperatureServiceMax, setTemperatureServiceMax] = useState("")
  const [image, setImage] = useState(null)

  useEffect(() => {
    checkAddForm();
  });

  const handleAddWine = async() => {
    if (!checkAddForm()) {
      return;
    }

    const BASE_URL = "http://192.168.1.83:8000"
    
    const formData = new FormData();
    image ? formData.append('image', image, `${name}_${winery}.png`) : console.log("no image")
    formData.append('name', name);
    formData.append('year', year);
    formData.append('region', region);
    formData.append('type', type);
    formData.append('winery', winery);
    formData.append('country', country);
    formData.append('volume', volume);
    formData.append('natural', natural);
    formData.append('grape', grape);
    let arrayCharacteristics = characteritics ? characteritics.split("/") : []
    formData.append('characteritics', arrayCharacteristics);
    let temperature_service = {
      min: temperatureServiceMin,
      max: temperatureServiceMax
    }
    formData.append('temperature_service', temperature_service);
    formData.append('verified', true);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=${boundary}',
        "Content-Disposition": "form-data",
        authorization: `${props.token}`,
      },
    };
    
    axios.post(BASE_URL+"/api/wine", formData, config)
    .then(async function (response) {
      console.log(response)
      alert("success")
    })
    .catch(function (error) { alert(error) });
    
  }

  const checkAddForm = () => {
    if (!name || !country || !region || !winery || !type || !year) {
      setGoodForm(false)
      return false;
    }
    else {
      setGoodForm(true)
      return true
    }
  }
  const reset = () => {
    setGoodForm(false)
    setName("");
    setCountry("");
    setType("");
    setWinery("");
    setRegion("");
    setVolume(null);
    setYear(null);
    setNatural("");
    setGrape("");
    setCharacteritics([])
    setTemperatureServiceMin(null)
    setTemperatureServiceMax(null)
    setImage(null)
  }

  return(
  	<div className='content'>
      <div className='wineChecker shadow'>
					<div className='description'>
						<img src={image ? URL.createObjectURL(image) : imageWineDefault} alt="Logo" className='bottle' style={{ opacity: image ? 1 : 0.2 }}/>
						<div className='data'>
							<DataElement name="Name* : " content={name} setContent={setName} type="string"/>
							<DataElement name="Type* : " content={type} setContent={setType} type="string" placeholder="rouge/blanc/rose"/>
							<DataElement name="Winery* : " content={winery} setContent={setWinery} type="string"/>
							<DataElement name="Country* : " content={country} setContent={setCountry} type="string"/>
							<DataElement name="Region* : " content={region} setContent={setRegion} type="string"/>
							<DataElement name="Volume : " content={volume} setContent={setVolume} type="number" placeholder="ml"/>
							<DataElement name="Year* : " content={year} setContent={setYear} type="number"/>
							<DataElement name="Natural : " content={natural} setContent={setNatural} type="boolean" placeholder="true/false"/>
							<DataElement name="Grape : " content={grape} setContent={setGrape} type="string"/>
							<DataElement name="Characteristics : " content={characteritics} setContent={setCharacteritics} type="string" placeholder="fruité/puissant/..."/>
							<DataElement name="Temp Min : " content={temperatureServiceMin} setContent={setTemperatureServiceMin} type="number"/>
							<DataElement name="Temp Max : " content={temperatureServiceMax} setContent={setTemperatureServiceMax} type="number"/>
              <ImageElement name="Image : " content={image} setContent={setImage}/>	
						</div>
					</div>
					<div className="bottomBar">
            <div className='button'></div>
						<div className='button addButton' style={{ opacity: goodForm ? 1 : .3, cursor: goodForm ? "pointer" : "not-allowed"}} onClick={() => handleAddWine()}>Ajouter</div>
					</div>
				</div>
    </div>
  )
}

const ImageElement = (props) => {

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    props.setContent(selectedFile);
  };

	return(
		<div>
			<span className='typeText'>{props.name}</span>
			<input 
				type="file"
				accept='image'
				className="image"
        onChange={handleImageChange}
			/>
		</div>
	);
}

const DataElement = (props) => {

	const handleInput = (event) => {
		props.setContent(event.target.value)
	}

	return(
		<div>
			<span className='typeText'>{props.name}</span>
			<input 
				className={props.type === "string" ? "textInput string" : props.type === "number" ? "textInput number" : "textInput boolean"}
				value={props.content || ""}
				onChange={(event) => handleInput(event)}
        autoComplete="new-password"
        placeholder={props.placeholder || ""}
			/>
		</div>
	);
}

export default Add;