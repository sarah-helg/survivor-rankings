import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const SurvivorRankingApp = () => {
  const initialCastMembers = [
    { id: 1, name: "Stephanie Berger", info: { age: 38, hometown: "New York City, N.Y.", currentResidence: "Brooklyn, N.Y.", occupation: "Tech product lead", description: "Ambitious, outgoing, resilient" }, imageUrl: "/images/Stephanie.jpg" },
    { id: 2, name: "Shauhin Davari", info: { age: 38, hometown: "Los Angeles, CA", currentResidence: "Santa Monica, CA", occupation: "Marketing Manager", description: "Creative, detail-oriented, adventurous" }, imageUrl: "/images/Shauhin.png" },
    { id: 3, name: "Eva Erickson", info: { age: 24, hometown: "Eagan, Minn.", currentResidence: "Providence, R.I.", occupation: "PhD Candidate", description: "Energetic, driven, competitive" }, imageUrl: "/images/Eva.jpg" },
    { id: 4, name: "Kyle Fraser", info: { age: 31, hometown: "Roanoke, Va.", currentResidence: "Brooklyn, N.Y.", occupation: "Attorney", description: "Fun, crafty, social" }, imageUrl: "/images/kyle.jpg" },
    { id: 5, name: "Mitch Guerra", info: { age: 34, hometown: "Waco, Tex.", currentResidence: "Waco, Tex.", occupation: "PE Coach", description: "Joyful, relational, competitive" }, imageUrl: "/images/mitch.jpg" },
    { id: 6, name: "Saiounia 'Sai' Hughley", info: { age: 30, hometown: "Philadelphia, Pa.", currentResidence: "Simi Valley, Calif.", occupation: "Marketing Professional", description: "Outgoing, kind, driven" }, imageUrl: "/images/Sai.jpg" },
    { id: 7, name: "Joe Hunter", info: { age: 45, hometown: "Vacaville, Calif.", currentResidence: "West Sacramento, Calif.", occupation: "Fire Captain", description: "Courageous, compassionate, loving/kick-ass dad!" }, imageUrl: "/images/Joe.jpg" },
    { id: 8, name: "Kamilla Karthigesu", info: { age: 31, hometown: "Toronto, Canada", currentResidence: "Foster City, Calif.", occupation: "Software engineer", description: "Silly, expressive, impatient" }, imageUrl: "/images/Kamilla.jpg" },
    { id: 9, name: "David Kinne", info: { age: 39, hometown: "Long Beach, Calif.", currentResidence: "Buena Park, Calif.", occupation: "Stunt Performer", description: "Passionate, daring, curious" }, imageUrl: "/images/David.jpg" },
    { id: 10, name: "Thomas Krottinger", info: { age: 34, hometown: "The Woodlands, Tex.", currentResidence: "Los Angeles, Calif.", occupation: "Music executive", description: "Outgoing, emotional, loyal" }, imageUrl: "/images/Thomas.jpg" },
    { id: 11, name: "Kevin Leung", info: { age: 34, hometown: "Fremont, Calif.", currentResidence: "Livermore, Calif.", occupation: "Finance Manager", description: "Energetic, social, determined." }, imageUrl: "/images/Kevin.jpg" },
    { id: 12, name: "Cedrek McFadden", info: { age: 45, hometown: "Columbia, S.C.", currentResidence: "Greenville, S.C.", occupation: "Surgeon", description: "Dependable, determined, conscientious" }, imageUrl: "/images/Cedrek.jpg" },
    { id: 13, name: "Charity Nelms", info: { age: 34, hometown: "Monroe, Mich.", currentResidence: "St. Petersburg, Fla.", occupation: "Flight Attendant", description: "Bold, fun, loyal" }, imageUrl: "/images/Charity.jpg" },
    { id: 14, name: "Justin Pioppi", info: { age: 29, hometown: "Winthrop, Mass.", currentResidence: "Winthrop, Mass.", occupation: "Pizzeria manager", description: "Compassionate, hard-working, resilient" }, imageUrl: "/images/Justin.jpg" },
    { id: 15, name: "Bianca Roses", info: { age: 33, hometown: "West Orange, N.J.", currentResidence: "Arlington, Va.", occupation: "PR Consultant", description: "Bold, friendly, enthusiastic" }, imageUrl: "/images/Bianca.jpg" },
    { id: 16, name: "Chrissy Sarnowsky", info: { age: 55, hometown: "South Side of Chicago, Ill.", currentResidence: "South Side of Chicago, Ill.", occupation: "Fire Lieutenant", description: "Badass, lucky, generous" }, imageUrl: "/images/Chrissy.jpg" },
    { id: 17, name: "Star Toomey", info: { age: 28, hometown: "Monrovia, Liberia", currentResidence: "Augusta, Ga.", occupation: "Sales Expert", description: "Hilarious, smooth, laugh-out-loud funny." }, imageUrl: "/images/Star.jpg" },
    { id: 18, name: "Mary Zheng", info: { age: 31, hometown: "Montgomery Village, Md.", currentResidence: "Philadelphia, Pa.", occupation: "Substance abuse counselor", description: "Chaotic, dynamic, thoughtful" }, imageUrl: "/images/Mary.jpg" },
  ];

  const [rankings, setRankings] = useState(Array(18).fill(null));
  const [selectedCastMembers, setSelectedCastMembers] = useState(initialCastMembers);
  const [userName, setUserName] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  const handleRankingChange = (position, castMemberId) => {
    const newRankings = [...rankings];
    if (castMemberId !== null) {
      const previousPosition = rankings.findIndex(id => id === castMemberId);
      if (previousPosition !== -1) {
        newRankings[previousPosition] = null;
      }
    }
    newRankings[position] = castMemberId;
    setRankings(newRankings);
  };

  const handleSubmitName = async () => {
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

    if (!confirmSubmit) return;

    const submission = {
      userName,
      rankings: rankings.map((id, index) => ({
        position: 18 - index,
        castMember: initialCastMembers.find(m => m.id === id)?.name
      })),
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbw3J7-1zP1xIL_owcnl86J33ar9DkarUrYutt-GVfZUNgCYSQndHg5j7LSkPEDKsL8tjw/exec",
        {
          method: 'POST',
          mode: 'no-cors', // Using no-cors mode; response is opaque.
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission)
        }
      );

      // In no-cors mode, the response is opaque so we assume success if no network error occurred.
      if (response.type === 'opaque') {
        alert('Submission successful!');
        setSubmissions([...submissions, submission]);
        setShowResults(true);
        setShowNamePrompt(false);
      } else {
        // In case a non-opaque response is returned, try to parse it.
        const data = await response.json();
        if (data.result === "success") {
          alert('Submission successful!');
          setSubmissions([...submissions, submission]);
          setShowResults(true);
          setShowNamePrompt(false);
        } else {
          alert('Error: ' + data.error);
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your rankings. Please try again.');
    }
  };

  const exportResults = () => {
    // Code for exporting results as CSV
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
              autoFocus
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
        <div className="grid grid-cols-3 gap-4 mb-8">
          {initialCastMembers.map(member => (
            <div key={member.id} className="p-4 border rounded">
              <div className="w-full h-60 bg-gray-200">
                <img
                  src={member.imageUrl || "/api/placeholder/160/160"}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="font-semibold mt-2">{member.name}</h3>
              <p className="text-sm"><strong>Age:</strong> {member.info.age}</p>
              <p className="text-sm"><strong>Hometown:</strong> {member.info.hometown}</p>
              <p className="text-sm"><strong>Current Residence:</strong> {member.info.currentResidence}</p>
              <p className="text-sm"><strong>Occupation:</strong> {member.info.occupation}</p>
              <p className="text-sm"><strong>Description:</strong> {member.info.description}</p>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 18 }, (_, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="font-semibold w-8">{18 - index}</span>
              <CustomDropdown
                selectedCastMembers={selectedCastMembers}
                rankings={rankings}
                position={index}
                handleRankingChange={handleRankingChange}
              />
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
            onClick={exportResults}
          >
            Export CSV
          </button>
        </div>
      </CardContent>
    </Card>
  );

  const ResultsView = () => (
    <Card>
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div key={submission.userName} className="p-4 border rounded">
              <div className="flex justify-between">
                <span className="font-semibold">{submission.userName}</span>
                {/* Remove or define submission.score if not needed */}
                <span className="text-sm text-gray-500">Score: {submission.score || '-'}</span>
              </div>
              <div className="text-sm">
                {submission.rankings.map((ranking, i) => (
                  <div key={i}>
                    <strong>{i + 1}.</strong> {ranking.castMember}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return showResults ? (
    <ResultsView />
  ) : showNamePrompt ? (
    <NamePrompt />
  ) : (
    <RankingForm />
  );
};

const CustomDropdown = ({ selectedCastMembers, rankings, position, handleRankingChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-full">
      <div
        className="border rounded p-2 cursor-pointer"
        tabIndex={0}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {rankings[position] ? (
          <span className="font-semibold">
            {selectedCastMembers.find(m => m.id === rankings[position])?.name}
          </span>
        ) : (
          <span className="text-gray-500">Select Cast Member</span>
        )}
      </div>
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-lg z-10">
          {selectedCastMembers.map(member => {
            const isSelected = rankings.includes(member.id);
            return (
              <div
                key={member.id}
                className={`p-2 cursor-pointer ${isSelected ? 'text-gray-400' : ''}`}
                style={isSelected ? { textDecoration: 'line-through' } : {}}
                onClick={() => handleRankingChange(position, isSelected ? null : member.id)}
              >
                {member.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SurvivorRankingApp;
