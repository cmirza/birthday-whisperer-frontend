import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState(true);

  const isPhoneValid = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const isOTPValid = (otp: string) => {
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otp);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOTPValid(otp)) {
      onLogin(phone, otp);
    } else {
      setError(true);
      setErrorMessage("Please enter a valid OTP.");
    }
  };

  const handleRegister = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (isOTPValid(otp)) {
      onRegister(phone, otp);
    } else {
      setError(true);
      setErrorMessage("Please enter a valid OTP.");
    }
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPhoneValid(phone)) {
      try {
        await onRequestOTP(phone);
        setShowOTPInput(true);
      } catch (error) {
        console.error("Error requesting OTP: ", error);
      }
    } else {
      setError(true);
      setErrorMessage("Please enter a valid phone number.");
    }
  };

  const handleCloseError = () => {
    setError(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeMessage(false);
    }, 15000); // 15 seconds
  
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
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
                <p>
                  Welcome, new user! Please enter the OTP sent to your phone.
                </p>
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
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
      open={welcomeMessage}
      autoHideDuration={15000}
      onClose={() => setWelcomeMessage(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={() => setWelcomeMessage(false)} severity="info">
        Welcome! Please enter your phone number to register if you're new or login if you're a returning user.
      </Alert>
    </Snackbar>
    </>
  );
};

export default LoginForm;
