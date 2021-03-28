import React, { useState } from 'react'
const Header = (props) => {
  return (
    <div>
      <h1>{props.greating}</h1>
    </div>
  )
}
 const StatisticLine = (props) => {
  return(  
    <tbody> 
      <tr>  
        <td>{props.text}</td> 
        <td>{props.value}</td> 
        <td>{props.unit}</td>
       </tr>
   </tbody>
                   )
}
  const Statistic = (props) => {
   
    const greating="statistic"
    const total = () => {
      return props.bad+props.neutral+props.good
    }
    let totalDiv=total()
    if (totalDiv===0) {
      totalDiv=1
    }
    
    const avrg = () => {
      return (-props.bad+props.neutral*0+props.good)/totalDiv
    }
    const positive = () => {
      return props.good/totalDiv*100
    }
  if (total()===0) {
    return(
      <div><Header greating={greating} />
      <table>
      <StatisticLine text="no feedback given"  />
      </table>
      </div>
    )
  } else {
    return (
      <div>
        <Header greating={greating} />
         <table>
          <StatisticLine text="good" value ={props.good}/>
          <StatisticLine text="neutral" value ={props.neutral}/>
          <StatisticLine text="bad" value ={props.bad} />
          <StatisticLine text="total" value ={total()} />
          <StatisticLine text="average" value ={avrg()} /> 
          <StatisticLine text="positive" value ={positive()}  unit="%"/>  
        </table> 
      </div>
    )
  }
  
}  
const App = () => {
  const greating ="give feedback"
    // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <div>
       <Header greating={greating} />
        <button onClick={() => setBad(bad + 1)}>        BAD      </button>
        <button onClick={() => setNeutral(neutral + 1)}>NEUTRAL      </button>
        <button onClick={() => setGood(good + 1)}>      GOOD      </button>
        <Statistic bad={bad} neutral={neutral} good={good}></Statistic> 
      </div>
  )
}

export default App