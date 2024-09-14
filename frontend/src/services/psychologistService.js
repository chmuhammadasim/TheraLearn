import axios from 'axios';

const token = localStorage.getItem('authToken');

// Fetch all psychologists
export const getPsychologists = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/psychologist/getall`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    
    return response.data;
  } catch (error) {
    console.error('Error fetching psychologists:', error);
    throw error;
  }
};

// Fetch a specific psychologist by ID (ID passed in headers)
export const getPsychologistById = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/psychologist/getbyid`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'psychologistID': id
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching psychologist details:', error);
    throw error;
  }
};

// Assign psychologist to a patient (ID passed in headers)
export const assignPsychologistToPatient = async (psychologistId) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologist/patients/assign`, {}, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'psychologist-id': psychologistId 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error assigning psychologist:', error);
    throw new Error('Error assigning psychologist');
  }
};

// Fetch the questionnaire (ID passed in headers)
export const getQuestionnaire = async (psychologistId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/psychologist/questionnaire`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'psychologist-id': psychologistId  // Pass psychologist ID in headers
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching questionnaire:', error);
    throw error;
  }
};

// Submit answers to the questionnaire (ID passed in headers)
export const submitAnswer = async (psychologistId, answers) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologist/questionnaire/answers`, { answers }, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'psychologist-id': psychologistId  // Pass psychologist ID in headers
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting answers:', error);
    throw error;
  }
};

// Fetch the Q&A (ID passed in headers)
export const getQnA = async (psychologistId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/psychologist/qna`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'psychologist-id': psychologistId  // Pass psychologist ID in headers
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Q&A:', error);
    throw error;
  }
};

// Ask a new question in Q&A (ID passed in headers)
export const askQuestion = async (psychologistId, question) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologist/qna`, { question }, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'psychologist-id': psychologistId  // Pass psychologist ID in headers
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting question:', error);
    throw error;
  }
};
