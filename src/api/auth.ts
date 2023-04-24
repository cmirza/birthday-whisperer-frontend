interface RequestOTPData {
  phone: string;
}

interface VerifyOTPData {
  phone: string;
  otp: string;
}

export const requestOTP = async (data: RequestOTPData) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/request-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Request OTP failed");
  }

  return response.json();
};

export const verifyOTPLogin = async (data: VerifyOTPData) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/verify-otp/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

export const verifyOTPRegister = async (data: VerifyOTPData) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/verify-otp/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};
