import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import "./Channels.css";

export const Channels = (props) => {
  const [channels, setChannels] = useState([]);

  const handleChannels = () => {
    if (props.data.channels) {
      setChannels(props.data.channels.map((list) => list.name));
    }
  };

  useEffect(() => {
    handleChannels();
  }, [props.data]);

  return (
    <>
      <Navbar />
      <div className="channel-wrapper">
        <button>left</button>
        <div className="list-container">
          {channels.map((channel, index) => (
            <li key={index}>{channel}</li>
          ))}
        </div>
        <button>right</button>
      </div>
    </>
  );
};
