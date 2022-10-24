interface Todo {
    id: number
    draftText?: string
    completedDatetime?: string
    deletedDatetime?: string
    createDatetime?: string
    text: string
    todoneId: number
    completed?: boolean
}

export default Todo
