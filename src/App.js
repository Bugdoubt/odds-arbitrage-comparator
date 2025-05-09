import { useEffect, useState } from "react";

const ODDS_API_KEY = process.env.REACT_APP_ODDS_API_KEY;
const SPORTS_GAME_ODDS_API_KEY = process.env.REACT_APP_SPORTS_GAME_ODDS_API_KEY;

function App() {
  const [arbs, setArbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOdds = async () => {
      console.log("ODDS API KEY:", ODDS_API_KEY);
      console.log("SGO API KEY:", SPORTS_GAME_ODDS_API_KEY); // Debug line

      try {
        // Fetch from The Odds API
        const res1 = await fetch(
          `https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?regions=eu&markets=h2h&apiKey=${ODDS_API_KEY}`
        );
        const data1 = await res1.json();

        // Fetch from Sports Game Odds using v2 and header
        const res2 = await fetch(
          "https://api.sportsgameodds.com/v2/odds?sport=soccer&period=match&market=h2h&region=eu",
          {
            headers: {
              "X-Api-Key": SPORTS_GAME_ODDS_API_KEY
            }
          }
        );
        const data2 = await res2.json();

        if (!Array.isArray(data1) || !Array.isArray(data2)) {
          console.error("Invalid response format from one of the APIs");
          setLoading(false);
          return;
        }

        const arbitrages = [];

        for (const event1 of data1) {
          const teams1 = event1?.bookmakers?.[0]?.markets?.[0]?.outcomes.map(o => o.name).sort().join("");
          const match = data2.find(e => {
            const teams2 = e?.teams?.sort().join("");
            return teams1 && teams2 && teams1 === teams2;
          });

          if (!match) continue;

          const outcomes1 = event1.bookmakers[0]?.markets[0]?.outcomes || [];
          const outcomes2 = match.bookmakers?.[0]?.markets?.[0]?.outcomes || [];

          const combined = outcomes1.map((o1, i) => {
            const o2 = outcomes2[i];
            return {
              team: o1.name,
              odds1: o1.price,
              odds2: o2?.price || 0,
              best: Math.max(o1.price, o2?.price || 0),
            };
          });

          const impliedProb = combined.reduce((sum, o) => sum + 1 / o.best, 0);

          if (impliedProb < 1) {
            arbitrages.push({
              teams: event1.teams?.join(" vs ") || "Match",
              implied: impliedProb.toFixed(3),
              outcomes: combined,
            });
          }
        }

        setArbs(arbitrages);
      } catch (e) {
        console.error("Error fetching odds", e);
      } finally {
        setLoading(false);
      }
    };

    fetchOdds();
  }, []);

  return (
    <div style={{ padding: 20, color: "white", backgroundColor: "black", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Arbitrage Odds Finder</h1>
      {loading ? (
        <p>Loading odds...</p>
      ) : arbs.length === 0 ? (
        <p>No arbitrage opportunities found.</p>
      ) : (
        arbs.map((arb, idx) => (
          <div key={idx} style={{ backgroundColor: "#222", padding: 16, marginBottom: 12, borderRadius: 8 }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>{arb.teams}</h2>
            <p>Implied Probability: {arb.implied}</p>
            <ul style={{ marginTop: 10 }}>
              {arb.outcomes.map((o, i) => (
                <li key={i}>
                  {o.team}: {o.odds1} vs {o.odds2} → Best: {o.best}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
