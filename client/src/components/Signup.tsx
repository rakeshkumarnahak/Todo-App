import { useState } from "react";
import { Button } from "@/components/ui/button";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    alert("Clicked the button");
  };
  return (
    <div style={{ justifyContent: "center", display: "flex", width: "100%" }}>
      <div>
        <h2>Signup</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        Already signed up? <Link to="/login">Login</Link>
        <Button onClick={handleSignup}>Signup</Button>
      </div>
    </div>
  );
};

export default Signup;
