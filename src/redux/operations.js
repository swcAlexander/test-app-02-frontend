import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchEvents = async () => {
  try {
    const response = await axios.get(
      'https://test-app-02-backend.onrender.com/api/events'
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const addEvent = async ({ title, descripton, eventDate, organizer }) => {
  try {
    const response = await axios.post(
      'https://test-app-02-backend.onrender.com/api/events',
      {
        title,
        descripton,
        eventDate,
        organizer,
      }
    );
    return response.data;
  } catch (error) {
    return toast.error(error.message);
  }
};
export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(
      `https://test-app-02-backend.onrender.com/api/events/${eventId}`
    );
    return response.data;
  } catch (error) {
    return toast.error(error.message);
  }
};
export const addContact = async (userData) => {
  try {
    const { data } = await axios.post(
      'https://test-app-02-backend.onrender.com/api/contacts',
      userData
    );
    return data;
  } catch (error) {
    return toast.error(error.responce.data);
  }
};
export const allContacts = async (userData) => {
  try {
    const { data } = await axios.get(
      'https://test-app-02-backend.onrender.com/api/contacts',
      userData
    );
    return data;
  } catch (error) {
    return toast.error(error.responce.data);
  }
};
