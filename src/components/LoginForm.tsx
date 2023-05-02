import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

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

  const handleRegister = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onRegister(phone, otp);
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onRequestOTP(phone);
      setShowOTPInput(true);
    } catch (error) {
      console.error("Error requesting OTP: ", error);
    }
  };

  return (
    <form onSubmit={showOTPInput ? handleLogin : handleRequestOTP}>
      <div>
        {!showOTPInput ? (
          <div>
            <Typography variant="body1" component="h2" gutterBottom>
              Login / Register
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Send
                </Button>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div>
            {isNewUser === true && (
              <p>Welcome, new user! Please enter the OTP sent to your phone.</p>
            )}
            {isNewUser === false && (
              <p>Welcome back! Please enter the OTP sent to your phone.</p>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="OTP"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                {isNewUser === false && (
                  <Button type="submit" variant="contained">
                    Login
                  </Button>
                )}
                {isNewUser === true && (
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                )}
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
