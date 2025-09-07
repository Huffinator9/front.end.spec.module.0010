// src/components/LogoutButton.jsx

import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

function LogoutButton() {
  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
