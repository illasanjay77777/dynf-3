import React, { useState } from 'react';
import useFormValidation from './useFormValidation';
import './App.css';

const initialFormState = {
  fullName: '',
  email: '',
  surveyTopic: '',
  technology: {
    favoriteLanguage: '',
    yearsOfExperience: ''
  },
  health: {
    exerciseFrequency: '',
    dietPreference: ''
  },
  education: {
    highestQualification: '',
    fieldOfStudy: ''
  },
  feedback: ''
};

const validateForm = (formData) => {
  let errors = {};
  if (!formData.fullName.trim()) {
    errors.fullName = 'Full Name is required';
  }
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid';
  }
  if (!formData.surveyTopic) {
    errors.surveyTopic = 'Survey Topic is required';
  }
  if (formData.surveyTopic === 'Technology') {
    if (!formData.technology.favoriteLanguage) {
      errors.favoriteLanguage = 'Favorite Language is required';
    }
    if (!formData.technology.yearsOfExperience) {
      errors.yearsOfExperience = 'Years of Experience is required';
    }
  } else if (formData.surveyTopic === 'Health') {
    if (!formData.health.exerciseFrequency) {
      errors.exerciseFrequency = 'Exercise Frequency is required';
    }
    if (!formData.health.dietPreference) {
      errors.dietPreference = 'Diet Preference is required';
    }
  } else if (formData.surveyTopic === 'Education') {
    if (!formData.education.highestQualification) {
      errors.highestQualification = 'Highest Qualification is required';
    }
    if (!formData.education.fieldOfStudy) {
      errors.fieldOfStudy = 'Field of Study is required';
    }
  }
  if (!formData.feedback.trim()) {
    errors.feedback = 'Feedback is required';
  } else if (formData.feedback.trim().length < 50) {
    errors.feedback = 'Feedback must be at least 50 characters';
  }
  return errors;
};

const SurveyForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const {
    handleChange,
    handleSubmit,
    errors,
    isSubmitting
  } = useFormValidation(formData, validateForm);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    handleChange(e);
  };

  const handleTechnologyChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      technology: {
        ...formData.technology,
        [name]: value
      }
    });
    handleChange(e);
  };

  const handleHealthChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      health: {
        ...formData.health,
        [name]: value
      }
    });
    handleChange(e);
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      education: {
        ...formData.education,
        [name]: value
      }
    });
    handleChange(e);
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setSubmitted(false);
  };

  const handleFormSubmit = (e) => {
    handleSubmit(e);
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className="survey-form">
      {!submitted ? (
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleFieldChange}
              className={errors.fullName ? 'error-input' : ''}
            />
            {errors.fullName && <div className="error">{errors.fullName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFieldChange}
              className={errors.email ? 'error-input' : ''}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="surveyTopic">Survey Topic:</label>
            <select
              id="surveyTopic"
              name="surveyTopic"
              value={formData.surveyTopic}
              onChange={handleFieldChange}
              className={errors.surveyTopic ? 'error-input' : ''}
            >
              <option value="">Select a topic</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            {errors.surveyTopic && <div className="error">{errors.surveyTopic}</div>}
          </div>

          {formData.surveyTopic === 'Technology' && (
            <div className="form-group">
              <label htmlFor="favoriteLanguage">Favorite Programming Language:</label>
              <select
                id="favoriteLanguage"
                name="favoriteLanguage"
                value={formData.technology.favoriteLanguage}
                onChange={handleTechnologyChange}
                className={errors.favoriteLanguage ? 'error-input' : ''}
              >
                <option value="">Select a language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
              {errors.favoriteLanguage && <div className="error">{errors.favoriteLanguage}</div>}

              <label htmlFor="yearsOfExperience">Years of Experience:</label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.technology.yearsOfExperience}
                onChange={handleTechnologyChange}
                className={errors.yearsOfExperience ? 'error-input' : ''}
              />
              {errors.yearsOfExperience && <div className="error">{errors.yearsOfExperience}</div>}
            </div>
          )}

          {formData.surveyTopic === 'Health' && (
            <div className="form-group">
              <label htmlFor="exerciseFrequency">Exercise Frequency:</label>
              <select
                id="exerciseFrequency"
                name="exerciseFrequency"
                value={formData.health.exerciseFrequency}
                onChange={handleHealthChange}
                className={errors.exerciseFrequency ? 'error-input' : ''}
              >
                <option value="">Select frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
              {errors.exerciseFrequency && <div className="error">{errors.exerciseFrequency}</div>}

              <label htmlFor="dietPreference">Diet Preference:</label>
              <select
                id="dietPreference"
                name="dietPreference"
                value={formData.health.dietPreference}
                onChange={handleHealthChange}
                className={errors.dietPreference ? 'error-input' : ''}
              >
                <option value="">Select preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
             
                </select>
              {errors.dietPreference && <div className="error">{errors.dietPreference}</div>}
            </div>
          )}

          {formData.surveyTopic === 'Education' && (
            <div className="form-group">
              <label htmlFor="highestQualification">Highest Qualification:</label>
              <select
                id="highestQualification"
                name="highestQualification"
                value={formData.education.highestQualification}
                onChange={handleEducationChange}
                className={errors.highestQualification ? 'error-input' : ''}
              >
                <option value="">Select qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.highestQualification && <div className="error">{errors.highestQualification}</div>}

              <label htmlFor="fieldOfStudy">Field of Study:</label>
              <input
                type="text"
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={formData.education.fieldOfStudy}
                onChange={handleEducationChange}
                className={errors.fieldOfStudy ? 'error-input' : ''}
              />
              {errors.fieldOfStudy && <div className="error">{errors.fieldOfStudy}</div>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="feedback">Feedback:</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleFieldChange}
              className={errors.feedback ? 'error-input' : ''}
            />
            {errors.feedback && <div className="error">{errors.feedback}</div>}
          </div>

          <button type="submit" disabled={isSubmitting}>Submit</button>
        </form>
      ) : (
        <div className="submission-summary">
          <h2>Thank you for your submission!</h2>
          <h3>Summary:</h3>
          <p><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Survey Topic:</strong> {formData.surveyTopic}</p>

          {formData.surveyTopic === 'Technology' && (
            <div>
              <h3>Technology Details:</h3>
              <p><strong>Favorite Programming Language:</strong> {formData.technology.favoriteLanguage}</p>
              <p><strong>Years of Experience:</strong> {formData.technology.yearsOfExperience}</p>
            </div>
          )}

          {formData.surveyTopic === 'Health' && (
            <div>
              <h3>Health Details:</h3>
              <p><strong>Exercise Frequency:</strong> {formData.health.exerciseFrequency}</p>
              <p><strong>Diet Preference:</strong> {formData.health.dietPreference}</p>
            </div>
          )}

          {formData.surveyTopic === 'Education' && (
            <div>
              <h3>Education Details:</h3>
              <p><strong>Highest Qualification:</strong> {formData.education.highestQualification}</p>
              <p><strong>Field of Study:</strong> {formData.education.fieldOfStudy}</p>
            </div>
          )}

          <p><strong>Feedback:</strong> {formData.feedback}</p>

          <button onClick={resetForm}>Submit Another Response</button>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
