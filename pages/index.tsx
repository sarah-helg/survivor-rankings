import React, { useState, useEffect } from 'react';

interface Submission {
    userName: string;
    rankings: {
        position: number;
        castMember: string;
    }[];
    score?: number;
}

const SurvivorRankingApp = () => {
    const [viewMode, setViewMode] = useState<"form" | "results">("results");
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(false);

    // Hardcoded scores for all 14 submitters
    const hardcodedScores: { [key: string]: number } = {
        "Sammy": 11, "Sarah K": 10, "Tom Kourlis": 17, "Genna": 27,
        "Vale": 9, "Danica W": 7, "Cristina Miller": 25, "Izzy": 15,
        "Andy": 12, "Aram": 12, "Alexandra Campanile": 6, "Campy": 5,
        "Ivette": 11, "Caitlin": 15
    };

    // Full submitted rankings for all 14 users
    const submittedData: Submission[] = [
        {
            userName: "Sammy",
            rankings: [
                { position: 18, castMember: "Charity Nelms" }, { position: 17, castMember: "Saiounia 'Sai' Hughley" },
                { position: 16, castMember: "Thomas Krottinger" }, { position: 15, castMember: "Bianca Roses" },
                { position: 14, castMember: "Chrissy Sarnowsky" }, { position: 13, castMember: "Star Toomey" },
                { position: 12, castMember: "Eva Erickson" }, { position: 11, castMember: "Kevin Leung" },
                { position: 10, castMember: "David Kinne" }, { position: 9, castMember: "Justin Pioppi" },
                { position: 8, castMember: "Shauhin Davari" }, { position: 7, castMember: "Kyle Fraser" },
                { position: 6, castMember: "Joe Hunter" }, { position: 5, castMember: "Stephanie Berger" },
                { position: 4, castMember: "Cedrek McFadden" }, { position: 3, castMember: "Mary Zheng" },
                { position: 2, castMember: "Kamilla Karthigesu" }, { position: 1, castMember: "Mitch Guerra" }
            ],
        score: hardcodedScores["Sammy"]
        },
        {
            userName: "Sarah K",
            rankings: [
                { position: 18, castMember: "Shauhin Davari" }, { position: 17, castMember: "Bianca Roses" },
                { position: 16, castMember: "Charity Nelms" }, { position: 15, castMember: "Justin Pioppi" },
                { position: 14, castMember: "Star Toomey" }, { position: 13, castMember: "Kamilla Karthigesu" },
                { position: 12, castMember: "Thomas Krottinger" }, { position: 11, castMember: "Mary Zheng" },
                { position: 10, castMember: "David Kinne" }, { position: 9, castMember: "Kevin Leung" },
                { position: 8, castMember: "Mitch Guerra" }, { position: 7, castMember: "Kyle Fraser" },
                { position: 6, castMember: "Chrissy Sarnowsky" }, { position: 5, castMember: "Cedrek McFadden" },
                { position: 4, castMember: "Stephanie Berger" }, { position: 3, castMember: "Eva Erickson" },
                { position: 2, castMember: "Saiounia 'Sai' Hughley" }, { position: 1, castMember: "Joe Hunter" }
            ],
            score: hardcodedScores["Sarah K"]
        },
        {
            userName: "Tom Kourlis",
            rankings: [
                { position: 18, castMember: "Kamilla Karthigesu" }, { position: 17, castMember: "Chrissy Sarnowsky" },
                { position: 16, castMember: "Cedrek McFadden" }, { position: 15, castMember: "Thomas Krottinger" },
                { position: 14, castMember: "Saiounia 'Sai' Hughley" }, { position: 13, castMember: "Joe Hunter" },
                { position: 12, castMember: "Mary Zheng" }, { position: 11, castMember: "Kyle Fraser" },
                { position: 10, castMember: "Stephanie Berger" }, { position: 9, castMember: "David Kinne" },
                { position: 8, castMember: "Charity Nelms" }, { position: 7, castMember: "Shauhin Davari" },
                { position: 6, castMember: "Mitch Guerra" }, { position: 5, castMember: "Eva Erickson" },
                { position: 4, castMember: "Justin Pioppi" }, { position: 3, castMember: "Star Toomey" },
                { position: 2, castMember: "Bianca Roses" }, { position: 1, castMember: "Kevin Leung" }
            ],
            score: hardcodedScores["Tom Kourlis"]
        },
        {
            userName: "Genna",
            rankings: [
                { position: 18, castMember: "Shauhin Davari" }, { position: 17, castMember: "Kevin Leung" },
                { position: 16, castMember: "Thomas Krottinger" }, { position: 15, castMember: "Justin Pioppi" },
                { position: 14, castMember: "Mary Zheng" }, { position: 13, castMember: "Cedrek McFadden" },
                { position: 12, castMember: "Kamilla Karthigesu" }, { position: 11, castMember: "Bianca Roses" },
                { position: 10, castMember: "Kyle Fraser" }, { position: 9, castMember: "Saiounia 'Sai' Hughley" },
                { position: 8, castMember: "Star Toomey" }, { position: 7, castMember: "David Kinne" },
                { position: 6, castMember: "Mitch Guerra" }, { position: 5, castMember: "Chrissy Sarnowsky" },
                { position: 4, castMember: "Stephanie Berger" }, { position: 3, castMember: "Charity Nelms" },
                { position: 2, castMember: "Joe Hunter" }, { position: 1, castMember: "Eva Erickson" }
            ],
            score: hardcodedScores["Genna"]
        },
        {
            userName: "Vale",
            rankings: [
                { position: 18, castMember: "Thomas Krottinger" }, { position: 17, castMember: "Mitch Guerra" },
                { position: 16, castMember: "Bianca Roses" }, { position: 15, castMember: "Kamilla Karthigesu" },
                { position: 14, castMember: "Mary Zheng" }, { position: 13, castMember: "Shauhin Davari" },
                { position: 12, castMember: "Cedrek McFadden" }, { position: 11, castMember: "Saiounia 'Sai' Hughley" },
                { position: 10, castMember: "Stephanie Berger" }, { position: 9, castMember: "Justin Pioppi" },
                { position: 8, castMember: "Chrissy Sarnowsky" }, { position: 7, castMember: "Eva Erickson" },
                { position: 6, castMember: "Charity Nelms" }, { position: 5, castMember: "David Kinne" },
                { position: 4, castMember: "Kyle Fraser" }, { position: 3, castMember: "Kevin Leung" },
                { position: 2, castMember: "Star Toomey" }, { position: 1, castMember: "Joe Hunter" }
            ],
            score: hardcodedScores["Vale"]
        },
        {
            userName: "Danica W",
            rankings: [
                { position: 18, castMember: "Justin Pioppi" }, { position: 17, castMember: "Saiounia 'Sai' Hughley" },
                { position: 16, castMember: "Shauhin Davari" }, { position: 15, castMember: "Thomas Krottinger" },
                { position: 14, castMember: "Kevin Leung" }, { position: 13, castMember: "David Kinne" },
                { position: 12, castMember: "Kamilla Karthigesu" }, { position: 11, castMember: "Star Toomey" },
                { position: 10, castMember: "Bianca Roses" }, { position: 9, castMember: "Stephanie Berger" },
                { position: 8, castMember: "Eva Erickson" }, { position: 7, castMember: "Kyle Fraser" },
                { position: 6, castMember: "Joe Hunter" }, { position: 5, castMember: "Mary Zheng" },
                { position: 4, castMember: "Cedrek McFadden" }, { position: 3, castMember: "Charity Nelms" },
                { position: 2, castMember: "Mitch Guerra" }, { position: 1, castMember: "Chrissy Sarnowsky" }
            ],
            score: hardcodedScores["Danica W"]
        },
        {
            userName: "Cristina Miller",
            rankings: [
                { position: 18, castMember: "David Kinne" }, { position: 17, castMember: "Stephanie Berger" },
                { position: 16, castMember: "Justin Pioppi" }, { position: 15, castMember: "Kamilla Karthigesu" },
                { position: 14, castMember: "Charity Nelms" }, { position: 13, castMember: "Kevin Leung" },
                { position: 12, castMember: "Star Toomey" }, { position: 11, castMember: "Bianca Roses" },
                { position: 10, castMember: "Thomas Krottinger" }, { position: 9, castMember: "Kyle Fraser" },
                { position: 8, castMember: "Shauhin Davari" }, { position: 7, castMember: "Mary Zheng" },
                { position: 6, castMember: "Joe Hunter" }, { position: 5, castMember: "Mitch Guerra" },
                { position: 4, castMember: "Saiounia 'Sai' Hughley" }, { position: 3, castMember: "Eva Erickson" },
                { position: 2, castMember: "Chrissy Sarnowsky" }, { position: 1, castMember: "Cedrek McFadden" }
            ],
            score: hardcodedScores["Cristina Miller"]
        },
        {
            userName: "Izzy",
            rankings: [
                { position: 18, castMember: "Thomas Krottinger" }, { position: 17, castMember: "Mary Zheng" },
                { position: 16, castMember: "Justin Pioppi" }, { position: 15, castMember: "Eva Erickson" },
                { position: 14, castMember: "Kamilla Karthigesu" }, { position: 13, castMember: "Cedrek McFadden" },
                { position: 12, castMember: "Saiounia 'Sai' Hughley" }, { position: 11, castMember: "David Kinne" },
                { position: 10, castMember: "Bianca Roses" }, { position: 9, castMember: "Shauhin Davari" },
                { position: 8, castMember: "Kevin Leung" }, { position: 7, castMember: "Chrissy Sarnowsky" },
                { position: 6, castMember: "Kyle Fraser" }, { position: 5, castMember: "Star Toomey" },
                { position: 4, castMember: "Joe Hunter" }, { position: 3, castMember: "Stephanie Berger" },
                { position: 2, castMember: "Mitch Guerra" }, { position: 1, castMember: "Charity Nelms" }
            ],
            score: hardcodedScores["Izzy"]
        },
        {
            userName: "Andy",
            rankings: [
                { position: 18, castMember: "Charity Nelms" }, { position: 17, castMember: "Justin Pioppi" },
                { position: 16, castMember: "Thomas Krottinger" }, { position: 15, castMember: "Star Toomey" },
                { position: 14, castMember: "Kamilla Karthigesu" }, { position: 13, castMember: "Saiounia 'Sai' Hughley" },
                { position: 12, castMember: "Stephanie Berger" }, { position: 11, castMember: "Bianca Roses" },
                { position: 10, castMember: "Mitch Guerra" }, { position: 9, castMember: "Kevin Leung" },
                { position: 8, castMember: "Kyle Fraser" }, { position: 7, castMember: "Eva Erickson" },
                { position: 6, castMember: "David Kinne" }, { position: 5, castMember: "Chrissy Sarnowsky" },
                { position: 4, castMember: "Joe Hunter" }, { position: 3, castMember: "Cedrek McFadden" },
                { position: 2, castMember: "Mary Zheng" }, { position: 1, castMember: "Shauhin Davari" }
            ],
            score: hardcodedScores["Andy"]
        },
        {
            userName: "Aram",
            rankings: [
                { position: 18, castMember: "Thomas Krottinger" }, { position: 17, castMember: "Kamilla Karthigesu" },
                { position: 16, castMember: "Saiounia 'Sai' Hughley" }, { position: 15, castMember: "Justin Pioppi" },
                { position: 14, castMember: "Kyle Fraser" }, { position: 13, castMember: "Bianca Roses" },
                { position: 12, castMember: "Eva Erickson" }, { position: 11, castMember: "Shauhin Davari" },
                { position: 10, castMember: "Charity Nelms" }, { position: 9, castMember: "Star Toomey" },
                { position: 8, castMember: "Mitch Guerra" }, { position: 7, castMember: "Stephanie Berger" },
                { position: 6, castMember: "David Kinne" }, { position: 5, castMember: "Cedrek McFadden" },
                { position: 4, castMember: "Kevin Leung" }, { position: 3, castMember: "Mary Zheng" },
                { position: 2, castMember: "Joe Hunter" }, { position: 1, castMember: "Chrissy Sarnowsky" }
            ],
            score: hardcodedScores["Aram"]
        },
        {
            userName: "Alexandra Campanile",
            rankings: [
                { position: 18, castMember: "Kevin Leung" }, { position: 17, castMember: "Chrissy Sarnowsky" },
                { position: 16, castMember: "Cedrek McFadden" }, { position: 15, castMember: "Joe Hunter" },
                { position: 14, castMember: "Eva Erickson" }, { position: 13, castMember: "Shauhin Davari" },
                { position: 12, castMember: "Stephanie Berger" }, { position: 11, castMember: "Thomas Krottinger" },
                { position: 10, castMember: "Charity Nelms" }, { position: 9, castMember: "Kyle Fraser" },
                { position: 8, castMember: "Mitch Guerra" }, { position: 7, castMember: "Saiounia 'Sai' Hughley" },
                { position: 6, castMember: "Mary Zheng" }, { position: 5, castMember: "Star Toomey" },
                { position: 4, castMember: "David Kinne" }, { position: 3, castMember: "Bianca Roses" },
                { position: 2, castMember: "Justin Pioppi" }, { position: 1, castMember: "Kamilla Karthigesu" }
            ],
            score: hardcodedScores["Alexandra Campanile"]
        },
        {
            userName: "Campy",
            rankings: [
                { position: 18, castMember: "Justin Pioppi" }, { position: 17, castMember: "Eva Erickson" },
                { position: 16, castMember: "Charity Nelms" }, { position: 15, castMember: "Shauhin Davari" },
                { position: 14, castMember: "Kyle Fraser" }, { position: 13, castMember: "Stephanie Berger" },
                { position: 12, castMember: "Joe Hunter" }, { position: 11, castMember: "David Kinne" },
                { position: 10, castMember: "Mary Zheng" }, { position: 9, castMember: "Mitch Guerra" },
                { position: 8, castMember: "Kevin Leung" }, { position: 7, castMember: "Star Toomey" },
                { position: 6, castMember: "Cedrek McFadden" }, { position: 5, castMember: "Thomas Krottinger" },
                { position: 4, castMember: "Bianca Roses" }, { position: 3, castMember: "Saiounia 'Sai' Hughley" },
                { position: 2, castMember: "Chrissy Sarnowsky" }, { position: 1, castMember: "Kamilla Karthigesu" }
            ],
            score: hardcodedScores["Campy"]
        },
        {
            userName: "Ivette",
            rankings: [
                { position: 18, castMember: "Charity Nelms" }, { position: 17, castMember: "Chrissy Sarnowsky" },
                { position: 16, castMember: "Stephanie Berger" }, { position: 15, castMember: "Shauhin Davari" },
                { position: 14, castMember: "Thomas Krottinger" }, { position: 13, castMember: "Cedrek McFadden" },
                { position: 12, castMember: "Mary Zheng" }, { position: 11, castMember: "Star Toomey" },
                { position: 10, castMember: "David Kinne" }, { position: 9, castMember: "Bianca Roses" },
                { position: 8, castMember: "Kamilla Karthigesu" }, { position: 7, castMember: "Kyle Fraser" },
                { position: 6, castMember: "Kevin Leung" }, { position: 5, castMember: "Justin Pioppi" },
                { position: 4, castMember: "Eva Erickson" }, { position: 3, castMember: "Mitch Guerra" },
                { position: 2, castMember: "Saiounia 'Sai' Hughley" }, { position: 1, castMember: "Joe Hunter" }
            ],
            score: hardcodedScores["Ivette"]
        },
        {
            userName: "Caitlin",
            rankings: [
                { position: 18, castMember: "Kamilla Karthigesu" }, { position: 17, castMember: "Thomas Krottinger" },
                { position: 16, castMember: "Bianca Roses" }, { position: 15, castMember: "Star Toomey" },
                { position: 14, castMember: "David Kinne" }, { position: 13, castMember: "Stephanie Berger" },
                { position: 12, castMember: "Justin Pioppi" }, { position: 11, castMember: "Mary Zheng" },
                { position: 10, castMember: "Kevin Leung" }, { position: 9, castMember: "Chrissy Sarnowsky" },
                { position: 8, castMember: "Mitch Guerra" }, { position: 7, castMember: "Saiounia 'Sai' Hughley" },
                { position: 6, castMember: "Kyle Fraser" }, { position: 5, castMember: "Charity Nelms" },
                { position: 4, castMember: "Joe Hunter" }, { position: 3, castMember: "Cedrek McFadden" },
                { position: 2, castMember: "Eva Erickson" }, { position: 1, castMember: "Shauhin Davari" }
            ],
            score: hardcodedScores["Caitlin"]
        }
    ];

    useEffect(() => {
        if (viewMode === "results") {
            fetchResults();
        }
    }, [viewMode]);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const sortedSubmissions = submittedData.sort((a, b) => (b.score || 0) - (a.score || 0));
            setSubmissions(sortedSubmissions);
        } catch (error) {
            console.error("Error fetching results:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "30px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto" }}>
            {viewMode === "results" ? (
                <div>
                    <h1 style={{ textAlign: "center", color: "#2C3E50" }}>🏆 Survivor Rankings Results 🏆</h1>
                    {loading ? (
                        <p style={{ textAlign: "center" }}>Loading...</p>
                    ) : (
                        <>
                            <h2 style={{ color: "#27AE60", borderBottom: "2px solid #27AE60", paddingBottom: "5px" }}>
                                📊 Leaderboard
                            </h2>
                            {/* Scoring Rules Section */}
                            <div style={{
                                backgroundColor: "#ECF0F1",
                                padding: "15px",
                                borderRadius: "8px",
                                marginBottom: "20px",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                            }}>
                                <h3 style={{ color: "#2C3E50", marginBottom: "5px" }}>📌 Scoring Rules:</h3>
                                <ul style={{ paddingLeft: "20px", color: "#555", fontSize: "16px" }}>
                                    <li><strong>🤩 Exact Elimination Guess:</strong> +5 points</li>
                                    <li><strong>😁 One Position Off:</strong> +3 points</li>
                                    <li><strong>🙂 Two Positions Off:</strong> +1 point</li>
                                    <li><strong>🏆 Exact Top 3 Guess:</strong> +7 points</li>
                                </ul>
                            </div>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {submissions.map((submission, idx) => (
                                    <li key={submission.userName} style={{ marginBottom: "10px", fontSize: "18px" }}>
                                        <strong style={{ color: "#2980B9" }}>{idx + 1}. {submission.userName}</strong>
                                        <span style={{ float: "right", color: "#8E44AD" }}>Score: {submission.score}</span>
                                    </li>
                                ))}
                            </ul>

                            <h2 style={{ color: "#E67E22", borderBottom: "2px solid #E67E22", paddingBottom: "5px" }}>
                                📝 Detailed Submissions
                            </h2>
                            {submissions.map((submission) => (
                                <div key={submission.userName} style={{
                                    padding: "15px",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    marginBottom: "20px",
                                    backgroundColor: "#FAFAFA"
                                }}>
                                    <h3 style={{ color: "#C0392B" }}>{submission.userName} – Score: {submission.score}</h3>
                                    <ul>
                                        {submission.rankings.map((ranking) => (
                                            <li key={ranking.position} style={{ padding: "5px 0", fontSize: "16px" }}>
                                                <strong style={{ color: "#16A085" }}>{ranking.position}.</strong> {ranking.castMember}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <h1>🏆 Submit Your Rankings</h1>
                    <button onClick={() => setViewMode("results")}>📜 View Results</button>
                </div>
            )}
        </div>
    );
};

export default SurvivorRankingApp;


