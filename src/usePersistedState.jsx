import { useEffect, useState } from 'react';
import axios from 'axios';
import useLocalState from './useLocalState';

const backendUrl = 'api/todos';
const userIdPostFix = `?userId=`;

function usePersistedState(userId, initial) {
  const [value, setValue] = useState(async () => {
    let todoList = await axios
      .get(`${backendUrl}`)
      .then((response) => response.list);
    if (todoList) return todoList;
    return initial;
  });

  useEffect(() => {
    const body = {
      userId,
      value,
    };
    const sendToBackend = async () => {
      const response = await axios.post(`${backendUrl}`, body);
      if (response.status === '200') {
        console.log('Persisted TodoList successfully');
        return;
      }
      console.log('Persisted TodoList unsuccessful!!!!');
    };
    sendToBackend();
  }, [value]);
  return [value, setValue];
}

export default usePersistedState;

// const documentStore = {
//      userId: userID,
//      todoList: [],
//      completedTodoList: [],
//      deletedTodoList: []
// }

// const todo = {
//      value
//      createdAt: new Date(),
//      history: []
// }
