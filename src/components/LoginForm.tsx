import { useState } from "react";

interface Props {
    onLogin: (email: string, password: string) => void;
    onRegister: (email: string, password: string, phone: string) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin, onRegister }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    };

    const handleRegister = (e: React.MouseEvent) => {
        e.preventDefault();
        onRegister(email, password, phone);
    };

    return (
        <div>
            <h2>Login / Register </h2>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    Phone:
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </label>
                <button type="submit">Login</button>
                <button type="button" onClick={(e) => handleRegister(e)}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
