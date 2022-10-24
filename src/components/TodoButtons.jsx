import React from 'react'
import styled from 'styled-components'
const ButtonContainer = styled.div`
    display: flex;
`

const TodoButtons = ({
    editMode,
    setEditedTodo,
    item,
    setEditMode,
    onDeletedTodo,
    onEditedTodo,
    editedTodo,
    idx,
}) => {
    const renderedButtons = !editMode ? (
        <>
            <button
                type='button'
                value='Edit'
                onClick={() => {
                    setEditedTodo(item)
                    setEditMode(true)
                }}
            >
                Edit
            </button>
            <button type='button' onClick={() => onDeletedTodo(item)}>
                Delete
            </button>
        </>
    ) : (
        <button
            type='button'
            onClick={() => {
                onEditedTodo(editedTodo, idx)
                setEditMode(false)
            }}
        >
            Save
        </button>
    )

    return <ButtonContainer>{renderedButtons}</ButtonContainer>
}

export default TodoButtons
