import "./App.css";
import { db } from "./firebase";
import { set, ref, onValue, remove, update } from "firebase/database";
import { uid } from "uid";
import { useState, useEffect } from "react";
import "boxicons";

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [tempUuid, setTempUuid] = useState("");

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  }

  // read
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


  // write
  const writeToDatabase = () => {
    const uuid = uid();
    if (todo !== '') {
      set(ref(db, `/${uuid}`), {
        todo,
        uuid,
      });
    }
    setTodo("");
  }

  // update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTempUuid(todo.uuid);
    setTodo(todo.todo);
  }

  // update part 2
  const handleSubmitChange = () => {
    if (todo !== '') {
      update(ref(db, `/${tempUuid}`), {
        todo,
        uuid: tempUuid,
      });
      setIsEdit(false);

      setTodo("");
    }
  }

  // delete
  const handleDelete = (todo) => {
    remove(ref(db, `/${tempUuid}`));
    setIsEdit(false);
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
              setTodo("");
            }}
            >
              <box-icon className="pelao" size="md" name="x" color="white"></box-icon>
            </button>
          </div>
          <div className="inputs-container">
            <div className="nickname-container">
              <label>Nickname</label>
              <input type="text" value={todo} onChange={handleTodoChange} />
            </div>
            <div className="sanction-container">
              <label>Sanción</label>
              <select
              // value={ }
              // onChange={(e) => setAuthor(e.target.value)}
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
              <textarea></textarea>
            </div>
            <div className="staff-container">
              <label>Staff</label>
              <div className="select-wrapper">
                <select
                // value={ }
                // onChange={(e) => setAuthor(e.target.value)}
                >
                  <option value="Console">Console</option>
                  <option value="Temp ban">Ryon</option>
                  <option value="Ban IP">Fanatio</option>
                  <option value="Permanente">Dilong</option>
                  <option value="Mute">Kisin</option>
                  <option value="Temp mute">Sathiel</option>
                  <option value="Temp mute">Skaddi</option>
                  <option value="Temp mute">Lacerannte</option>
                  <option value="Temp mute">Ocaoj</option>
                  <option value="Temp mute">Huumbug</option>
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
              <h1>{todo.todo}</h1>
              <button className="card-update-btn" onClick={() => handleUpdate(todo)}><box-icon type='solid' name='pencil' color="white"></box-icon></button>

            </div>
            <h2 className="card-sanction">%sanction%</h2>
            <p className="card-reason">%reason%</p>
            <div className="card-bottom-container">
              <p className="card-date">%date%</p>
              <p className="card-staff">%staff%</p>
            </div>

          </div>

        ))}
      </div>
      {/* edit */}

      {isEdit ? (
        <div className="new-write-popup">
          <div className="top-container">
            <p className="card-edit-p">Editar registro</p>
            <button className="new-close-btn" onClick={() => handleDelete(todo)}>
              <box-icon name='trash-alt' type='solid' color="white" ></box-icon>
            </button>
            <button className="new-close-btn" onClick={() => {
              setIsEdit(false);
              setTodo("");
            }}
            >
              <box-icon className="pelao" size="md" name="x" color="white"></box-icon>
            </button>
          </div>
          <div className="inputs-container">
            <div className="nickname-container">
              <label>Nickname</label>
              <input type="text" value={todo} onChange={handleTodoChange} />
            </div>
            <div className="sanction-container">
              <label>Sanción</label>
              <select
              // value={ }
              // onChange={(e) => setAuthor(e.target.value)}
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
              <textarea></textarea>
            </div>
            <div className="staff-container">
              <label>Staff</label>
              <div className="select-wrapper">
                <select
                // value={ }
                // onChange={(e) => setAuthor(e.target.value)}
                >
                  <option value="Console">Console</option>
                  <option value="Temp ban">Ryon</option>
                  <option value="Ban IP">Fanatio</option>
                  <option value="Permanente">Dilong</option>
                  <option value="Mute">Kisin</option>
                  <option value="Temp mute">Sathiel</option>
                  <option value="Temp mute">Skaddi</option>
                  <option value="Temp mute">Lacerannte</option>
                  <option value="Temp mute">Ocaoj</option>
                  <option value="Temp mute">Huumbug</option>
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
