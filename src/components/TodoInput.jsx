import React from 'react'
import styled from 'styled-components'

const TodoCheckbox = styled.input`
    align-self: flex-start;
    height: 40px;
    width: 40px;
`

const TodoEditText = styled.input``

const TodoInput = ({
    editMode,
    onCompletedTodo,
    setEditedTodo,
    editedTodo,
    item,
}) => {
    const renderedInput = !editMode ? (
        <TodoCheckbox type='checkbox' onChange={() => onCompletedTodo(item)} />
    ) : (
        <TodoEditText
            type='text'
            value={editedTodo}
            onChange={(e) => setEditedTodo(e.target.value)}
        />
    )

    return <>{renderedInput}</>
}

export default TodoInput
