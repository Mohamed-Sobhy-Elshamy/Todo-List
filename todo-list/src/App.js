import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import './App.css';
import Todo from './components/Todo';

const App = () => {
  let [todos, setTodos] = useState([]);
  const [todoToShow, setTodoToShow] = useState("all");
  const [toggleAllComplete, setToggleAllComplete] = useState(true);

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  const handleDelete = (id) =>{
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const updateTodoToShow = (s) =>{
    setTodoToShow(s);
  }

  const toggleComplete = (id) =>{
    setTodos(
      todos.map((todo)=> {
        if(todo.id === id){
          return{
            ...todo,
            complete: !todo.complete,
          }
        } else{
          return todo;
        }
      })
    )
  }

  const removeAllTodosThatAreCompletes = () => {
    setTodos(todos.filter((todo) => !todo.complete))
  }   

  if (todoToShow === "active") {
    todos = todos.filter((todo) => !todo.complete)
  } else if (todoToShow === "complete"){
    todos = todos.filter((todo) => todo.complete)
  }

  return(
    <div>
      <TodoForm onSubmit={addTodo} />
      {
        todos.map((todo) => (
          <Todo key={todo.id} todo={todo} onDelete={() => handleDelete(todo.id)} 
          toggleComplete = {() => toggleComplete(todo.id)} />
        ))
      }
      <div className='container btns'>
        <button className='updata-btn btn' onClick={() => updateTodoToShow("all")}>All</button>
        <button className='updata-btn btn' onClick={() => updateTodoToShow("active")}>Active</button>
        <button className='updata-btn btn' onClick={() => updateTodoToShow("complete")}>Complete</button>
      </div>
      <div className='container'>
      <button className='toggle-btn' onClick={removeAllTodosThatAreCompletes}>Remove all complete todos</button>
      <button className='toggle-btn' onClick={() =>{
        setTodos(
          todos.map((todo) =>({
            ...todo,
            complete: toggleAllComplete,
          }))
          )
          setToggleAllComplete(!toggleAllComplete)
      }}>toggle all completes :{`${toggleAllComplete}`}</button>
      </div>
    </div>
  )
}

export default App;