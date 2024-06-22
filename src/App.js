import logo from './logo.svg';
import './App.css';
import React from 'react';
import SurveyForm from './SurveyForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Survey Form App</h1>
      </header>
      <main>
        <SurveyForm />
      </main>
      <footer>
        <p>© 2024 Survey App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

