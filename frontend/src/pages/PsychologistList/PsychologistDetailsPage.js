import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPsychologistById, assignPsychologistToPatient, getQuestionnaire, submitAnswer, getQnA, askQuestion } from '../../services/psychologistService';

function PsychologistDetailsPage() {
  const { id } = useParams();
  const [psychologist, setPsychologist] = useState(null);
  const [isDoctorSelected, setIsDoctorSelected] = useState(false);
  const [questionnaire, setQuestionnaire] = useState([]);
  const [answers, setAnswers] = useState({});
  const [qna, setQnA] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

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
      setNewQuestion("");
      const updatedQnA = await getQnA(id);
      setQnA(updatedQnA);
      alert('Question submitted successfully!');
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('Failed to submit question.');
    }
  };

  if (!psychologist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-indigo-100 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={psychologist.profilePictureUrl}
            alt={psychologist.name}
            className="w-48 h-48 object-cover rounded-full shadow-lg"
          />
          <div className="md:ml-8 mt-4 md:mt-0">
            <h1 className="text-4xl font-extrabold text-blue-900">
              {psychologist.firstName} {psychologist.lastName}
            </h1>
            <p className="text-gray-600 text-xl">{psychologist.specialization}</p>
            <p className="text-gray-500 mt-2">{psychologist.phone}</p>
            <p className="text-gray-500">{psychologist.contact}</p>
            <p className="text-gray-600 mt-2">
              {psychologist.city}, {psychologist.country}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">About</h2>
          <p className="text-gray-600 mt-4">{psychologist.bio}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Experience & Education</h2>
          <p className="text-gray-600 mt-4">Years of Experience: {psychologist.yearsOfExperience} years</p>
          <p className="text-gray-600 mt-2">Education: {psychologist.education}</p>
        </div>
        <div className="mt-8">
          {!isDoctorSelected ? (
            <button
              onClick={handleSelectDoctor}
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-all duration-300"
            >
              Select as My Doctor
            </button>
          ) : (
            <div className="text-green-500 text-lg font-semibold">
              You have selected this psychologist as your doctor.
            </div>
          )}
        </div>

        {/* Questionnaire Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Questionnaire</h2>
          <div className="mt-4 space-y-4">
            {questionnaire.map((question) => (
              <div key={question._id} className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-gray-700 font-semibold">{question.text}</p>
                <input
                  type="text"
                  value={answers[question._id] || ""}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  className="w-full mt-2 p-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmitAnswers}
            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-all duration-300"
          >
            Submit Answers
          </button>
        </div>

        {/* Q&A Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Q&A</h2>
          <div className="mt-4 space-y-4">
            {qna.map((item) => (
              <div key={item._id} className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-gray-700 font-semibold">{item.question}</p>
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
              className="w-full p-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleQuestionSubmit}
              className="mt-2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-all duration-300"
            >
              Submit Question
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href={`mailto:${psychologist.contact}`}
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-all duration-300"
          >
            Contact Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default PsychologistDetailsPage;
