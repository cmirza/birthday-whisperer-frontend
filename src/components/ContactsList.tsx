import { useState } from "react";
import { ContactData } from "../api/contacts";
import EditContactForm from "./EditContactForm";

interface Props {
  contacts: ContactData[];
  onUpdate: (contactId: string, data: ContactData) => void;
  onDelete: (contactId: string) => void;
}

const ContactsList: React.FC<Props> = ({ contacts, onUpdate, onDelete }) => {
  const [editingContact, setEditingContact] = useState<string | null>(null);

  const handleEdit = (contactId: string) => {
    setEditingContact(contactId);
  };

  const handleCancel = () => {
    setEditingContact(null);
  };

  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {editingContact === contact._id ? (
              <EditContactForm
                contact={contact}
                onUpdate={onUpdate}
                onCancel={handleCancel}
              />
            ) : (
              <>
                {contact.name} - {contact.birthdate}
                <button onClick={() => contact._id && handleEdit(contact._id)}>
                  Edit
                </button>
                <button onClick={() => contact._id && onDelete(contact._id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;
