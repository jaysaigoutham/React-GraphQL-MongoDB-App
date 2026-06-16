import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from '../queries'

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [ changeNumber ] = useMutation(EDIT_NUMBER, {
    // If the mutation returns null, the target person didn't exist
    onCompleted: (data) => {
      if (!data.editNumber) {
        setError('person not found')
      }
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    try {
      await changeNumber({ variables: { name, phone } })
    } catch (error) {
      setError(error.message)
    }

    setName('')
    setPhone('')
  }

  return (
    <section className="card">
      <h2>Change number</h2>

      <form onSubmit={submit}>
        <div className="form-row">
          <label htmlFor="phone-name">Name</label>
          <input id="phone-name" value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div className="form-row">
          <label htmlFor="phone-number">Phone</label>
          <input id="phone-number" value={phone} onChange={({ target }) => setPhone(target.value)} />
        </div>
        <div style={{display: 'flex', gap: 8, marginTop: 8}}>
          <button type='submit' className="btn">Change number</button>
          <button type='button' className="btn secondary" onClick={() => { setName(''); setPhone(''); }}>Reset</button>
        </div>
      </form>
    </section>
  )
}

export default PhoneForm;