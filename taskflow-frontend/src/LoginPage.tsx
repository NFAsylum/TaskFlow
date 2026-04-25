import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from './api'
import { useAuth } from './AuthContext'
import { useThemes } from './useThemes'

function LoginPage() {
  const [isRegistering, setIsRegistering] = useState<boolean>(false)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const navigate = useNavigate()

  const { login } = useAuth()

  const { toggleDarkMode } = useThemes()

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
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-96 space-y-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <button
          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white p-2 rounded-lg cursor-pointer text-sm self-end"
          onClick={toggleDarkMode}
        >
          Theme
        </button>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isRegistering ? (
            <div className="flex flex-col">
              <label className="font-bold pr-4">Username</label>
              <input
                className="bg-gray-200 rounded-4xl px-2"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
              />
            </div>
          ) : (
            <></>
          )}

          <div className="flex flex-col">
            <label className="font-bold pr-4">Email</label>
            <input
              className="bg-gray-200 rounded-4xl px-2"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold pr-4">Password</label>
            <input
              className="bg-gray-200 rounded-4xl px-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          {isRegistering ? (
            <div className="flex flex-col">
              <label className="font-bold pr-4">Type password again</label>
              <input
                className="bg-gray-200 rounded-4xl px-2"
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
            className="bg-blue-600 text-white p-2 px-4 rounded-lg cursor-pointer w-full"
            type="submit"
          >
            Submit
          </button>
        </form>

        {isRegistering ? (
          <div>
            <button
              className="text-blue-600 dark:text-blue-400 underline cursor-pointer p-2"
              onClick={() => setIsRegistering(false)}
            >
              Login
            </button>
            <button className="bg-gray-200 dark:bg-gray-700 text-gray-500 p-2 rounded-lg">
              Register
            </button>
          </div>
        ) : (
          <div>
            <button className="bg-gray-200 dark:bg-gray-700 text-gray-500 p-2 rounded-lg">
              Login
            </button>
            <button
              className="text-blue-600 dark:text-blue-400 underline cursor-pointer p-2"
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
