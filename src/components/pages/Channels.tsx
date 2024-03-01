import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import "./Channels.css";

export const Channels = (props) => {
  const [channels, setChannels] = useState([]);
  const [channelImg, setChannelImg] = useState([]);

  const handleChannels = () => {
    if (props.data.channels) {
      setChannels(props.data.channels.map((list) => list));
    }
  };

  useEffect(() => {
    handleChannels();
  }, [props.data.channels]);

  <figure>
    <figcaption>Listen to the T-Rex:</figcaption>
    <audio controls src="/media/cc0-audio/t-rex-roar.mp3"></audio>
    <a href="/media/cc0-audio/t-rex-roar.mp3"> Download audio </a>
  </figure>;

  return (
    <>
      <Navbar />
      <div className="channel-wrapper">
        <button onClick={props.handleLoadLess}>left</button>
        <div className="list-container">
          {channels.map((channel, index) => (
            <li key={index}>
              <figcaption>{channel.name}</figcaption>
              <figure>
                <audio controls src={channel.liveaudio.url}></audio>
              </figure>{" "}
              <img src={channel.image} alt="" />{" "}
            </li>
          ))}
        </div>
        <button onClick={props.handleLoadMore}>right</button>
      </div>
    </>
  );
};
