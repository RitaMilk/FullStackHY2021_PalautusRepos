import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

/* const promise = axios.get('http://localhost:3001/persons')
promise.then(response => {
  console.log(response)
})  */
 /* axios
  .get('http://localhost:3001/persons')
  .then(response => {
  const persons = response.data
  console.log("respons data:",persons)
  ReactDOM.render(
    <App />, 
    document.getElementById('root')
  )
})  */
//console.log(promise)
 ReactDOM.render(
  <App />, 
  document.getElementById('root')
) 