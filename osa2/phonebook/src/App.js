import React, { useState, useEffect } from 'react'
import noteService from './services/notes'
import Notification from './components/Notification'

const ButtonDelete=(props)=>{
  //console.log("I am button")
  return(
        <button onClick={props.onClickEv } > {props.textB} </button>
  )
}
const Contentlistbutton = ({content,onClickE,text}) => {
  return (
    <div>
      <ul style={{listStyle: 'none'}}>
      {content.map(note => 
        <li  key={note.id}>
          {note.name} {note.number}
          <ButtonDelete onClickEv={()=>onClickE(note.id,note.name)} textB={text} />
        </li>
      )}
      </ul>
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
const PersonForm=(props)=>{
  return(<form onSubmit={props.addNameApp}>
    <div>
      debug: {props.value1}
    </div>
    <div>name:
       <input
        value={props.value1}
        onChange={props.onChange1}
      />
    </div>
    <div>number:
       <input
        value={props.value2}
        onChange={props.onChange2}
      />
    </div>
    <button type="submit">ADD</button>
  </form>)
}
const App = () => {
  const [ persons, setPersons ] = useState([])
  /* const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'ok', number: '55-23-6423122' }
  ])  */
 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newCriteria, setNewCriteria ] = useState('')
  const [positiveMessage, setPositiveMessage] = useState(null)  
  const [typeMessage, setTypeMessage] = useState("positive") 
  
  //2.15 sending data to service=fetching from db
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
      setPersons(initialNotes)
    })
  }, [])
  //2.15 sending data to service=fetching from db

  const addName = (event) => {
    event.preventDefault()
    //console.log("AddName:persons befor checking",persons)
    
    const personsNamesLowCase=persons.map(function(persona){
      return persona.name.toLowerCase()
    })
    setTypeMessage("positive")
    //console.log("AddName:personsNames befor checking",personsNamesLowCase)
    if (personsNamesLowCase.includes(newName.toLowerCase())){
      //console.log(newName, " already in")
      const note = persons.find(persona => persona.name.toLowerCase() === newName.toLowerCase())
      //console.log("persone to update is: ",note)
      //console.log("newName is ",newName)
      const doIt = window.confirm(`${note.name} is already in phonebook. Do you want to update number?`)
      if (doIt) {
        updatePhonebookRec(note.id,newNumber)
      }
      setPositiveMessage(
        `${newName} phone number is updated`
      )
      setNewName('')
      setNewNumber('')
    }
    else {
      const nameObject = {
        name: newName,
        number:newNumber 
      } 
      noteService//2.15
      .create(nameObject)
        .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setPositiveMessage(
          `contact ${newName}  is added into phonebook`
        )
        setNewName('')
        setNewNumber('')
      })//2.15
    }
    //2.19 Styled message
    setTimeout(() => {
      setPositiveMessage(null)
    }, 5000)
    //2.19 styled message
  }
  //2.18 update phonebook recordes
  const updatePhonebookRec = (id,newNumber) => {
    const note = persons.find(n => n.id === id)
    //console.log("updatePhoneBookRec where newNumber", newNumber)
    const changedNote = { ...note, name: note.name, number: newNumber }
    //console.log("note to update", changedNote)
    noteService
    .update(id, changedNote)
      .then(returnedNote => {
      setPersons(persons.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      setTypeMessage("error")
      setPositiveMessage(
        `The note '${note.name}' was already deleted from server`
      )
      setTimeout(() => {
        setPositiveMessage(null)
      }, 5000)
      setPersons(persons.filter(n => n.id !== id))
    })    
  }
  //2.18
  //2.17 delete person by clicking delete button
  const handleClick=(eId,eName)=>{
    //console.log("passed:",{eId})
    const doIt=window.confirm(`Delete ${eName}?`)
    if (doIt){
      noteService//2.15
      .delById(eId)
        .then(() => {
        setPersons(persons.filter(persona =>(!(persona.id === eId))))
      })//2.15
      setNewName('')
      setNewNumber('')
    }
  }
  //2.17
  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleCriteriaChange = (event) => {
    //console.log("Criteria comp")
    //console.log(event.target.value)
    setNewCriteria(event.target.value)
  }
  
  const notesToShow1 = persons.filter(persona => persona.name.toLowerCase().includes(newCriteria.toLowerCase()))
  //console.log("filtered pesr:",notesToShow1)
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={positiveMessage} typeM={typeMessage}/>
      <Filter value={newCriteria} handleChange={handleCriteriaChange}/> 
      <h2>add a new</h2>
      <PersonForm value1={newName} 
                  value2={newNumber} 
                  addNameApp={addName} 
                  onChange1={handleNameChange}
                  onChange2={handleNumberChange}/>
      <h2>Numbers</h2>
       <Contentlistbutton content={notesToShow1} onClickE={handleClick} text="delete"/> 
    </div>
  )
}

export default App;
