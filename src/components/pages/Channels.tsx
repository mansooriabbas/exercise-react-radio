import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import "./Channels.css";

export const Channels = (props) => {
  const [channels, setChannels] = useState([]);


  const handleChannels = () => {
    if (props.data.channels) {
      setChannels(props.data.channels.map((list) => list));
    }
  };

  useEffect(() => {
    handleChannels();
  }, [props.data.channels]);

  return (
    <>
      <Navbar />
      <div className="channel-wrapper">
        <div className="list-container">
          {channels.map((channel, index) => (
            <li key={index}>
              <figcaption>{channel.name}</figcaption>
              <figure>
                <audio controls src={channel.liveaudio.url}></audio>
              </figure>
              <img src={channel.image} alt="" />
            </li>
          ))}
        </div>
        <div className="button-container">
          <button onClick={props.handleLoadLess}>Back</button>
          <button onClick={props.handleLoadMore}>Next</button>
        </div>
      </div>
    </>
  );
};
