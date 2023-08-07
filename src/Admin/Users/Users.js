import React, { useEffect, useState } from "react";
import './Users.scss';

const Users = () => {

    const [userData, setUserData] = useState([]);

    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:3000/Admin/Admin/users");
            const jsonData = await response.json();
            setUserData(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className="users">
            <h2 className="heading">Users</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Contact No.</th>
                            <th>Created Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((users, index) => (
                            <tr key={users.userid}>
                                <td>{users.userid}</td>
                                <td>{users.username}</td>
                                <td>{users.email}</td>
                                <td>{users.contact_number}</td>
                                <td>{users.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;