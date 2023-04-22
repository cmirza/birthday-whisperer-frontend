import { useState } from "react";
import { ContactData } from "../api/contacts";

interface Props {
    onAdd: (data: ContactData) => void;
}

const AddContactForm: React.FC<Props> = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({ name, birthdate });
        setName("");
        setBirthdate("");
    };

    return (
        <div>
            <h2>Add Contact</h2>
            <form onSubmit={handleAdd}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Birthdate:
                    <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                </label>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddContactForm;
