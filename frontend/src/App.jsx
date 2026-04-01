import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hello/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      })
      .catch(() => setMessage("Error fetching message"));
  }, []);

  return (
    <div style={{ padding: "2rem", fontSize: "2rem" }}>
      {message}
    </div>
  );
}

export default App;
