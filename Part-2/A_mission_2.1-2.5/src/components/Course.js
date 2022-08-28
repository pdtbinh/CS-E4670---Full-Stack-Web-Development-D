const Header = (props) => (
    <h1>{props.course}</h1>
  )
  
  const Part = ({part, exercises}) => (
    <p>{part} {exercises}</p>
  )
  
  const Content = ({parts}) => (
    <div>
      {parts.map(part => <Part part={part.name} exercises={part.exercises} key={part.id}/>)}
    </div>
  )
  
  const Total = ({parts}) => (
    <h4>
      total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises
    </h4>
  )
  
  const Course = ({course}) => (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )

  export default Course