import "./avengers.style.css";
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

function Avengers() {
  const [info, setInfo] = useState("");
  const [list, setList] = useState([]);

  const getAllInfo = async () => {
    try {
      const avengersCollection = collection(db, "avengers");
      const avengersSnapshot = await getDocs(avengersCollection);

      const dbAvengers = avengersSnapshot.docs.map((doc) => {
        console.log("each item", doc.data(), doc.id);
        return { ...doc.data(), id: doc.id };
      });
      setList(dbAvengers);
      console.log("todoList", dbAvengers);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getAllInfo();
  }, []);

  const onChangeHandler = (e) => {
    setInfo(e.target.value);
  };

  //   const onCheckboxClick = async (todoId) => {
  //     const updatingTodo = doc(db, "todolist", todoId);
  //     await setDoc(updatingTodo, { isComplited: true }, { merge: true });
  //     await getAllTodos();
  //   };

  const onDeleteCLick = async (infoId) => {
    try {
      await deleteDoc(doc(db, "avengers", infoId));
      await getAllInfo();
    } catch (err) {
      console.log("error");
    }
  };

  const onAddBtnClick = async () => {
    try {
      const addingInfo = {
        imgUrl: info,
      };
      const avengersCollection = collection(db, "avengers");
      await addDoc(avengersCollection, addingInfo);
      setInfo("");
      await getAllInfo();
    } catch (err) {
      console.log("err:", err);
    }
  };
  return (
    <div className="info-container">
      <input type="text" value={info} onChange={onChangeHandler} />
      <button onClick={onAddBtnClick}>ADD</button>
      <div>
        {list.map((el, index) => {
          return (
            <div key={index}>
              <img src={el.imgUrl} alt="student" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Avengers;
