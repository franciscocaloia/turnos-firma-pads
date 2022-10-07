import "./App.css";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
  const db = getFirestore();
  const collectionRef = collection(db, "turnos");
  const [turnos, setTurnos] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setTurnos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe;
  }, [collectionRef]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [discapacidad, setDiscapacidad] = useState("");
  const [padSize, setPadSize] = useState("");
  return (
    <div className="App">
      <h1>FIRMA DE PADS A CARIDAD</h1>
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          addDoc(collectionRef, {
            name,
            date: Timestamp.fromDate(new Date(date)),
            discapacidad,
            padSize,
          });
        }}
      >
        <div className="input__container">
          <label>Nombre</label>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="input__container">
          <label>Dia</label>
          <input
            className="input"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <div className="input__container">
          <label>Cual es tu discapacidad?</label>
          <select
            className="input"
            name="discapacidad"
            id="discapacidad"
            onChange={(event) => {
              setDiscapacidad(event.target.value);
            }}
          >
            <option value="">--Elegir una opcion--</option>
            <option value="enano">Mido menos de 1,20 metros</option>
            <option value="grasoso">
              Me chorrea la grasa por cada poro de mi cuerpo
            </option>
            <option value="negro">
              No me veo con un nivel de luz menor a 10
            </option>
          </select>
        </div>
        <div className="input__container">
          <label>Caracteristicas de tu pad</label>
          <select
            className="input"
            name="padSize"
            id="padSize"
            onChange={(event) => {
              setPadSize(event.target.value);
            }}
          >
            <option value="">--Elegir una opcion--</option>
            <option value="enano">
              lo uso de alfombra porque mi mesa esta al mismo nivel que mis pies
            </option>
            <option value="aguirre">soy negro y mi apellido es aguirre</option>
            <option value="orco de mierda">
              Soy un clon de baldu pero todo verde
            </option>
            <option value="grasoso">
              tiene coeficiente de rozamiento 0 gracias a la grasa que desprende
              mi brazo
            </option>
            <option value="tucan">soy cleptomano de oxigeno</option>
            <option value="pelado">
              el 80% de mi peso se concentra en mis tetas
            </option>
            <option value="aguirre">soy negro y mi apellido es aguirre</option>
            <option value="balseiro">
              Literalmente estudio en el balseiro
            </option>
            <option value="negro">
              a veces no encuentro mi mano porque el pad es del mismo tono que
              mi piel
            </option>
          </select>
        </div>
        <button className="form__button">Reservar mi turno</button>
      </form>
      <h2>Lista de turnos</h2>
      <ul className="lista__turnos">
        {turnos.map((turno) => (
          <li className="turno">
            <h3>Nombre del discapacitado: {turno.name}</h3>
            <span className="turno__fecha">
              Fecha del turno: {turno.date.toDate().toISOString().slice(0, 10)}
            </span>
            <span className="turno__discapacidad">
              Discapacidad: {turno.discapacidad}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
