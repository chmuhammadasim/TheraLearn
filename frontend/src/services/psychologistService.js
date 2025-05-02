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
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologistpatient/send-message`, 
      { message }, 
      {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'patientid': patientId
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const sendMessageToPsychologist = async (psychologistid, message) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologistpatient/sendmestopsy`, 
      { message }, 
      {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'psychologistid': psychologistid
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getPatientResponse = async (patientId, message) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/psychologistpatient/get-response`, 
      { message }, 
      {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'patientid': patientId
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const assignPsychologistToPatient = async (psychologistId) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologistpatient/assign`, {}, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'psychologistid': psychologistId 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error assigning psychologist:', error);
    throw new Error('Error assigning psychologist');
  }
};

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
export const getChatHistory = async (patient) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/psychologistpatient/patient-chat`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'patientid': patient
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching psychologist details:', error);
    throw error;
  }
};

export const getChatHistoryUser = async (psychologistid) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/psychologistpatient/psy-chat`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'psychologistid': psychologistid
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching psychologist details:', error);
    throw error;
  }
};

export const getAssignedPsychologists = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/psychologistpatient/getassignedpsy`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error assigning psychologist:', error);
    throw new Error('Error assigning psychologist');
  }
};

export const getPatientChildren = async (patientId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/psychologistpatient/children`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'patientid': patientId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching patient children:', error);
    throw error;
  }
};

export const addChildToPatient = async (patientId, childData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologistpatient/add-child`, 
      childData, 
      {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'patientid': patientId
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding child to patient:', error);
    throw error;
  }
};

export const getChildRecords = async (childId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/psychologistpatient/child-records`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'childid': childId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching child records:', error);
    throw error;
  }
};

export const saveChildNotes = async (childId, notes) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologistpatient/child-notes`, 
      { notes }, 
      {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'childid': childId
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error saving child notes:', error);
    throw error;
  }
};

export const saveChildPrescription = async (childId, prescription) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologistpatient/child-prescription`, 
      { prescription }, 
      {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'childid': childId
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error saving child prescription:', error);
    throw error;
  }
};

export const saveChildFollowUp = async (childId, followUpData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologistpatient/child-followup`, 
      followUpData, 
      {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'childid': childId
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error saving child follow-up:', error);
    throw error;
  }
};

export const saveChildMentalHealthNotes = async (childId, mentalHealthNotes) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologistpatient/child-mental-health`, 
      { mentalHealthNotes }, 
      {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'childid': childId
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error saving child mental health notes:', error);
    throw error;
  }
};

export const saveChildLabTests = async (childId, labTests) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologistpatient/child-lab-tests`, 
      { labTests }, 
      {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'childid': childId
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error saving child lab tests:', error);
    throw error;
  }
};

export const saveChildTherapySession = async (childId, sessionData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologistpatient/child-therapy-session`, 
      sessionData, 
      {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'childid': childId
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error saving child therapy session:', error);
    throw error;
  }
};

export const saveChildDietRestrictions = async (childId, dietRestrictions) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/psychologistpatient/child-diet-restrictions`, 
      { dietRestrictions }, 
      {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'childid': childId
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error saving child diet restrictions:', error);
    throw error;
  }
};