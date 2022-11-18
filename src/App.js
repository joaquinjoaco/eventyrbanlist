import "./App.css";
import { db } from "./firebase";
import { set, ref, onValue, remove, update } from "firebase/database";
import { uid } from "uid";
import { useState, useEffect } from "react";
import "boxicons";

function App() {

  const [todos, setTodos] = useState([]);
  const [nickname, setNickname] = useState("");
  const [sanction, setSanction] = useState("Aviso");
  const [reason, setReason] = useState("");
  const [staff, setStaff] = useState("Console");

  const [isEdit, setIsEdit] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [tempUuid, setTempUuid] = useState("");

  // const handleTodoChange = (e) => {
  //   setNickname(e.target.value);
  // }

  // const handleSanctionChange = (e) => {
  //   setSanction(e.target.value);
  // }


  // read the database and set the "todo" objects in the "todos" Array
  useEffect(() => {
    onValue(ref(db), snapshot => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).forEach(item => {
          setTodos(oldArray => [...oldArray, item]);
        });
      }
    });
  }, []);


  // write to the database
  const writeToDatabase = () => {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const fullDate = `${date}/${month < 10 ? `0${month}` : `${month}`}/${year}`;
    console.log({ fullDate });

    const uuid = uid();

    if (nickname !== '') {
      set(ref(db, `/${uuid}`), {
        nickname,
        sanction,
        reason,
        staff,
        fullDate,
        uuid,
      });
    }
    setNickname("");
    setSanction("Aviso");
    setReason("");
    setStaff("Console");
  }

  // update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTempUuid(todo.uuid);
    setNickname(todo.nickname);
    setSanction(todo.sanction);
    setReason(todo.reason);

  }

  // update part 2
  const handleSubmitChange = () => {
    if (nickname !== '') {
      update(ref(db, `/${tempUuid}`), {
        nickname,
        sanction,
        reason,
        staff,
        uuid: tempUuid,
      });

      setIsEdit(false);
      // state?
    }
  }

  // delete
  const handleDelete = () => {
    remove(ref(db, `/${tempUuid}`));
    setIsEdit(false);
    setNickname("");
    setSanction("Aviso");
    setReason("");
    setStaff("Console");
  };


  return (
    <div className="App">

      <nav>
        <img src="/images/logoEgoodQ.png" alt="eventyr logo" className="eventyr-logo" />
        {/* Shows the inputs onClick. */}
        <button className="add-button" onClick={
          () => {
            setIsHidden(false);
          }
        }>
          Nuevo
        </button>
      </nav>
      {/* hidden inputs that show when the user clicks on the "New" button */}
      {isHidden ? (
        <></>
      ) : (
        <div className="new-write-popup">
          <div className="top-container">
            <p>Nuevo registro</p>
            <button className="new-close-btn" onClick={() => {
              setIsHidden(true);
              setNickname("");
              setSanction("Aviso");
              setReason("");
              setStaff("Console");
            }}
            >
              <box-icon className="pelao" size="md" name="x" color="white"></box-icon>
            </button>
          </div>
          <div className="inputs-container">
            <div className="nickname-container">
              <label>Nickname</label>
              <input type="text" value={nickname} onChange={(e) => { setNickname(e.target.value) }} />
            </div>
            <div className="sanction-container">
              <label>Sanción</label>
              <select
                value={sanction}
                onChange={(e) => { setSanction(e.target.value) }}
              >
                <option value="Aviso">Aviso</option>
                <option value="Temp ban">Temp ban</option>
                <option value="Ban IP">Ban IP</option>
                <option value="Permanente">Permanente</option>
                <option value="Mute">Mute</option>
                <option value="Temp mute">Temp mute</option>
              </select>
            </div>
            <div className="reason-container">
              <label>Razón</label>
              <textarea value={reason} onChange={(e) => { setReason(e.target.value) }}></textarea>
            </div>
            <div className="staff-container">
              <label>Staff</label>
              <div className="select-wrapper">
                <select
                  value={staff}
                  onChange={(e) => { setStaff(e.target.value) }}
                >
                  <option value="Console">Console</option>
                  <option value="Ryon">Ryon</option>
                  <option value="Fanatio">Fanatio</option>
                  <option value="Dilong">Dilong</option>
                  <option value="Kisin">Kisin</option>
                  <option value="Sathiel">Sathiel</option>
                  <option value="Skaddi">Skaddi</option>
                  <option value="Lacerannte">Lacerannte</option>
                  <option value="Huumbug">Huumbug</option>
                  <option value="Ocaoj">Ocaoj</option>
                </select>
              </div>
            </div>
            <button className="new-submit-btn" onClick={() => { writeToDatabase(); setIsHidden(true); }}>Añadir</button>
          </div>
        </div>
      )}




      <div className="cards-wrapper">
        {todos.map((todo) => (



          <div className="card" key={todo.uuid}>
            <div className="card-top-container">
              <h1>{todo.nickname}</h1>
              <button className="card-update-btn" onClick={() => handleUpdate(todo)}><box-icon type='solid' name='pencil' color="white"></box-icon></button>

            </div>
            <h2 className="card-sanction">{todo.sanction}</h2>
            <p className="card-reason">{todo.reason}</p>
            <div className="card-bottom-container">
              <p className="card-date">{todo.fullDate}</p>
              <p className="card-staff">{todo.staff}</p>
            </div>

          </div>

        ))}
      </div>




      {/* edit */}
      {isEdit ? (
        <div className="new-write-popup">
          <div className="top-container">
            <p className="card-edit-p">Editar registro</p>
            <button className="new-close-btn" onClick={() => handleDelete()}>
              <box-icon name='trash-alt' type='solid' color="white" ></box-icon>
            </button>
            <button className="new-close-btn" onClick={() => {
              setIsEdit(false);
              setNickname("");
              setSanction("Aviso");
              setReason("");
              setStaff("Console");
            }}
            >
              <box-icon className="pelao" size="md" name="x" color="white"></box-icon>
            </button>
          </div>
          <div className="inputs-container">
            <div className="nickname-container">
              <label>Nickname</label>
              <input type="text" value={nickname} onChange={(e) => { setNickname(e.target.value) }} />
            </div>
            <div className="sanction-container">
              <label>Sanción</label>
              <select
                value={sanction}
                onChange={(e) => { setSanction(e.target.value) }}
              >
                <option value="Aviso">Aviso</option>
                <option value="Temp ban">Temp ban</option>
                <option value="Ban IP">Ban IP</option>
                <option value="Permanente">Permanente</option>
                <option value="Mute">Mute</option>
                <option value="Temp mute">Temp mute</option>
              </select>
            </div>
            <div className="reason-container">
              <label>Razón</label>
              <textarea value={reason} onChange={(e) => { setReason(e.target.value) }}></textarea>
            </div>
            <div className="staff-container">
              <label>Staff</label>
              <div className="select-wrapper">
                <select
                  value={staff}
                  onChange={(e) => { setStaff(e.target.value) }}
                >
                  <option value="Console">Console</option>
                  <option value="Ryon">Ryon</option>
                  <option value="Fanatio">Fanatio</option>
                  <option value="Dilong">Dilong</option>
                  <option value="Kisin">Kisin</option>
                  <option value="Sathiel">Sathiel</option>
                  <option value="Skaddi">Skaddi</option>
                  <option value="Lacerannte">Lacerannte</option>
                  <option value="Huumbug">Huumbug</option>
                  <option value="Ocaoj">Ocaoj</option>
                </select>
              </div>
            </div>
            <button className="new-submit-btn" onClick={handleSubmitChange}>Editar</button>

          </div>
        </div>
      ) : (
        <>
        </>
      )}
    </div >
  );
}

export default App;
