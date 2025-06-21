import React, { useState, useEffect } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

const ApprovalDesk = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventData, setEventData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        contactInfo: ''
    });
    const [events, setEvents] = useState([]); // State to hold events

    // Fetch events from the backend
    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/events');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEvents(data); // Set the events state
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents(); // Fetch events when the component mounts
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Event submitted:', eventData);
    
        try {
            const response = await fetch('http://localhost:5000/api/auth/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Event added:', data);
            alert('Event added successfully!');

            // Fetch updated events
            fetchEvents();

            // Reset form and close modal
            setEventData({
                name: '',
                startDate: '',
                endDate: '',
                contactInfo: ''
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding event:', error);
            alert('Failed to add event. Please try again.');
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Approval Desk</h1>
                    <p className="text-gray-300">Manage event approval requests</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md transition"
                >
                    <FaPlus /> Add Event
                </button>
            </div>

            {/* Add Event Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-br from-[#1e1e2f] to-[#0A1F24] p-6 rounded-lg w-full max-w-md relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <FaTimes />
                        </button>
                        
                        <h2 className="text-xl font-bold mb-4 text-white">Add New Event</h2>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Event Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={eventData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2B0A3D] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        required
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-1">Start Date</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={eventData.startDate}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-[#2B0A3D] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-1">End Date</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={eventData.endDate}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-[#2B0A3D] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Contact Information</label>
                                    <input
                                        type="text"
                                        name="contactInfo"
                                        value={eventData.contactInfo}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2B0A3D] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        placeholder="Email or phone number"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition"
                                >
                                    Add Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Display Events */}
            <div className="mt-6">
                <h2 className="text-xl font-bold text-white">Events List</h2>
                <div className="mt-4 grid grid-cols-1 gap-4">
                    {events.map((event) => (
                        <div key={event._id} className="bg-[#2B0A3D] p-4 rounded-md border border-gray-700">
                            <h3 className="text-lg font-semibold text-white">{event.name}</h3>
                            <p className="text-gray-300">Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
                            <p className="text-gray-300">End Date: {new Date(event.endDate).toLocaleDateString()}</p>
                            <p className="text-gray-300">Contact: {event.contactInfo}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ApprovalDesk;
