import React from "react";

export function DoctorProfileSchedule() {
  return (
    <>
      {/* Inline styles preserved exactly as provided */}
      <style>{`
        :root {
            --primary: #3b82f6;
            --primary-dark: #2563eb;
            --secondary: #10b981;
            --dark: #1e293b;
            --light: #f8fafc;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f1f5f9;
        }

        .schedule-card {
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .schedule-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .time-slot {
            border-left: 4px solid var(--primary);
        }

        .time-slot:hover {
            background-color: #e0f2fe;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }

        /* Animation */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
        }
    `}</style>

    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Doctor Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex items-center gap-4 bg-white rounded-lg p-6 shadow-sm w-full md:w-auto">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src="https://placehold.co/96x96"
                alt="Professional portrait of Dr. Smith wearing white coat and stethoscope"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dr. Sarah Smith</h1>
              <p className="text-gray-600">Cardiologist</p>
              <div className="flex items-center mt-1">
                <span className="text-yellow-500">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star-half-alt" />
                </span>
                <span className="text-gray-500 ml-1 text-sm">4.7 (128 reviews)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Availability Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-green-800 font-medium">Available Today</p>
                <p className="text-2xl font-bold text-green-600 mt-2">6</p>
                <p className="text-green-600 text-sm">Slots</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-blue-800 font-medium">Weekly Appointments</p>
                <p className="text-2xl font-bold text-blue-600 mt-2">42</p>
                <p className="text-blue-600 text-sm">Total</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-purple-800 font-medium">Next Availability</p>
                <p className="text-2xl font-bold text-purple-600 mt-2">Tue</p>
                <p className="text-purple-600 text-sm">Jan 30</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <p className="text-orange-800 font-medium">Avg. Duration</p>
                <p className="text-2xl font-bold text-orange-600 mt-2">18</p>
                <p className="text-orange-600 text-sm">Minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Schedule Management Sidebar */}
          <div className="bg-white rounded-lg shadow-sm p-6 w-full lg:w-1/3">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Schedule Settings</h2>

            {/* Working Days Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Working Days</h3>
              <div className="flex flex-wrap gap-2">
                <button className="day-selector px-4 py-2 rounded-full border hover:bg-blue-50" data-day="mon">Mon</button>
                <button className="day-selector px-4 py-2 rounded-full border hover:bg-blue-50" data-day="tue">Tue</button>
                <button className="day-selector px-4 py-2 rounded-full border hover:bg-blue-50" data-day="wed">Wed</button>
                <button className="day-selector px-4 py-2 rounded-full border hover:bg-blue-50" data-day="thu">Thu</button>
                <button className="day-selector px-4 py-2 rounded-full border hover:bg-blue-50" data-day="fri">Fri</button>
                <button className="day-selector px-4 py-2 rounded-full border hover:bg-blue-50" data-day="sat">Sat</button>
                <button className="day-selector px-4 py-2 rounded-full border hover:bg-blue-50" data-day="sun">Sun</button>
              </div>
            </div>

            {/* Working Hours */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Working Hours</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="time" id="start-time" className="border rounded px-3 py-2 w-full" defaultValue="09:00" />
                  <span>to</span>
                  <input type="time" id="end-time" className="border rounded px-3 py-2 w-full" defaultValue="17:00" />
                </div>
              </div>
            </div>

            {/* Break Time */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Break Time</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="time" id="break-start" className="border rounded px-3 py-2 w-full" defaultValue="12:00" />
                  <span>to</span>
                  <input type="time" id="break-end" className="border rounded px-3 py-2 w-full" defaultValue="13:00" />
                </div>
              </div>
            </div>

            {/* Appointment Duration */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Appointment Duration</h3>
              <select id="duration" className="border rounded px-3 py-2 w-full" defaultValue="30">
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>

            {/* Save Button */}
            <button id="save-schedule" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
              Save Schedule
            </button>

            {/* Schedule Template */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Schedule Templates</h3>
              <select id="schedule-template" className="border rounded px-3 py-2 w-full mb-3">
                <option value="">Select a template...</option>
                <option value="standard">Standard Weekday</option>
                <option value="weekend">Weekend Hours</option>
                <option value="emergency">Emergency Clinic</option>
              </select>
              <button id="apply-template" className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
                Apply Template
              </button>
            </div>
          </div>

          {/* Schedule Calendar */}
          <div className="bg-white rounded-lg shadow-sm p-6 w-full lg:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Weekly Schedule</h2>
              <div className="flex gap-2">
                <button id="prev-week" className="p-2 rounded-full hover:bg-gray-100">
                  <i className="fas fa-chevron-left" />
                </button>
                <button id="next-week" className="p-2 rounded-full hover:bg-gray-100">
                  <i className="fas fa-chevron-right" />
                </button>
                <button id="today" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm">Today</button>
              </div>
            </div>

            {/* Week Navigation */}
            <div className="overflow-x-auto mb-4">
              <div className="min-w-max grid grid-cols-7 gap-1">
                <div className="font-medium text-center py-2 bg-gray-100 rounded-t-lg">Sun</div>
                <div className="font-medium text-center py-2 bg-gray-100 rounded-t-lg">Mon</div>
                <div className="font-medium text-center py-2 bg-gray-100 rounded-t-lg">Tue</div>
                <div className="font-medium text-center py-2 bg-gray-100 rounded-t-lg">Wed</div>
                <div className="font-medium text-center py-2 bg-gray-100 rounded-t-lg">Thu</div>
                <div className="font-medium text-center py-2 bg-gray-100 rounded-t-lg">Fri</div>
                <div className="font-medium text-center py-2 bg-gray-100 rounded-t-lg">Sat</div>
                <template id="date-template">
                  <div data-day className="text-center py-2 border-t border-l border-r border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium"><span data-date /></div>
                    <div className="text-sm text-gray-500"><span data-day-name /></div>
                  </div>
                </template>
              </div>
            </div>

            {/* Time Slots Grid */}
            <div className="border rounded-lg overflow-hidden">
              <div id="time-slot-container" className="max-h-[500px] overflow-y-auto" />
            </div>

            {/* Add Custom Time Slot */}
            <div className="mt-4">
              <div className="flex gap-2">
                <input type="time" id="custom-start" className="border rounded px-3 py-2 flex-1" />
                <span className="flex items-center">to</span>
                <input type="time" id="custom-end" className="border rounded px-3 py-2 flex-1" />
                <button id="add-custom-slot" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">Add Slot</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
}
export default DoctorProfileSchedule;