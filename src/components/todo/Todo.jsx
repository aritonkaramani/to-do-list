import React from 'react'
import './todo.scss';

export default function Todo({ todo, toggleTodo }) {

    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    return (
        <div className="todowrapper">
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
                {handleTodoClick}
                {todo.name}
                
            </label>

            
        </div>
    )
}
