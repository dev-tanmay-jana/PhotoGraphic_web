import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useAuth } from "../store/auth";    

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const { AuthorizationToken,API } = useAuth();

    const getAllUsersData = async () => {
        try {
            const response = await fetch(`${API}/admin/users`, {
                method: "GET",
                headers: {
                    "Authorization": AuthorizationToken,
                }
            });
            const data = await response.json();
            // console.log("All users data:", data);
            setUsers(data.users || []);
        } catch (error) {
            console.error("Error fetching users data:", error);
        }
    };

// delete user by id
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: AuthorizationToken,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            // console.log("User deleted successfully:", data);
            
            // Refresh the users list after successful deletion
            if(response.ok){
                await getAllUsersData();
            }
        } catch (error) {
            console.error("Error deleting user:", error.message);
            // You might want to show this error to the user through a notification
        }
    };

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (<>
        <section className="admin_users_section">
        <div className="container admin_users">
            <div className="container">
                <h1>Admin Users Page</h1>
            </div>
            <table className="users_table">
                <thead className="table_head">
                    <tr className="table_row">
                        <th className="column_name">Username</th>
                        <th className="column_name">Email</th>
                        <th className="column_name">Phone</th>
                        <th className="column_name">Is Admin</th>
                        <th className="column_name">Update</th>
                        <th className="column_name">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, index) => {
                        return <tr key={user._id || index} className="table_row">
                            <td className="table_data user">{user.username}</td>
                            <td className="table_data user">{user.email}</td>
                            <td className="table_data user">{user.phone}</td>
                            <td className="table_data user">{user.isAdmin ? "Yes" : "No"}</td>
                            <td className="table_data user"><Link to={`/admin/users/update/${user._id}`}><button type="button" className="btn btn-success">Update</button></Link></td>
                            <td className="table_data user"><button onClick={() => deleteUser(user._id)} type="button" className="btn btn-danger">Delete</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
        </section>
        </>
    );
};