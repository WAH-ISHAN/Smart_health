import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

Chart.register(ArcElement, Tooltip, Legend);

export default function AdminDash() {
  const [cards, setCards] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: ['#06b6d4', '#3b82f6', '#a855f7'] }],
  });
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    // Fetch Cards
    axios.get('http://localhost:8080/api/dashboard/cards')
      .then(res => setCards(res.data))
      .catch(err => console.error('Cards error:', err));

    // Fetch Doctors
    axios.get('http://localhost:8080/api/doctors/availability')
      .then(res => setDoctors(res.data))
      .catch(err => console.error('Doctors error:', err));

    // Fetch Chart Data
    axios.get('http://localhost:8080/api/appointments/today')
      .then(res => {
        const labels = res.data.map(item => item.name);
        const data = res.data.map(item => item.count);
        setChartData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: ['#06b6d4', '#3b82f6', '#a855f7'],
            },
          ],
        });
      })
      .catch(err => console.error('Chart data error:', err));

    // Fetch Calendar Events
    axios.get('http://localhost:8080/api/calendar/events')
      .then(res => setCalendarEvents(res.data))
      .catch(err => console.error('Calendar events error:', err));
  }, []);

  return (
    <div className="p-6  text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div
            key={i}
            className={`${c.bg} p-4 rounded-lg shadow-md flex flex-col justify-between`}
          >
            <div className="text-3xl font-bold">{c.value}</div>
            <div className="mt-2">{c.title}</div>
            <button className="mt-4 text-sm underline self-start">
              More info →
            </button>
          </div>
        ))}
      </div>

      {/* Availability + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Doctor Availability */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Doctor's Availability</h2>
          <ul className="space-y-2">
            {doctors.map((d, idx) => (
              <li key={idx} className="bg-green-700 p-2 rounded">
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* Today's Appointments Chart */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Today's Appointments</h2>
          <Doughnut data={chartData} />
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-md">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay',
          }}
          events={calendarEvents}
          height="auto"
        />
      </div>
    </div>
  );
}
