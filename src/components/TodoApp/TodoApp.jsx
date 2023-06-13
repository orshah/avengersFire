import "./todoApp.style.css";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore/lite";

import React from "react";

function TodoApp() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);

  const getAllTodos = async () => {
    try {
      const todosCollection = collection(db, "todolist");
      const todosSnapshot = await getDocs(todosCollection);

      const dbTodoList = todosSnapshot.docs.map((doc) => {
        console.log("each item", doc.data(), doc.id);
        return { ...doc.data(), id: doc.id };
      });
      setList(dbTodoList);
      console.log("todoList", dbTodoList);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const onChangeHandler = (e) => {
    setTodo(e.target.value);
  };

  const onCheckboxClick = async (todoId) => {
    const updatingTodo = doc(db, "todolist", todoId);
    await setDoc(updatingTodo, { isComplited: true }, { merge: true });
    await getAllTodos();
  };

  const onDeleteCLick = async (todoId) => {
    try {
      await deleteDoc(doc(db, "todolist", todoId));
      await getAllTodos();
    } catch (err) {
      console.log("error");
    }
  };

  const onAddBtnClick = async () => {
    try {
      const addingTodo = {
        text: todo,
        isComplited: false,
      };
      const todosCollection = collection(db, "todolist");
      await addDoc(todosCollection, addingTodo);
      setTodo("");
      await getAllTodos();
    } catch (err) {
      console.log("err:", err);
    }
  };
  return (
    <div className="todo-container">
      <input type="text" value={todo} onChange={onChangeHandler} />

      <button onClick={onAddBtnClick}>ADD</button>
      <div>
        {list.map((el, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                checked={el.isComplited}
                onChange={() => onCheckboxClick(el.id)}
              />
              <span>{el.text}</span>
              <button onClick={() => onDeleteCLick(el.id)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodoApp;
