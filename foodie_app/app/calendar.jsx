import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

function Calendar() {
  // ... your events and other component code

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "title",
          center: "",
          end: "today prev,next"
        }}
        footerToolbar={{
          start: '',
          center: 'dayGridMonth,timeGridWeek,timeGridDay',
          end: ''
        }}
        height="auto"
        events={events}
      />
    </div>
  );
}

export default Calendar;
