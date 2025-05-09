import { useEffect, useState } from "react";

const SPORTS_GAME_ODDS_API_KEY = process.env.REACT_APP_SPORTS_GAME_ODDS_API_KEY;

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeagues = async () => {
      console.log("Fetching leagues under sport: SOCCER");

      try {
        const res = await fetch(
          "https://api.sportsgameodds.com/v2/leagues?sportID=SOCCER",
          {
            headers: {
              "X-Api-Key": SPORTS_GAME_ODDS_API_KEY
            }
          }
        );
        const data = await res.json();
        console.log("✅ SGO Soccer Leagues:", data);
      } catch (e) {
        console.error("❌ Error fetching leagues:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  return (
    <div style={{ padding: 20, color: "white", backgroundColor: "black", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>SGO API – Soccer Leagues</h1>
      {loading ? (
        <p>Fetching leagues...</p>
      ) : (
        <p>Done. Check console (F12) to see valid leagueIDs.</p>
      )}
    </div>
  );
}

export default App;
