import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';

const SurvivorRankingApp = () => {
  const initialCastMembers = [
    { id: 1, name: "John Smith", facts: ["From Texas", "Firefighter", "Former college athlete"] },
    { id: 2, name: "Sarah Jones", facts: ["Chef", "Loves rock climbing", "Mother of three"] },
    // Add more cast members as needed
  ];

  const eliminationOrder = [
    "John Smith",
    "Sarah Jones",
    // Add more eliminations as they happen
  ];

  const [rankings, setRankings] = useState(Array(18).fill(null));
  const [selectedCastMembers, setSelectedCastMembers] = useState(initialCastMembers);
  const [userName, setUserName] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  const handleRankingChange = (position, castMemberId) => {
    const newRankings = [...rankings];
    const previousPosition = rankings.findIndex(id => id === castMemberId);
    if (previousPosition !== -1) {
      newRankings[previousPosition] = null;
    }
    newRankings[position] = castMemberId;
    setRankings(newRankings);
    
    const updatedCastMembers = initialCastMembers.filter(
      member => !newRankings.includes(member.id) || member.id === castMemberId
    );
    setSelectedCastMembers(updatedCastMembers);
  };

  const calculateScores = (submission) => {
    let totalScore = 0;
    submission.rankings.forEach((ranking) => {
      const actualPosition = eliminationOrder.findIndex(name => name === ranking.castMember) + 1;
      const predictedPosition = ranking.position;
      const positionDiff = Math.abs(actualPosition - predictedPosition);

      if (positionDiff === 0) totalScore += 5;
      else if (positionDiff === 1) totalScore += 3;
      else if (positionDiff === 2) totalScore += 1;

      if (actualPosition <= 3 && predictedPosition === actualPosition) {
        totalScore += 7;
      }
    });
    return totalScore;
  };

  const handleSubmitName = () => {
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }

    if (submissions.some(sub => sub.userName.toLowerCase() === userName.toLowerCase())) {
      alert('This name has already been used. Please use a different name.');
      return;
    }

    if (rankings.includes(null)) {
      alert('Please complete all rankings before submitting');
      return;
    }

    const confirmSubmit = window.confirm(
      'WARNING: This submission is final and cannot be changed. Are you sure you want to submit your rankings?'
    );

    if (confirmSubmit) {
      const submission = {
        userName,
        rankings: rankings.map((id, index) => ({
          position: 18 - index,
          castMember: initialCastMembers.find(m => m.id === id).name
        })),
        timestamp: new Date().toISOString()
      };

      setSubmissions([...submissions, submission]);
      setShowResults(true);
      setShowNamePrompt(false);
    }
  };

  const exportResults = () => {
    const csvContent = submissions.map(submission => {
      const score = calculateScores(submission);
      return `${submission.userName},${score},${submission.rankings.map(r => r.castMember).join(';')}`;
    }).join('\n');

    const header = "Name,Score,Rankings\n";
    const blob = new Blob([header + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'survivor_rankings.csv';
    a.click();
  };

  const NamePrompt = () => (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Submit Your Rankings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-red-500 font-semibold">
            Important: You can only submit once and cannot change your rankings after submission.
          </p>
          <div>
            <label className="block mb-2">Your Name:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmitName}
          >
            Submit Final Rankings
          </button>
          <button
            className="w-full px-4 py-2 border rounded"
            onClick={() => setShowNamePrompt(false)}
          >
            Back to Rankings
          </button>
        </div>
      </CardContent>
    </Card>
  );

  const RankingForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Survivor Cast Rankings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-6">
          <p className="text-yellow-800">
            Please rank all contestants before submitting. Once submitted, your rankings cannot be changed.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {initialCastMembers.map(member => (
            <div key={member.id} className="p-4 border rounded">
              <div className="w-full h-40 bg-gray-200">
                <img
                  src="/api/placeholder/160/160"
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold mt-2">{member.name}</h3>
              <ul className="text-sm">
                {member.facts.map((fact, index) => (
                  <li key={index}>{fact}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {Array.from({ length: 18 }, (_, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="font-semibold w-8">{18 - index}</span>
              <select
                className="w-full p-2 border rounded"
                value={rankings[index] || ''}
                onChange={(e) => handleRankingChange(index, Number(e.target.value))}
              >
                <option value="">Select cast member</option>
                {selectedCastMembers.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setShowNamePrompt(true)}
          >
            Continue to Submit
          </button>
          <button
            className="px-4 py-2 border rounded"
            onClick={() => setShowResults(true)}
          >
            View Results
          </button>
        </div>
      </CardContent>
    </Card>
  );

  const ResultsView = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Rankings Results
          <button
            onClick={exportResults}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            <Download size={18} />
            Export to CSV
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
          <div className="space-y-4">
            {submissions
              .map(submission => ({
                ...submission,
                score: calculateScores(submission)
              }))
              .sort((a, b) => b.score - a.score)
              .map((submission, index) => (
                <div key={index} className="border p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{submission.userName}</h4>
                    <span className="text-lg font-bold">Score: {submission.score}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {submission.rankings.map((rank, i) => (
                      <div key={i} className="text-sm">
                        {rank.position}: {rank.castMember}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <button
          className="mt-6 px-4 py-2 border rounded"
          onClick={() => setShowResults(false)}
        >
          Back to Rankings
        </button>
      </CardContent>
    </Card>
  );

  if (showNamePrompt) {
    return <NamePrompt />;
  }

  return showResults ? <ResultsView /> : <RankingForm />;
};

export default SurvivorRankingApp;