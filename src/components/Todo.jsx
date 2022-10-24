import React from 'react'
import useLocalState from '../useLocalState'
import styled from 'styled-components'
import TodoInput from './TodoInput'
import TodoButtons from './TodoButtons'

const TodoContainer = styled.div`
    width: 30vw;
    min-width: 300px;
    height: 30vh;
    min-height: 300px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px 0px rgb(0 0 0 / 75%);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    justify-content: space-between;
`
const TodoText = styled.span`
  font-size: 2rem;
`;

const Todo = (props) => {
    const { item, idx, onCompletedTodo, onDeletedTodo, onEditedTodo } = props
    const [editMode, setEditMode] = useLocalState(`editMode${idx}`, false)
    const [editedTodo, setEditedTodo] = useLocalState(`editTodo${idx}`, '')

    return (
        <TodoContainer>
            <TodoInput
                editMode={editMode}
                item={item}
                setEditedTodo={setEditedTodo}
                editedTodo={editedTodo}
                onCompletedTodo={() => onCompletedTodo(item)}
            />
            {editMode ? null : <TodoText>{item}</TodoText>}
            <TodoButtons
                editMode={editMode}
                setEditMode={setEditMode}
                item={item}
                setEditedTodo={setEditedTodo}
                onDeletedTodo={onDeletedTodo}
                onEditedTodo={onEditedTodo}
                idx={idx}
                editedTodo={editedTodo}
            />
        </TodoContainer>
    )
}

export default Todo

/* {!editMode && (
                <>
                    <input
                        type='checkbox'
                        onChange={() => onCompletedTodo(item)}
                    />
                    {item}
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
            )}
            {editMode && (
                <>
                    <input
                        type='text'
                        value={editedTodo}
                        onChange={(e) => setEditedTodo(e.target.value)}
                    />
                    <button
                        type='button'
                        onClick={() => {
                            onEditedTodo(editedTodo, idx)
                            setEditMode(false)
                        }}
                    >
                        Save
                    </button>
                </>
            )} */
