import React, { useState } from 'react'
import TodoList from './TodoList'
import styled from 'styled-components'

const TodoneContainer = styled.div`
    background: white;
    color: black;
`

const Todone = () => {
    const items = [
        'Build a todo list app',
        'show a list of todo items',
        'add create a todo feature',
        'display the created todo at the end of the list',
    ]

    const [todoList, setTodoList] = useState(items)
    const todoPrompt = 'New Todo'
    const [newTodo, setNewTodo] = useState('')
    const [completedList, setCompletedList] = useState([])
    const [deletedList, setDeletedList] = useState([])
    const handleChange = (event) => {
        console.log(event.target.value)
        setNewTodo(event.target.value)
    }
    const onAddTodo = () => {
        const tempList = todoList
        tempList.push(newTodo)
        setNewTodo('')
        setTodoList(tempList)
    }

    const removeTodo = (todo, list, updateList) => {
        const tempList = list
        const newList = tempList.filter((tempTodo) => todo !== tempTodo)
        updateList(newList)
    }

    const addTodo = (todo, list, updateList) => {
        const tempList = list
        tempList.push(todo)
        updateList(tempList)
    }

    const onCompletedTodo = (todo) => {
        removeTodo(todo, todoList, setTodoList)
        addTodo(todo, completedList, setCompletedList)
    }

    const onDeletedTodo = (todo) => {
        removeTodo(todo, todoList, setTodoList)
        addTodo(todo, deletedList, setDeletedList)
    }

    const onRestoredTodo = (todo) => {
        removeTodo(todo, deletedList, setDeletedList)
        addTodo(todo, todoList, setTodoList)
    }

    const editTodo = (todo, idx, list, updateList) => {
        const tempList = list
        tempList[idx] = todo
        updateList([...tempList])
    }

    const onEditedTodo = (todo, idx) => {
        editTodo(todo, idx, todoList, setTodoList)
    }
    return (
        <TodoneContainer>
            <h1>Todo List</h1>
            {/* Add New Todo */}
            <div>
                <input
                    type='text'
                    placeholder={todoPrompt}
                    onChange={handleChange}
                    value={newTodo}
                />
                <button onClick={onAddTodo}>Add New Todo</button>
            </div>
            {/* Display Todo's */}
            <TodoList
                todoList={todoList}
                onCompletedTodo={onCompletedTodo}
                onDeletedTodo={onDeletedTodo}
                onEditedTodo={onEditedTodo}
            />
            {/* Display completed Todo List */}
            {completedList.length > 0 && (
                <div>
                    <h2>Completed Todo List</h2>
                    <ul>
                        {completedList.map((todo, idx) => (
                            <li key={`Completed${idx}`}>{todo}</li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Display deleted Todo List */}
            {deletedList.length > 0 && (
                <div>
                    <h2>Deleted Todo List</h2>
                    <ul>
                        {deletedList.map((todo, idx) => (
                            <li key={`Deleted${idx}`}>
                                {todo}{' '}
                                <button
                                    type='button'
                                    onClick={() => {
                                        onRestoredTodo(todo)
                                    }}
                                >
                                    Undelete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </TodoneContainer>
    )
}

export default Todone
