import React, { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import "./Schedules.css";

export const Schedules = ({ data, fetchSchedule }) => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      if (data && data.channels) {
        // Create an array of promises for each fetchSchedule call
        const fetchPromises = data.channels.map(async (channel) => {
          try {
            // Wait for each fetchSchedule call to complete
            const schedule = await fetchSchedule(channel.id);
            // Update scheduleData state with the received schedule data
            setScheduleData((prevScheduleData) => [
              ...prevScheduleData,
              schedule,
            ]);
          } catch (error) {
            console.error(
              `Error fetching schedule for channel ${channel.id}:`,
              error
            );
          }
        });

        // Wait for all promises to resolve before moving on
        await Promise.all(fetchPromises);
      }
    };

    fetchScheduleData();
  }, [data, fetchSchedule]);

  return (
    <>
      <Navbar />
      <div className="schedules-container">
        <h1>Schedules</h1>
        <div className="cards-container">
          {scheduleData.map((schedule, index) => (
            <div key={index} className="card">
              {schedule.schedule.map((program, programIndex) => {
                const timestamp = parseInt(program.endtimeutc.match(/\d+/)[0]);
                const date = new Date(timestamp);
                const formattedDate = date.toLocaleString();

                return (
                  <div className="box" key={programIndex}>
                    <img src={program.imageurl} alt="" />
                    <div className="text-container">
                      <h2>{program.channel.name}</h2>
                      <p>{program.title}</p>
                      <p>{program.description}</p>
                      <p>{formattedDate}</p>
                    </div>

                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
