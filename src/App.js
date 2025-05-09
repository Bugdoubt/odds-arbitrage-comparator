import { useEffect, useState } from "react";

const ODDS_API_KEY = process.env.REACT_APP_ODDS_API_KEY;
const SPORTS_GAME_ODDS_API_KEY = process.env.REACT_APP_SPORTS_GAME_ODDS_API_KEY;

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOdds = async () => {
      console.log("Testing raw API responses...");

      try {
        const res1 = await fetch(
          `https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?regions=eu&markets=h2h&apiKey=${ODDS_API_KEY}`
        );
        const data1 = await res1.json();
        console.log("✅ The Odds API (v4) response:", data1);

        const res2 = await fetch(
          "https://api.sportsgameodds.com/v2/odds?sport=soccer&period=match&market=h2h&region=eu",
          {
            headers: {
              "X-Api-Key": SPORTS_GAME_ODDS_API_KEY
            }
          }
        );
        const data2 = await res2.json();
        console.log("✅ Sports Game Odds API (v2) response:", data2);

      } catch (e) {
        console.error("❌ Error during API testing:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchOdds();
  }, []);

  return (
    <div style={{ padding: 20, color: "white", backgroundColor: "black", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Arbitrage Odds Finder – API Test</h1>
      {loading ? (
        <p>Loading and testing APIs...</p>
      ) : (
        <p>Done. Open your browser console (F12) to see the raw API responses.</p>
      )}
    </div>
  );
}

export default App;
