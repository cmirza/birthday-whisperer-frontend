interface LoginData {
    email: string;
    password: string;
}

interface RegisterData extends LoginData {
    phone: string;
}

export const login = async (data: LoginData) => {
    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
};

export const register = async (data: RegisterData) => {
    const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return response.json();
};
