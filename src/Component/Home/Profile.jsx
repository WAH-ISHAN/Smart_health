import React, { useState } from 'react';

import {
  FaSignOutAlt, FaCamera, FaIdCard, FaBirthdayCake, FaChartLine,
  FaEdit, FaTrashAlt, FaUser, FaHeartbeat, FaCalendarAlt, FaInfoCircle,
  FaHome, FaAllergies, FaExclamationTriangle, FaPlusCircle,
  FaFileMedical, FaPrescription, FaCalendarCheck, FaFilePdf
} from 'react-icons/fa';

const PatientProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleEdit = () => {
    setIsEditing(prev => !prev);
  };

  const handleDeleteConfirm = () => {
    alert('Patient profile has been deleted (simulated).');
    setShowDeleteModal(false);
  };

  const inputClass = isEditing ? 'form-input' : 'form-input input-disabled';
  const inputProps = isEditing ? {} : { disabled: true };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Hospital Management System</h1>
          <p className="text-gray-600">Patient Profile Management</p>
        </div>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          <FaSignOutAlt className="mr-2 inline" /> Logout
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-blue-100">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bbaf01fd-22d3-4fdb-b893-03d17130c482.png"
                alt="Patient"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                <button onClick={() => alert('Upload functionality here')} className="text-white bg-blue-500 rounded-full p-2 hover:bg-blue-600">
                  <FaCamera />
                </button>
              </div>
            </div>
          </div>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Denna Mata</h2>
            <p className="text-gray-600"><FaIdCard className="inline mr-2" /> Patient ID: HMS-2023-0042</p>
            <p className="text-gray-600"><FaBirthdayCake className="inline mr-2" /> 42 years old</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-3"><FaChartLine className="inline mr-2" />Patient Stats</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Visits:12', 'Prescriptions:7', 'Allergies:3', 'Active:Yes'].map((item, i) => {
                const [label, val] = item.split(':');
                return (
                  <div key={i} className="bg-white p-2 rounded">
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className={`font-bold ${val === 'Yes' ? 'text-green-500' : ''}`}>{val}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={toggleEdit} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              <FaEdit className="inline mr-2" /> {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
            <button onClick={() => setShowDeleteModal(true)} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
              <FaTrashAlt className="inline mr-2" /> Delete Profile
            </button>
          </div>
        </div>

        {/* Right Column Tabs and Content */}
        <div className="lg:col-span-2">
          <div className="flex border-b border-gray-200 mb-6">
            {[
              { key: 'personal', icon: <FaUser />, label: 'Personal Info' },
              { key: 'medical', icon: <FaHeartbeat />, label: 'Medical History' },
              { key: 'visits', icon: <FaCalendarAlt />, label: 'Visit History' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`tab-btn px-6 py-3 font-medium ${activeTab === tab.key ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 border-b-2 border-transparent hover:border-gray-300'}`}
              >
                {tab.icon} <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FaInfoCircle className="text-blue-500 mr-2" /> Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" defaultValue="Denna Mata" className={`w-full px-4 py-2 rounded-lg border border-gray-300 ${inputClass}`} {...inputProps} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input type="date" defaultValue="1981-04-15" className={`w-full px-4 py-2 rounded-lg border border-gray-300 ${inputClass}`} {...inputProps} />
                  </div>
                </div>
              </div>
              {/* Address and Other Sections can follow similarly */}
            </div>
          )}

          {/* Tabs for medical and visits would be added similarly */}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-red-600">Confirm Deletion</h3>
              <button onClick={() => setShowDeleteModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <p className="mb-6">Are you sure you want to delete this patient profile? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
