// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../lib/db'
import Todo from '../../src/types/Todo'

const handleRequest = async (req: NextApiRequest) => {
    const { method, body } = req
    let result: any[]

    try {
        switch (method) {
            case 'GET':
                result = await executeQuery({
                    query: 'SELECT * FROM ideatodone.todos;',
                })
            default:
                result = []
        }
        return result
    } catch (error) {
        console.log(`Todos app DB ${method} handler error`)
        console.log(error)
        return null
    }
}

const TodosHandles = async (
    req: NextApiRequest,
    res: NextApiResponse<Todo[]>
) => {
    const result = await handleRequest(req)
    if (result) {
        console.log({ TodosRequest: req })
        console.log({ FirstRecord: result[0] })
        console.log({ result })

        res.status(200).json(result)
        return
    }
    res.status(500).end('Todos API error')
}

export default TodosHandles
