import type { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../../lib/db'
import {
    addTodone,
    deleteTodone,
    getAllTodones,
    getTodoneById,
    updateTodoneTitle,
} from '../../../src/util/TodoneHandler'

const todoneHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id },
        method,
        body,
    } = req
    let result
    switch (method) {
        case 'GET':
            result = id ? await getTodoneById(id) : await getAllTodones()
            break
        case 'POST':
            result = await addTodone(body.data)
            break
        case 'PUT':
            result = await updateTodoneTitle(body.data.id, body.data.title)
        case 'DELETE':
            result = id !== undefined ? await deleteTodone(id) : false
            break
    }
    return result
}

export default todoneHandler
