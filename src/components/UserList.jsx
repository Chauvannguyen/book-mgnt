import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // useEffect(callbackfn, []); => mouting: Gọi 1 lần duy nhất khi component được gắn vào DOM
    useEffect(() => {
        // Promise: pending, fullfiled va reject
        // async va await
        axios
            .get('http://localhost:3000/users')
            .then((response) => setUsers(response.data))
            .catch((error) => {
                if (error.code === 'ERR_NETWORK') {
                    setError('Không có kết nối Internet');
                }
            });
    }, []);

    const handleViewDetail = (userId) => {
        navigate(`/users/${userId}`);
    };

    const handleDelete = async (id) => {
        console.log('Xoa user', id);
        if (window.confirm('Bạn có thực sự muốn xóa người dùng này không?')) {
            await axios.delete(`http://localhost:3000/users/${id}`);
            setUsers((prevState) => prevState.filter((item) => item.id !== id));
            alert('Xóa người dùng thành công!');
        }
    };


    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between mb-3">
                <h1>Users</h1>
                <button
                    className="btn btn-success"
                    onClick={() => navigate('/users/create')}
                >
                    Add User
                </button>
            </div>
            {users.length === 0 ? (
                <p>Không có dữ liệu.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th style={{width: '180px'}}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td className="d-flex gap-lg-4 justify-content-center">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/users/edit/${item.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-info"
                                    onClick={() => handleViewDetail(item.id)}
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}


        </div>
    );
};

export default UserList;