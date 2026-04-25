import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from './api'
import { useAuth } from './AuthContext'

function LoginPage() {
  const [isRegistering, setIsRegistering] = useState<boolean>(false)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const navigate = useNavigate()

  const { login } = useAuth()

  async function handleRegister(name: string, email: string, password: string) {
    try {
      await registerUser(name, email, password)

      await handleLogin(email, password)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleLogin(email: string, password: string) {
    try {
      const token = await loginUser(email, password)
      login(token)

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit(submitEvent: React.SubmitEvent<HTMLFormElement>) {
    submitEvent.preventDefault()

    if (isRegistering && password != passwordConfirmation) {
      return
    }

    if (isRegistering) {
      handleRegister(name, email, password)
    } else {
      handleLogin(email, password)
    }

    setName('')
    setEmail('')
    setPassword('')
    setPasswordConfirmation('')
  }

  return (
    <div>
      <div className="size-100 bg-blue-950 rounded-4xl content-center">
        <form onSubmit={handleSubmit}>
          {isRegistering ? (
            <div>
              <label className="font-bold pr-4">Username</label>
              <input
                className="bg-gray-200 rounded-4xl"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
              />
            </div>
          ) : (
            <></>
          )}

          <div>
            <label className="font-bold pr-4">Email</label>
            <input
              className="bg-gray-200 rounded-4xl"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div>
            <label className="font-bold pr-4">Password</label>
            <input
              className="bg-gray-200 rounded-4xl"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          {isRegistering ? (
            <div>
              <label className="font-bold pr-4">Type password again</label>
              <input
                className="bg-gray-200 rounded-4xl"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Password"
              />
              {password != passwordConfirmation ? (
                <label className="font-bold text-xs pr-2 text-red-500">
                  Passwords don't match
                </label>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}

          <button
            className="bg-gray-400 m-2 p-3 rounded-2xl cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </form>

        {isRegistering ? (
          <div>
            <button
              className="bg-blue-300 p-2 rounded-2xl"
              onClick={() => setIsRegistering(false)}
            >
              Login
            </button>
            <button className="bg-gray-800 p-2 rounded-2xl">Register</button>
          </div>
        ) : (
          <div>
            <button className="bg-gray-800 p-2 rounded-2xl">Login</button>
            <button
              className="bg-blue-300 p-2 rounded-2xl"
              onClick={() => setIsRegistering(true)}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginPage
