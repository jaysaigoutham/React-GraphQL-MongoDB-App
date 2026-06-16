import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries'

const Register = ({ setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ createUser ] = useMutation(CREATE_USER, {
    onCompleted: () => {
      if (setError) setError('User created successfully')
    },
    onError: (error) => {
      if (setError) setError(error.message)
    }
  })

  const submit = async (e) => {
    e.preventDefault()
    try {
      await createUser({ variables: { username, password } })
    } catch (err) {
      console.error('Create user error', err)
    }
    setUsername('')
    setPassword('')
  }

  return (
    <section className="card">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input id="username" value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div style={{display: 'flex', gap: 8, marginTop: 8}}>
          <button type="submit" className="btn">Register</button>
          <button type="button" className="btn secondary" onClick={() => setUsername('')}>Reset</button>
        </div>
      </form>
    </section>
  )
}

export default Register
