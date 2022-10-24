import React from 'react'
import { useRouter } from 'next/router'
import useSwr from 'swr'
import Todo from '../../src/types/Todo'

type Props = {}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TodoPage = (props: Props) => {
  const router = useRouter()
  const { data, error } = useSwr<Todo>(
    router.query.id ? `/api/todo/${router.query.id}` : null,
    fetcher
  )

  if (error) return <div>Failed to load user</div>
  if (!data) return <div>Loading...</div>

  return <div>{data.text}</div>
}

export default TodoPage;