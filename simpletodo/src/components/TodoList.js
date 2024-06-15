import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./Firebase";

function TodoList({ selectedDate }) {
  const [todos, setTodos] = useState([]);
  const dateString = selectedDate.toDateString();

  useEffect(() => {
    const fetchTodos = async () => {
      const todosCollection = collection(db, "todos");
      const q = query(todosCollection, where("date", "==", dateString));
      const todosSnapshot = await getDocs(q);
      const todosList = todosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTodos(todosList);
    };

    fetchTodos();
  }, [selectedDate, dateString]); // Include dateString in the dependency array

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      // Update todos state to remove the deleted todo
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <div className="w-3/4 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-500 p-4">
        <strong className="text-white text-lg">Todos for {dateString}</strong>
      </div>
      <div className="p-4">
        {todos.length === 0 ? (
          <div className="text-gray-700">No todos for {dateString}</div>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className="mb-4 bg-gray-100 rounded-lg p-4 flex justify-between items-center">
              <div>
                <strong className="text-gray-700 text-base mb-2">{todo.type}</strong>
                <div>
                  <span className="ml-2 text-gray-900">{todo.todo}</span>
                </div>
              </div>
              <button className="text-red-600 px-2 py-1 rounded hover:bg-red-600 hover:text-white" onClick={() => deleteTodo(todo.id)}>Delete</button>
             
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;
