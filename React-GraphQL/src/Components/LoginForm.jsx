import { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const client = useApolloClient()

  const [ login ] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data?.login?.value
      if (token) {
        setToken(token)
        localStorage.setItem('phonebook-user-token', token)
        client.resetStore()
      } else {
        setError('Login failed: no token returned')
      }
    },
    onError: (error) => {
      setError(error.message)
    }
  })

  // Submit credentials to the server via the LOGIN mutation
  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <section className="card">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div className="form-row">
          <label htmlFor="login-username">Username</label>
          <input
            id="login-username"
            value={username}
            placeholder="your username"
            autoFocus
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type='password'
            value={password}
            placeholder="••••••••"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div style={{display: 'flex', gap: 8, marginTop: 8}}>
          <button type='submit' className="btn">Login</button>
          <button type='button' className="btn secondary" onClick={() => { setUsername(''); setPassword(''); }}>Reset</button>
        </div>
      </form>
    </section>
  )
}

export default LoginForm