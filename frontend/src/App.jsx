import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";
import Sign from "./components/Sign";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [auth, setAuth] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('')
  var token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios
        .get(`${baseURL}/get/` + JSON.parse(token))
        .then((res) => {
          if (res.data.status == 'true') {
            setToDos(res.data.toDos.notes);
            setUserId(res.data.toDos._id)
            setLoggedIn(true)
          }
        })
        .catch((err) => console.log(err));
    }
  }, [updateUI]);

  const saveToDo = () => {
    if (!loggedIn) {
      return alert('Please Login to continue');
    }
    axios
      .post(`${baseURL}/save`, { toDo: input, userId })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput("");
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false)
  }

  return (
    <main>
      <div className="container">

        <div className="header">
          {
            loggedIn ?
              <h1 onClick={handleLogout}>LogOut</h1>
              :
              auth ?
                <h1 onClick={() => setAuth(!auth)}>Go To Home</h1>
                :
                <h1 onClick={() => setAuth(!auth)}>SignIn/SignUp</h1>
          }
        </div>
        {
          auth ?
            <Sign />
            :
            <>
              <div className="input_holder">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  placeholder="Add a ToDo..."
                />
                <button onClick={saveToDo}>Add</button>
              </div>

              <div className="list">
                {toDos.map((el) => (
                  <ToDo
                    userId={userId}
                    key={el._id}
                    text={el.toDo}
                    id={el._id}
                    setUpdateUI={setUpdateUI}
                    setShowPopup={setShowPopup}
                    setPopupContent={setPopupContent}
                  />
                ))}
              </div>
            </>
        }
      </div>
      {showPopup && (
        <Popup
          userId={userId}
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
    </main>
  );
};

export default App;
