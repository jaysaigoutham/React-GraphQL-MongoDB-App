import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_PERSON, ALL_PERSONS } from "../queries";



const PersonForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    //Approch 1 
    //refetchQueries: [{ query: ALL_PERSONS}],

    //Approach 2 
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(response.data.addPerson),
        };
      });
    },
    onError: (error) => setError(error.message),
  });

  const submit = async (event) => {
    event.preventDefault();

    try {
      //await createPerson({ variables: { name, street, city, phone } });
      await createPerson({
      variables: {
        name,
        street,
        city,
        phone: phone.length > 0 ? phone : undefined,
      },
    })
    } catch (e) {
      console.error('Create person error', e);
      if (setError && typeof setError === 'function') {
        setError(e.message);
      }
    }

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <section className="card">
      <h2>Create new person</h2>
      <form onSubmit={submit}>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input id="name" value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div className="form-row">
          <label htmlFor="phone">Phone</label>
          <input id="phone" value={phone} onChange={({ target }) => setPhone(target.value)} />
        </div>
        <div className="form-row">
          <label htmlFor="street">Street</label>
          <input id="street" value={street} onChange={({ target }) => setStreet(target.value)} />
        </div>
        <div className="form-row">
          <label htmlFor="city">City</label>
          <input id="city" value={city} onChange={({ target }) => setCity(target.value)} />
        </div>
        <div style={{display: 'flex', gap: 8, marginTop: 8}}>
          <button type="submit" className="btn">Add</button>
          <button type="button" className="btn secondary" onClick={() => {setName(''); setPhone(''); setStreet(''); setCity('');}}>Reset</button>
        </div>
      </form>
    </section>
  );
};


export default PersonForm
