import "./avengers.style.css";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore/lite";

import React from "react";

function Avengers() {
  const [urlPic, setUrlPic] = useState("");
  const [realName, setRealName] = useState("");
  const [teamName, seteTeamName] = useState("");
  const [card, setCard] = useState([]);

  const getAllInfo = async () => {
    try {
      const avengersCollection = collection(db, "avengers");
      const avengersSnapshot = await getDocs(avengersCollection);

      const dbAvengers = avengersSnapshot.docs.map((doc) => {
        console.log("each item", doc.data(), doc.id);
        return { ...doc.data(), id: doc.id };
      });
      setCard(dbAvengers);
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
    <div className="avengers__input">
      <div className="avengers__input--container">
        <div className="avengers__input--flex">
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
        </div>
      </div>
      <div className="avengers__container">
        {card.map((el, index) => {
          return (
            <div key={index} className="avengers__card">
              <div className="avengers__card--flex">
                <button onClick={() => onDeleteCLick(el.id)}>X</button>
                <img
                  src={el.imgUrl}
                  alt=""
                  style={{ width: "20rem", height: "100%" }}
                />
                <p>{el.realName}</p>
                <p>{el.teamName}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Avengers;
