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
  const [urlPic, setUrlPic] = useState("");
  const [realName, setRealName] = useState("");
  const [teamName, seteTeamName] = useState("");
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
      console.log("avengers", dbAvengers);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getAllInfo();
  }, []);

  const onChangeHandlerPic = (e) => {
    setUrlPic(e.target.value);
  };
  const onChangeHandlerReal = (e) => {
    setRealName(e.target.value);
  };
  const onChangeHandlerTeam = (e) => {
    seteTeamName(e.target.value);
  };

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
        imgUrl: urlPic,
        realName: realName,
        teamName: teamName,
      };
      const avengersCollection = collection(db, "avengers");
      await addDoc(avengersCollection, addingInfo);
      setUrlPic("");
      await getAllInfo();
    } catch (err) {
      console.log("err:", err);
    }
  };
  return (
    <div className="info-container">
      <input
        placeholder="input Link"
        type="text"
        value={urlPic}
        onChange={onChangeHandlerPic}
      />
      <input
        placeholder="input Real Name"
        type="text"
        value={realName}
        onChange={onChangeHandlerReal}
      />
      <input
        placeholder="input Team Name"
        type="text"
        value={teamName}
        onChange={onChangeHandlerTeam}
      />
      <button onClick={onAddBtnClick}>ADD</button>
      <div>
        {list.map((el, index) => {
          return (
            <div key={index}>
              <img src={el.imgUrl} alt="" style={{ width: "350px" }} />
              <p>{el.realName}</p>
              <p>{el.teamName}</p>
              <button onClick={() => onDeleteCLick(el.id)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Avengers;
