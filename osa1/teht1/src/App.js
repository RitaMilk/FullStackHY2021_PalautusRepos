import React from 'react'
const Header = ({course}) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}
/* const Part = ({part}) => {
  //console.log("Part componet...")
    //console.log({part})
   return(
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
} */
const Part = (props) => {
  //console.log("Part componet...")
    //console.log({part})
   return(
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  )
}
/* const Content = ({parts}) => {
  //console.log("Content componet...")
  console.log(parts)
  return (
    <div>
      <Part part = {parts[0]} />
      <Part part = {parts[1]} />
      <Part part = {parts[2]} />
    </div>
  )
} */
const Content = ({parts}) => {
  //console.log("Content componet...")
  console.log(parts)
  return (
    <div>
      <Part name = {parts[0].name} exercises={parts[0].exercises}/>
      <Part name = {parts[1].name} exercises={parts[1].exercises}/>
      <Part name = {parts[2].name} exercises={parts[2].exercises}/>
      
    </div>
  )
}
const Total = ({parts}) => {
  return (
    <div>
      <p>Number of exercises {parts[0].exercises+parts[1].exercises+parts[2].exercises}</p>
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App