import { useState } from 'react'
import LoginForm from './components/LoginForm'
import { login, register } from './api/auth'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.token);
      console.log('Login success: ', response);
    } catch (error) {
      console.log('Login error: ', error);
    }
  };

  const handleRegister = async (email: string, password: string, phone: string) => {
    try {
      const response = await register({ email, password, phone });
      localStorage.setItem('token', response.token);
      console.log('Register response:', response);
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Login / Register</h1>
      <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
    </div>
  )
}

export default App
