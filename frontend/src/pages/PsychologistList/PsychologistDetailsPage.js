import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getPsychologistById,
  assignPsychologistToPatient,
  getQuestionnaire,
  submitAnswer,
  getQnA,
  askQuestion,
} from '../../services/psychologistService';
import { FiPhone, FiMail } from 'react-icons/fi';

function PsychologistDetailsPage() {
  const { id } = useParams();
  const [psychologist, setPsychologist] = useState(null);
  const [isDoctorSelected, setIsDoctorSelected] = useState(false);
  const [questionnaire, setQuestionnaire] = useState([]);
  const [answers, setAnswers] = useState({});
  const [qna, setQnA] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    const fetchPsychologist = async () => {
      try {
        const data = await getPsychologistById(id);
        setPsychologist(data);
        const questionnaireData = await getQuestionnaire(id);
        setQuestionnaire(questionnaireData);
        const qnaData = await getQnA(id);
        setQnA(qnaData);
      } catch (error) {
        console.error('Error fetching psychologist details:', error);
      }
    };

    fetchPsychologist();
  }, [id]);

  const handleSelectDoctor = async () => {
    try {
      await assignPsychologistToPatient(psychologist._id);
      setIsDoctorSelected(true);
      alert('Psychologist selected as your doctor successfully!');
    } catch (error) {
      console.error('Error assigning psychologist:', error);
      alert('Failed to select psychologist as your doctor.');
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleSubmitAnswers = async () => {
    try {
      await submitAnswer(id, answers);
      alert('Answers submitted successfully!');
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('Failed to submit answers.');
    }
  };

  const handleQuestionSubmit = async () => {
    try {
      await askQuestion(id, newQuestion);
      setNewQuestion('');
      const updatedQnA = await getQnA(id);
      setQnA(updatedQnA);
      alert('Question submitted successfully!');
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('Failed to submit question.');
    }
  };

  if (!psychologist) {
    return <div className="text-center mt-20 text-lg text-gray-700">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FFDEE9] to-[#B5EAD7] p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-12 mb-16">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={psychologist.profilePictureUrl}
            alt={psychologist.name}
            className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full shadow-lg border-4 border-indigo-500"
          />
          <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600">{psychologist.firstName} {psychologist.lastName}</h1>
            <p className="text-pink-600 text-lg md:text-xl font-medium mt-2">{psychologist.specialization}</p>
            <p className="text-gray-500 mt-4 flex items-center justify-center md:justify-start">
              <FiPhone className="mr-2 text-blue-500" /> {psychologist.phone}
            </p>
            <p className="text-gray-500 flex items-center justify-center md:justify-start">
              <FiMail className="mr-2 text-blue-500" /> {psychologist.contact}
            </p>
            <p className="text-gray-600 mt-2">
              {psychologist.city}, {psychologist.country}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-indigo-700">About</h2>
          <p className="text-gray-600 mt-4">{psychologist.bio}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-indigo-700">Experience & Education</h2>
          <p className="text-gray-600 mt-4">Years of Experience: {psychologist.yearsOfExperience} years</p>
          <p className="text-gray-600 mt-2">Education: {psychologist.education}</p>
        </div>

        <div className="mt-8">
          {!isDoctorSelected ? (
            <button
              onClick={handleSelectDoctor}
              className="w-full bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] text-white px-6 py-3 rounded-lg shadow-lg hover:from-[#34D399] hover:to-[#2563EB] transition-all duration-300"
            >
              Select as My Doctor
            </button>
          ) : (
            <div className="text-green-600 text-lg font-semibold">
              You have selected this psychologist as your doctor.
            </div>
          )}
        </div>

        {/* Questionnaire Section */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-indigo-700">Questionnaire</h2>
          <div className="mt-4 space-y-4">
            {questionnaire.map((question) => (
              <div key={question._id} className="bg-pink-100 p-4 rounded-lg shadow">
                <p className="text-gray-800 font-semibold">{question.text}</p>
                <input
                  type="text"
                  value={answers[question._id] || ""}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your answer..."
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmitAnswers}
            className="mt-4 bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600"
          >
            Submit Answers
          </button>
        </div>

        {/* Q&A Section */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-indigo-700">Q&A</h2>
          <div className="mt-4 space-y-4">
            {qna.map((item) => (
              <div key={item._id} className="bg-yellow-100 p-4 rounded-lg shadow">
                <p className="text-gray-800 font-semibold">{item.question}</p>
                {item.answers.map((answer) => (
                  <div key={answer._id} className="bg-white mt-2 p-2 rounded-lg shadow">
                    <p className="text-gray-600">{answer.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Ask a question..."
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleQuestionSubmit}
              className="mt-2 bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600"
            >
              Submit Question
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href={`mailto:${psychologist.contact}`}
            className="inline-block bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600"
          >
            Contact Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default PsychologistDetailsPage;
