export interface ContactData {
    _id?: string;
    name: string;
    birthdate: string;
}

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
};

export const addContact = async (data: ContactData) => {
    const response = await fetch('http://localhost:3000/api/contacts', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Adding contact failed');
    }

    return response.json();
};

export const deleteContact = async (contactId: string) => {
    const response = await fetch(`http://localhost:3000/api/contacts/${contactId}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error('Deleting contact failed');
    }

    return response.json();
};

export const updateContact = async (contactId: string, data: ContactData) => {
    const response = await fetch(`http://localhost:3000/api/contacts/${contactId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Updating contact failed');
    }

    return response.json();
};

export const getContacts = async () => {
    const response = await fetch('http://localhost:3000/api/contacts', {
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error('Fetching contacts failed');
    }

    const data = await response.json();
    console.log("getContacts response data:", data);
    return Array.isArray(data.contacts) ? data.contacts : [];
};
