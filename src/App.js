import { useEffect, useState } from "react";

const SPORTS_GAME_ODDS_API_KEY = process.env.REACT_APP_SPORTS_GAME_ODDS_API_KEY;

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSportsList = async () => {
      console.log("Fetching available sports from SGO API...");

      try {
        const res = await fetch(
          "https://api.sportsgameodds.com/v2/sports/",
          {
            headers: {
              "X-Api-Key": SPORTS_GAME_ODDS_API_KEY
            }
          }
        );
        const data = await res.json();
        console.log("✅ Available Sports (SGO v2):", data);
      } catch (e) {
        console.error("❌ Error fetching sports list:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsList();
  }, []);

  return (
    <div style={{ padding: 20, color: "white", backgroundColor: "black", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>SGO API – List Available Sports</h1>
      {loading ? (
        <p>Loading sports list...</p>
      ) : (
        <p>Done. Open browser console (F12) to view available sports with IDs.</p>
      )}
    </div>
  );
}

export default App;
