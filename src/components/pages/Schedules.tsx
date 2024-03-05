import React, { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";

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
      <h1>Schedules</h1>
      <div>
        {scheduleData.map((schedule, index) => {
          return (
            <div key={index}>
              <h2>{`Channel:`}</h2>
              {schedule.schedule.map((program, programIndex) => (
                <p key={programIndex}>{program.title}</p>
              ))}
              {/* Render other schedule information as needed */}
            </div>
          );
        })}
      </div>
    </>
  );
};
