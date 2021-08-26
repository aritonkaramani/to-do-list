import './App.scss';
import React, { useState , useRef, useEffect } from 'react';
import TodoList from './components/todo-list/TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos,setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleTodoAdd(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null;
  }

  function handleClearTodo(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function handleReset(){
    const newTodo = []
    setTodos(newTodo)
  }

  function onEnterPress(e){
    if(e.keyCode === 13)
    handleTodoAdd(e)

 }

  return (
    <div className="App">
      <div className="wrapper">
        <h1>TODO</h1>
      <div className="inputs">
        <input ref={todoNameRef} type="text" onKeyDown={onEnterPress}/>
        <div className="buttons">
          <div className="clicks" onClick={handleTodoAdd}>Add</div>
          <div className="clicks" onClick={handleClearTodo}>Delete Task</div>
          <div className="clicks" onClick={handleReset}>Reset</div>
        </div>
          
      </div>
      
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      </div>
    </div>
  );
}

export default App;
