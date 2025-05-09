import { useEffect } from "react";

const SPORTS_GAME_ODDS_API_KEY = process.env.REACT_APP_SPORTS_GAME_ODDS_API_KEY;

function TestSGO() {
  useEffect(() => {
    const testFetch = async () => {
      console.log("Testing Sports Game Odds API...");
      try {
        const res = await fetch(
          "https://api.sportsgameodds.com/v1/odds?sport=soccer&period=match&market=h2h&region=eu",
          {
            headers: {
              "X-Api-Key": SPORTS_GAME_ODDS_API_KEY
            }
          }
        );
        const data = await res.json();
        console.log("✅ SGO API Response:", data);
      } catch (err) {
        console.error("❌ SGO API fetch failed:", err);
      }
    };

    testFetch();
  }, []);

  return (
    <div style={{ padding: 20, color: "white", backgroundColor: "black", minHeight: "100vh" }}>
      <h2>Sports Game Odds API Test</h2>
      <p>Check the browser console for the result.</p>
    </div>
  );
}

export default TestSGO;
