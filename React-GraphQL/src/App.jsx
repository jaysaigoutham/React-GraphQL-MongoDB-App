import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import PhoneForm from "./Components/PhoneForm";
import Notify from "./Components/Notify";
import { useState } from "react";

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const result = useQuery(ALL_PERSONS, {
    pollInterval: 15000,
  });

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (result.loading) {
    return <>loading...</>;
  }

  if (result.error) {
    return <div>Error: {result.error.message}</div>;
  }

  const persons = result.data?.allPersons || [];

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <div></div>
      <PersonForm setError={notify}></PersonForm>
      <div></div>
      <Persons persons={persons} onClose={null} setError={notify}></Persons>
      <div></div>
      <PhoneForm setError={notify}/>
    </>
  );
};
export default App;
