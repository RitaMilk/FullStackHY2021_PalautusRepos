import React, { useState } from 'react'
const Header = (props) => {
  return (
    <div>
      <h1>{props.greating}</h1>
    </div>
  )
}
const App = () => {
  //const [rand, getRandom ] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(6).fill(0))//useState([])
  const[mostVote,setMostVote]=useState(0)
  const getRandom=(max)=>{
    return Math.floor(Math.random() * Math.floor(max))
  }
  const handleClick = () => {
    //console.log(selected)
    const copy = [...points]
    // kasvatetaan taulukon anekdotin paikalla olevaa arvoa yhdellä
    copy[selected] += 1 
    setPoints(copy)
    //console.log("kasvatettu ",copy)
    //console.log("points ",{points})
    //console.log("index of max  ", mostVotedIndex(copy))
    setMostVote(mostVotedIndex(copy))
  }
  const mostVotedIndex=(array1)=>{
    const maxVote=(Math.max(...array1))
    //console.log("points ",array1)
    //console.log("index of max  ", array1.indexOf(maxVote) )
    return array1.indexOf(maxVote)
  }

  return (
    <div>
        <Header greating="Anecdote of the day"/>
        <p>
          {anecdotes[selected]}
        </p>
        <p>has {points[selected]} votes</p>
        <button onClick={() => handleClick(selected)}>VOTE</button>
        <button onClick={() => setSelected(getRandom(6))}>NEXT ANECDOTE</button>
      
        <Header greating="Anecdote with moste votes"/>
        <p>
          {anecdotes[mostVote]}
        </p>
      </div>
  )
}

export default App