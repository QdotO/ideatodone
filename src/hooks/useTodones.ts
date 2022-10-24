import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Todone from '../types/Todone'
import Error from 'next/error'

const useTodones = () => {
    const [todones, setTodones] = useState<Todone[]>([])
    const [error, setError] = useState<unknown>()
    useEffect(() => {
        const controller = new AbortController()
        try {
            const doWork = async () => {
                const results = await axios
                    .get<Todone[]>('/api/todones/', {
                        signal: controller.signal,
                    })
                    .catch((error) => {
                        throw new Error(error.message)
                    })
                setTodones(results.data)
            }
            doWork()
        } catch (error) {
            setError(error)
        }

        return () => {
            controller.abort()
        }
    }, [])

    return {
        todones,
        error,
    }
}

export default useTodones
