import { useEffect,useState } from "react";  
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
    const { AuthorizationToken } = useAuth();
    const [contacts, setContacts] = useState([]);

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: AuthorizationToken,
                }
            });
            const data = await response.json();
            if (response.ok) {
                // Remove the deleted contact from the state
                setContacts(prev => prev.filter(contact => contact._id !== id));
                toast.success("Contact deleted successfully");
            } else {
                console.error("Failed to delete contact:", data.message);
                toast.error("Failed to delete contact: " + data.message);
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    const getAllContactsData = async () =>{
        try {
            const response = await fetch("http://localhost:8000/admin/contacts",{
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken, 
                }   
            });
            const data = await response.json();
            console.log("All contacts data:", data);
            setContacts(data.contacts || []);
        } catch (error) {
            console.error("Error fetching contacts data:", error);
        }
    };

    useEffect(() =>{
        getAllContactsData();
    },[]);
    return (<>
        <section className="admin_contacts_section">
        <div className="container admin_contacts">
            <div className="container">
                <h1>Admin Contacts Page</h1>
            </div>
            <table className="contacts_table">
                <thead className="table_head">
                    <tr className="table_row">
                        <th className="column_name">Name</th>
                        <th className="column_name">Email</th>
                        <th className="column_name">Message</th>
                        <th className="column_name">Date</th>
                        <th className="column_name">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts && contacts.map((contact, index) => {
                        return <tr key={contact._id || index} className="table_row">
                            <td className="table_data contact">{contact.name}</td>
                            <td className="table_data contact">{contact.email}</td>
                            <td className="table_data contact">{contact.message}</td>
                            <td className="table_data contact">{new Date(contact.createdAt).toLocaleDateString()}</td>
                            <td className="table_data contact">
                                <button 
                                    className="delete_button btn btn-danger"
                                    onClick={() => deleteContact(contact._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            </div>
        </section>
    </>
    );
};