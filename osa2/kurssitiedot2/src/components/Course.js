import React from 'react'
const Header = ({name}) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  const Header2 = ({name}) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
  }
   const Content = ({content}) => {
    return (
        <ul>
        {content.map(note => 
          <li key={note.id}>
            {note.name} {note.exercises}
          </li>
        )}
      </ul>
    )
  } 
  const Total = ({content}) => {
      var totalAmount=content.reduce(function(sum,part){
          return sum+part.exercises
      },0)
    return (
      <div>
        <h4>Total of {totalAmount} exercises</h4>
      </div>
    )
  }
const CourseParts = ({course,k}) => {
    //console.log("komponentissa Course")
    //console.log("kurssin nimi ",course.name)
    //console.log("map id ",k)
    //console.log("osan 0 nimi ",course.parts[0].name)
    //console.log("osan 1 nimi ",content[1].name)
    return (
        <div key={k}>
                <Header2 name={course.name}/>
                <Content content={course.parts}/> 
                {/* <div>
                  <ul >
                  {course.parts.map(c => 
                    <li key={c.id}>
                        {c.name} 
                        {c.exercises}
                    </li>
                    )}
                  </ul>
                </div>  */}
                <Total content={course.parts}/>
        </div>
    )
}
const CourseModule = ({ courses }) => {
    //console.log("kurssin nimi ",courses[0].name)
    //console.log("osan 0 nimi ",courses[0].parts[3].name)
    return (
        <div>
            {courses.map((c,cIndex) =>
                <div key={cIndex}>
                  <CourseParts course={c} k={cIndex}/>
                </div>
            )}
        </div>
    )
}
const Course=({courses}) =>{
    return (
        <div>
            <Header name="Web development curriculum" />
            <CourseModule courses={courses}/>
         </div>
    )
}

export default Course