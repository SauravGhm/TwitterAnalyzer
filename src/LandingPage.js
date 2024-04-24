import React, { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [tweet, setTweet] = useState('');
  const [result, setResult] = useState({ sentiment: '', topic: '', response: '' });

  const handleAnalyze = async (endpoint) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tweet })
    });
    const data = await response.json();
    setResult({ ...result, ...data });
  };

  return (
    <div>
      <h1>Tweet Analysis Tool</h1>
      <input
        type="text"
        value={tweet}
        onChange={e => setTweet(e.target.value)}
        placeholder="Enter your tweet..."
      />
      <div>
        <button onClick={() => handleAnalyze('/api/analyze')}>Analyze API</button>
        <button onClick={() => handleAnalyze('/bertopic/analyze')}>Analyze BERTopic</button>
        <button onClick={() => handleAnalyze('/sentiment/analyze')}>Analyze Sentiment</button>
        <button onClick={() => handleAnalyze('/topic/analyze')}>Analyze Topic</button>
      </div>
      {result.response && <p>Response: {result.response}</p>}
      {result.sentiment && <p>Sentiment: {result.sentiment}</p>}
      {result.topic && <p>Topic: {result.topic}</p>}
    </div>
  );
}

export default LandingPage;
