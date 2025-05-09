import { useEffect, useState } from "react";

const SPORTS_GAME_ODDS_API_KEY = process.env.REACT_APP_SPORTS_GAME_ODDS_API_KEY;

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOddsByLeague = async () => {
      console.log("Fetching odds for UEFA Champions League...");

      try {
        const res = await fetch(
          "https://api.sportsgameodds.com/v2/odds?leagueID=UEFA_CHAMPIONS_LEAGUE",
          {
            headers: {
              "X-Api-Key": SPORTS_GAME_ODDS_API_KEY
            }
          }
        );
        const data = await res.json();
        console.log("✅ Odds for UCL:", data);
      } catch (e) {
        console.error("❌ Error fetching odds by leagueID:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchOddsByLeague();
  }, []);

  return (
    <div style={{ padding: 20, color: "white", backgroundColor: "black", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>SGO API – UEFA Champions League Odds</h1>
      {loading ? (
        <p>Fetching odds...</p>
      ) : (
        <p>Done. Check console (F12) to view odds data.</p>
      )}
    </div>
  );
}

export default App;
