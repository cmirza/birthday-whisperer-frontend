import { useState } from "react";

interface Props {
  onLogin: (phone: string, otp: string) => void;
  onRegister: (phone: string, otp: string) => void;
  onRequestOTP: (phone: string) => void;
  isNewUser: boolean | null;
}

const LoginForm: React.FC<Props> = ({
  onLogin,
  onRegister,
  onRequestOTP,
  isNewUser,
}) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(phone, otp);
  };

  const handleRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    onRegister(phone, otp);
  };

  const handleRequestOTP = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await onRequestOTP(phone);
      setShowOTPInput(true);
    } catch (error) {
      console.error("Error requesting OTP: ", error);
    }
  };

  return (
    <div>
      {!showOTPInput ? (
        <div>
          <h2>Login / Register</h2>
          <label>
            Phone:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleRequestOTP}>
            Send
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          {isNewUser === true && (
            <p>Welcome, new user! Please enter the OTP sent to your phone.</p>
          )}
          {isNewUser === false && (
            <p>Welcome back! Please enter the OTP sent to your phone.</p>
          )}
          <label>
            OTP:
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </label>

          {isNewUser === false && <button type="submit">Login</button>}
          {isNewUser === true && (
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default LoginForm;
