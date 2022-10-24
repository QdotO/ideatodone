import executeQuery from '../../lib/db'
import { getTodosByTodoneId } from './TodoHandler'
import Todone from '../types/Todone'
import getFormattedDatetime from './getFormattedDatetime'
import Logger from './Logger'
import getFormattedDateTime from './getFormattedDatetime'

/*
Get
Set
Update
Delete
*/
const getAllTodones = async () => {
    const todoneRecords = await executeQuery({
        query: 'SELECT * FROM todos.Titles',
    })

    const todones = todoneRecords.map((todoneRecord: Todone) => {
        const todos = getTodosByTodoneId(`${todoneRecord.id}`)
        return {
            title: todoneRecord.title,
            todos,
        }
    })

    return todones
}

const getTodoneById = async (id: string | string[] | undefined) => {
    if (id) {
        const todone = await executeQuery({
            query: 'SELECT * FROM ideatodone.todone WHERE id=(?)',
            values: [id],
        })
        const todos = getTodosByTodoneId(todone.id)

        return {
            ...todone,
            todos,
        }
    }
}

const addTodone = async (todone: Todone) => {
    const { id, title } = todone

    try {
        const res = await executeQuery({
            query: 'INSERT INTO `ideatodone`.`todone` (`id`, `title`) VALUES (`?`, `?`)',
            values: [id, title],
        })
        Logger({ addTodoneResult: res })
        return true
    } catch (error) {
        Logger({ addTodoneError: JSON.stringify(error, null, 3) })
        return false
    }
}

const updateTodone = async (id: number, field: string, value: any) => {
    const res = await executeQuery({
        query: 'UPDATE `ideatodone`.`todos` SET `?` = `?` WHERE (`id` = `?`)',
        values: [field, value, id],
    })
    return res
}

const updateTodoneTitle = async (id: number, title: string) => {
    const res = await updateTodone(id!, 'title', title)
    return res
}

const deleteTodone = async (id: string | string[]) => {
    let queryId = Array.isArray(id) ? id.toString() : id

    try {
        const result = await updateTodone(
            Number.parseInt(queryId),
            'deletedDatetime',
            getFormattedDateTime()
        )
        Logger({ deleteTodoneResult: result })
        return true
    } catch (error) {
        Logger({ deleteTodoneError: JSON.stringify(error, null, 3) })
        return false
    }
}

export {
    getTodoneById,
    getAllTodones,
    addTodone,
    updateTodoneTitle,
    deleteTodone,
}
