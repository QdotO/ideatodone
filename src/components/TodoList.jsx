import React from 'react'
import Todo from './Todo'
import styled from 'styled-components'

const TodoListContainer = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`

const TodoList = ({
    todoList,
    onCompletedTodo,
    onDeletedTodo,
    onEditedTodo,
}) => (
    <TodoListContainer>
        {todoList.map((item, idx) => (
            <Todo
                key={`TodoList${idx}`}
                item={item}
                idx={idx}
                onCompletedTodo={onCompletedTodo}
                onDeletedTodo={onDeletedTodo}
                onEditedTodo={onEditedTodo}
            />
        ))}
    </TodoListContainer>
)

export default TodoList
