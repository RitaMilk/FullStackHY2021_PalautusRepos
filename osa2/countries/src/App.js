import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShowWeather=({city})=>{
  const [newCity, setNewCity]=useState(city)
  const [weatherD,setWeatherD]=useState([])
  console.log("Render weather in ",city)

  const hook1 = () => {
    setNewCity(newCity)
    console.log("I have set newCity to", city)
    console.log('effect hook1')
    //let url= 'https://restcountries.eu/rest/v2/capital/'
    let url='http://api.weatherbit.io/v2.0/current?key=47425e1af79a469fb86f57bd97ef2126&city='
    //let url='http://api.weatherstack.com/current?access_key=1586283c896b4b2c34865c9e24d709e1&query='
    // .get('http://api.weatherstack.com/current?access_key=1586283c896b4b2c34865c9e24d709e1&query=Helsinki')
    url=url.concat(city)
    console.log("url is ",url)
    axios
      .get(url)
      .then(response => {
        console.log('promise weather fulfilled')
        setWeatherD(response.data)
      })
      .catch(error => {
        console.log('fail')
      })
    
  }
  useEffect(hook1, !(city===undefined))
  //console.log("showWeather searched:",weatherD.data)
  if (city===undefined){  //use effect 2.11
    return(<div></div>)
  }
  else{
    
    return (
      
      <div>
        {/* <h2>Weather in {weatherD.data.city_name}</h2> */}
        debug {weatherD.data}
        {/* <p>Temperature: {weatherD.data.temp}</p>
        <p>Wind: {weatherD.data.wind_cdir_full}</p> */}
        </div>
    )
  }
  
  //use effect 2.14 weather
  //2.14
}
const Contentlist = ({content}) => {
  return (
      <ul style={{listStyle: 'none'}}>
      {content.map(note => 
        <li  key={note.name}>
          {note.name} {note.number}
        </li>
      )}
    </ul>
  )
} 
const ButtonShow=(props)=>{
  return(
    //<div>
        <button onClick={props.onClickE } > {props.text} </button>
    //</div>
  )
}
const Contentlistbutton = ({content}) => {
  const [ itemToShow, setItemToShow ] = useState([])
  const handleClick=(e)=>{
    console.log("passed:",{e})
    console.log("passed:",e)
    setItemToShow(e)
    console.log("itemToshow is set to",{itemToShow})
  }
  return (
    <div>
      <ul style={{listStyle: 'none'}}>
      {content.map(note => 
        <li  key={note.name}>
          {note.name} 
          <ButtonShow onClickE={()=>handleClick(note)} text="show" />
        </li>
      )}
    </ul>
        <ItemDetail content={itemToShow}/>   
        <ShowWeather city={itemToShow.capital}/>
     </div> 
  )
} 
const Contentlist2 = ({content}) => {
  return (
    <div>
      <h2>Spoken languages</h2>
      <ul >
      {content.map(note => 
        <li  key={note.name}>
          {note.name}
        </li>
      )}
    </ul>
    </div>
  )
} 
const ImageContent = ({path}) => {
  return (
      // <div>console.log("image url:",{path})
      <img 
        src={path} 
        alt="flag"
        style={{width: '100px',height: 'auto'}}></img>
      //</div>
  )
} 
const ItemDetail = ({content}) => {
  //console.log("length",content.name)
   if ((content.name===undefined)){
    return(
      <div></div>
    )
  } 
  //console.log("name",content.name)
  return (
      <div>
      <h1>{content.name}</h1>
      <p>capital {content.capital}
        <br></br>
        population {content.population}
      </p>
      <Contentlist2 content={content.languages}/>
      <ImageContent path={content.flag}/>
    </div>
  )
} 
const Filter=(props)=>{
  return(
    <div>filter: 
        <input value={props.value} onChange={props.handleChange}/>
    </div>
  )
}
const ShowCountries =(props)=> {
  if (props.filteredCountries.length> 10) {
    return (<div>Two many countries: {props.filteredCountries.length}</div>)
  }
  else if (props.filteredCountries.length=== 1){
      return(
      <div>
        Detalization countries
        <ItemDetail content={props.filteredCountries[0]}/>
        {/* debug: {props.filteredCountries[0].capital} */}
        <ShowWeather city={props.filteredCountries[0].capital}/>
      </div>)
  }
  else {
      return(
      <div>Usual list:
        <Contentlistbutton content={props.filteredCountries} />
      </div>)
  } 
}
 

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newCriteria, setNewCriteria ] = useState('')
  //const [ newCapital, setNewCapital]=useState('')
  //const [weatherData,setWeatherData]=useState([])
  const [notesToShow1,setNotesToShow1]=useState([])
  const handleCriteriaChange = (event) => {
    console.log("Criteria comp")
    console.log(event.target.value)
    setNewCriteria(event.target.value) 
    //setNotesToShow1(countries.filter(cantri => cantri.name.toLowerCase().includes(newCriteria)))
    setNotesToShow1(countries.filter(cantri => cantri.name.toLowerCase().includes(event.target.value)))
  }
  console.log("filter criteria is ",newCriteria)
  //const notesToShow = countries.filter(cantri => cantri.name.toLowerCase().includes(newCriteria))
  console.log("show filtred:",notesToShow1)
  //console.log("capital is set to",newCapital)
  //use effect 2.11
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])
  console.log('render', countries.length, 'countries')
  console.log('render', notesToShow1.length, 'filtered countries')
  //use effect 2.11
  return (
    <div>
      <div>find countries </div>
      <Filter value={newCriteria} handleChange={handleCriteriaChange}/> 
      <ShowCountries filteredCountries={notesToShow1}/>
    </div>
  )
}

export default App;
