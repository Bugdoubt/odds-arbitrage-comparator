import { useEffect, useState } from "react";

const SPORTS_GAME_ODDS_API_KEY = process.env.REACT_APP_SPORTS_GAME_ODDS_API_KEY;

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoccerOdds = async () => {
      console.log("Fetching SGO soccer odds...");

      try {
        const res = await fetch(
          "https://api.sportsgameodds.com/v2/odds?sportID=SOCCER",
          {
            headers: {
              "X-Api-Key": SPORTS_GAME_ODDS_API_KEY
            }
          }
        );
        const data = await res.json();
        console.log("✅ SGO SOCCER odds:", data);
      } catch (e) {
        console.error("❌ Error fetching soccer odds:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchSoccerOdds();
  }, []);

  return (
    <div style={{ padding: 20, color: "white", backgroundColor: "black", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>SGO API – Soccer Odds</h1>
      {loading ? (
        <p>Fetching soccer odds...</p>
      ) : (
        <p>Done. Check console (F12) for raw soccer odds data.</p>
      )}
    </div>
  );
}

export default App;
