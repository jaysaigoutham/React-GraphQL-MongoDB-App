import { useQuery } from "@apollo/client";
import { useState } from "react";
import { FIND_PERSON } from "../queries";




const Persons = ({ persons, onClose }) => {
  const [nameToSearch, setNameToSearch] = useState(null);

  useEffect(() => {
    console.log("nameToSearch changed:", nameToSearch);
  }, [nameToSearch]);

  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    const person = result.data.findPerson;

    return (
      <section className="card">
        <h2>Find Person</h2>
        {person ? (
          <div className="persons-list">
            <div key={person.id}>
              <div>
                <strong>{person.name}</strong>
                <div style={{color: 'var(--text)'}}>{person.phone}</div>
                <div style={{marginTop:6}}>{person.address?.street}, {person.address?.city}</div>
              </div>
            </div>
          </div>
        ) : (
          <div>Person not found</div>
        )}
        <div style={{marginTop:12}}>
          <button className="btn secondary" onClick={() => { setNameToSearch(null); if (onClose) onClose(); }}>Close</button>
        </div>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Persons</h2>
      <div className="persons-list">
        {persons.map((p) => (
          <div className="person-item" key={p.id}>
            <div>
              <strong>{p.name}</strong>
              <div className="meta">{p.phone}</div>
            </div>
            <div>
              <button className="btn secondary" onClick={() => setNameToSearch(p.name)}>Show address</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:12}}>
        <button className="btn secondary" onClick={onClose}>Close</button>
      </div>
    </section>
  );
};

export default Persons;
