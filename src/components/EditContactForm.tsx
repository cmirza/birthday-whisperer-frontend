import { useState } from 'react';
import { ContactData } from '../api/contacts';

interface Props {
    contact: ContactData;
    onUpdate: (contactId: string, data: ContactData) => void;
    onCancel: () => void;
}

const EditContactForm: React.FC<Props> = ({ contact, onUpdate, onCancel }) => {
    const [name, setName] = useState(contact.name);
    const [birthdate, setBirthdate] = useState(new Date(contact.birthdate).toISOString().slice(0, 10));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (contact._id) {
            onUpdate(contact._id, { name, birthdate });
            onCancel();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Birthdate:
                <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditContactForm;
