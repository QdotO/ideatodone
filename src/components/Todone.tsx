import React, { useEffect, useState } from 'react'
import Todone from '../types/Todone'
import styled from 'styled-components'
import ProgressBar from './ProgressBar'
import Todo from '../types/Todo'
import { useRouter } from 'next/router'

type Props = {
    todone: Todone
}

const Title = styled.span``
const NextTodoText = styled.span``

const Todone = ({ todone }: Props) => {
    const { title, todos } = todone
    const [total, setTotal] = useState(todos?.length || 0)
    const [current, setCurrent] = useState(0)
    const [nextTodo, setNextTodo] = useState<Todo>()
    const router = useRouter()

    const handleTodoneClick = () => {
        router.push(`/todone/${todone.id}`)
    }

    const handleTodoClick = () => {
        if (nextTodo) {
            router.push(`/todo/${nextTodo?.id}`)
        }
    }

    useEffect(() => {
        setTotal(todos.length)
        todos.forEach((todo) => {
            if (todo.completed || !!todo.completedDatetime) {
                setCurrent((currentValue) => currentValue + 1)
            }
        })
        let firstImcompleteTodo = todos.find(
            (todo) => !todo.completed && !!!todo.completedDatetime
        )
        setNextTodo(firstImcompleteTodo)
    }, [todone, todos])

    return (
        <div>
            <Title onClick={handleTodoneClick}>{title}</Title>
            <ProgressBar current={current} total={total} />
            <NextTodoText onClick={handleTodoClick}>
                {nextTodo?.text}
            </NextTodoText>
        </div>
    )
}

export default Todone
