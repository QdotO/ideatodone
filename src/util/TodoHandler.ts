import executeQuery from '../../lib/db'
import Logger from './Logger'
import getFormattedDateTime from './getFormattedDatetime'
import Todo from '../types/Todo'

const getTodoById = async (id: string | string[] | undefined) => {
    if (id) {
        const todo = await executeQuery({
            query: 'SELECT * FROM todos.Todos WHERE id=(?)',
            values: [id],
        })
        Logger(
            `Retrieve a todo by ID of ${id}: ${JSON.stringify(todo, null, 3)}`
        )
    }
}

const getTodosByTodoneId = async (id: string | string[] | undefined) => {
    if (id) {
        const todos = await executeQuery({
            query: 'SELECT * FROM todos.Todos WHERE titleFK=(?)',
            values: [id],
        })
        Logger(
            `Retrieve a todos by  Todone ID of ${id}: ${JSON.stringify(
                todos,
                null,
                3
            )}`
        )
    }
}

const addTodo = async (todo: Todo) => {
    const { id, todoneId, text, completed } = todo

    const completedDatetime = completed ? getFormattedDateTime() : null
    try {
        const res = await executeQuery({
            query: 'INSERT INTO `ideatodone`.`todos` (`id`, `todoneIDFK`, `text`, `completedDatetime`) VALUES (`?`, `?`, `?`, `?`)',
            values: [id, todoneId, text, completedDatetime],
        })
        Logger({ addTodoResult: res })
        return true
    } catch (error) {
        Logger({ addTodoError: JSON.stringify(error, null, 3) })
        return false
    }
}

const updateTodo = async ({
    text,
    completedDatetime,
    deletedDatetime,
    draftText,
    id,
}: Todo) => {
    const res = await executeQuery({
        query: "UPDATE `ideatodone`.`todos` SET `text` = '?', `completedDatetime` = `?`, `deletedDatetime` = `?`, `draftText` = '?' WHERE (`id` = '?')",
        values: [text, completedDatetime, deletedDatetime, draftText, id],
    })
    return res
}

const updateTodoField = async (id: number, field: string, value: any) => {
    const res = await executeQuery({
        query: "UPDATE `ideatodone`.`todos` SET `?` = '?', WHERE (`id` = '?')",
        values: [field, value, id],
    })
    return res
}

const completeTodo = async (id: number) => {
    try {
        const result = await updateTodoField(
            id,
            'completedDatetime',
            getFormattedDateTime()
        )
        Logger({ completeTodoResult: result })
        return true
    } catch (error) {
        Logger({ completeTodoError: JSON.stringify(error, null, 3) })
        return false
    }
}

const deleteTodo = async (id: string | string[]) => {
    let queryId = Array.isArray(id) ? id.toString() : id
    try {
        const result = await updateTodoField(
            Number.parseInt(queryId),
            'deletedDatetime',
            getFormattedDateTime()
        )
        Logger({ deleteTodoResult: result })
        return true
    } catch (error) {
        Logger({ completeTodoError: JSON.stringify(error, null, 3) })
        return false
    }
}

const editTodoText = async ({ id, text }: { id: number; text: string }) => {
    try {
        const result = await updateTodoField(id, 'text', text)
        Logger({ editTodoTextResult: result })
        return true
    } catch (error) {
        Logger({ editTodoTextError: JSON.stringify(error, null, 3) })
        return false
    }
}

const saveEditedTodoText = async ({
    id,
    draftText,
}: {
    id: number
    draftText: string
}) => {
    try {
        const result = await updateTodoField(id, 'draftText', draftText)
        Logger({ saveEditedTodoTextResult: result })
        return true
    } catch (error) {
        Logger({ saveEditedTodoTextError: JSON.stringify(error, null, 3) })
        return false
    }
}

const getQueryId = (id: string | string[]) => {
    let queryId = Array.isArray(id) ? id.toString() : id
    return Number.parseInt(queryId)
}

export {
    getTodoById,
    getTodosByTodoneId,
    completeTodo,
    deleteTodo,
    addTodo,
    editTodoText,
    saveEditedTodoText,
    updateTodo,
}
