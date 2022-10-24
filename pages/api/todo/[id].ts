import type { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../../lib/db'
import Todo from '../../../src/types/Todo'
import {
    addTodo,
    deleteTodo,
    editTodoText,
    getTodoById,
    saveEditedTodoText,
    updateTodo,
} from '../../../src/util/TodoHandler'

const todoHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id, name, field },
        method,
        body,
    } = req
    let result
    switch (method) {
        case 'GET':
            result = await getTodoById(id)
            break
        case 'POST':
            result = await addTodo(body.data)
            break
        case 'PUT':
            result = await updateTodo(body.data)
        case 'DELETE':
            result = id !== undefined ? await deleteTodo(id) : false
            break
    }
    res.send(result)
}

export default todoHandler
