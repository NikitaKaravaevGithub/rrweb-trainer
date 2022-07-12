import React, { useEffect } from "react";

import { record } from "rrweb";
import rrwebPlayer from "rrweb-player";

import { eventWithTime } from "rrweb/typings/types";

import logo from "./logo.svg";
import "./App.css";
import "./Rrweb.scss";

interface af {
  recordings: eventWithTime[];
}

const RecordingsPlayer = ({ recordings }: af) => {
  const playerId = "player";

  useEffect(() => {
    const target = document.getElementById(playerId) as HTMLElement;
    target.innerHTML = "";

    if (recordings.length < 2) {
      return;
    }

    try {
      new rrwebPlayer({
        target,
        props: {
          events: recordings,
          showController: true,
          width: 928,
          height: 500,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }, [recordings]);

  return <div id={playerId} style={{ margin: "auto" }} />;
};

function App() {
  const [events, setEvents] = React.useState<eventWithTime[]>([]);
  const [copyEvents, setCopyEvents] = React.useState<eventWithTime[]>([]);

  const handleStartRecord = () => {
    let stopFn = record({
      emit(event) {
        setEvents((prev) => [...prev, event]);
        if (events.length > 10) {
          // stop after 100 events
          stopFn?.();
        }
      },
    });
  };

  // const handleStartRecordd = () => {
  //   stopFn = record({
  //     emit(event) {
  //       setEvents((prev) => [...prev, event]);
  //       if (events.length > 10) {
  //         stopFn();
  //       }
  //     },
  //   });
  // };

  const handleStopRecord = () => {
    setCopyEvents((prev) => [...prev, ...events]);
    setEvents([]);
  };

  console.log("events: ", events);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleStartRecord}>Start record</button>
        <button onClick={handleStopRecord}>Stop record</button>
      </header>
      <RecordingsPlayer recordings={copyEvents} />
    </div>
  );
}

export default App;
