import { useQuery, useApolloClient } from "@apollo/client";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import PhoneForm from "./Components/PhoneForm";
import Notify from "./Components/Notify";
import { useState } from "react";
import LoginForm from "./Components/LoginForm";
import Register from "./Components/Register";
import { ALL_PERSONS } from "./queries";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("phonebook-user-token"),
  );
  // use a single Apollo client instance to allow cache resets on logout
  const client = useApolloClient();

  // Polling keeps the UI reasonably fresh without requiring manual refetches
  const result = useQuery(ALL_PERSONS, { pollInterval: 15000 });

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  // If no token, show auth forms only — avoids unnecessary data fetching
  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
        <Register setError={notify} />
      </div>
    );
  }

  if (result.loading) return <>loading...</>;

  if (result.error) {
    return <div>Error: {result.error.message}</div>;
  }

  const persons = result.data?.allPersons || [];
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Phonebook</h1>
        <div>
          <button className="btn secondary" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <Notify errorMessage={errorMessage} />

      <PersonForm setError={notify} />
      <Persons persons={persons} setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};
export default App;
