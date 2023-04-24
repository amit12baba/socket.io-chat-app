import "./App.css";
import { useState } from "react";
import Chat from "./Chat";
import { socket } from "./socket";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      console.log({ username, room });
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="App">
      {/* <JoinChat /> */}
      <div className="joinChatContainer">
        <h3>Join A Chat</h3>
        <input
          type="text"
          placeholder="John..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Room ID..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join A Room</button>
      </div>

      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
