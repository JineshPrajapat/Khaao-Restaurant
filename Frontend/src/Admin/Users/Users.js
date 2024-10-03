import React, { useEffect, useState } from "react";
import './Users.scss';
import { baseURL } from "../../config/api";
import { fetchData } from "../../FetchData/fetchData";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Users = () => {

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchData(`${baseURL}/admin/getusers`, setUserData)
    })

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
    };

    const formatTime = (dateString) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    return (
        <div className="users">
            <h2 className="heading">Users</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>Contact</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user) => (
                            <tr key={user.userid}>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <i class="fa-solid fa-user text-xl rounded-full p-2 text-white bg-black"></i>
                                        <div>{user.username}
                                            <br />
                                            <small className="text-gray-500 whitespace-nowrap">kh-{user.userid}</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className=" whitespace-nowrap"><i className="fas fa-envelope pr-2 "></i>{user.email}</div>
                                    <i className="fas fa-phone pr-2"></i> <small className="text-gray-500">{user.contact_number}</small>
                                </td>
                                <td>
                                    {formatDate(user.date)}
                                    <br />
                                    <small className="text-gray-500">{formatTime(user.date)}</small>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;