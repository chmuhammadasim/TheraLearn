import axios from 'axios';

// Retrieve the authentication token from local storage
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

// Fetch a specific psychologist by ID
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

// Fetch the list of patients assigned to a psychologist
export const getPatientsByPsychologistId = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/psychologist/patients`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'psychologist-id': id
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

// Send a message to a specific patient
export const sendMessageToPatient = async (patientId, message) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologist/messages`, 
      { message }, 
      {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'patient-id': patientId
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Assign a psychologist to a patient (optional, if needed)
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

// Fetch the questionnaire (optional, if needed)
export const getQuestionnaire = async (psychologistId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/psychologist/questionnaire`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'psychologist-id': psychologistId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching questionnaire:', error);
    throw error;
  }
};

// Submit answers to the questionnaire (optional, if needed)
export const submitAnswer = async (psychologistId, answers) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologist/questionnaire/answers`, { answers }, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'psychologist-id': psychologistId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting answers:', error);
    throw error;
  }
};

// Fetch the Q&A (optional, if needed)
export const getQnA = async (psychologistId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/psychologist/qna`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'psychologist-id': psychologistId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Q&A:', error);
    throw error;
  }
};

// Ask a new question in Q&A (optional, if needed)
export const askQuestion = async (psychologistId, question) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologist/qna`, { question }, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'psychologist-id': psychologistId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting question:', error);
    throw error;
  }
};
export const getPsychologistDetails  = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/psychologistpatient/me`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching psychologist details:', error);
    throw error;
  }
};
export const getPatients   = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/psychologistpatient/my-patients`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching psychologist details:', error);
    throw error;
  }
};
