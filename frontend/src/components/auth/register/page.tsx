import { useState } from "react";
import { register } from "../../actions/auth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = { username, password };
    const response = await register(user);

    if(!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <span>
        Don't have an account?
        <a href="/login">Login</a>
      </span>
    </main>
  );
}
