import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Todo from '../src/types/Todo'
import axios from 'axios'
import useTodones from '../src/hooks/useTodones'
import Todone from '../src/components/Todone'

type Props = {}

const Todonelist = (props: Props) => {
    const { todones, error } = useTodones()

    if (error) return <div>Failed to load user</div>
    if (todones.length === 0) return <div>Loading...</div>

    return (
        <div>
            {todones &&
                todones.length > 0 &&
                todones.map((todone) => {
                    return <Todone key={todone.id} todone={todone} />
                })}
        </div>
    )
}

export default Todonelist
