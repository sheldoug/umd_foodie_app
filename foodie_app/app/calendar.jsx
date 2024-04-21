import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  // Sample event data
  const events = [
    {
      title: 'Bitcamp Breakfast',
      start: '2024-04-20T09:00:00',
      end: '2024-04-20T10:30:00'
    },
    {
      title: 'Bitcamp Lunch',
      start: '2024-04-20T12:30:00',
      end: '2024-04-20T14:00:00'
    },
    {
      title: 'Bitcamp Dinner',
      start: '2024-04-20T19:00:00',
      end: '2024-04-20T20:30:00'
    }
  ];

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        aspectRatio={1.5} 
        height={"90vh"}
        events={events} 
      />
    </div>
  );
}

export default Calendar;
