import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss'
import { useState } from "react";
import TableUser from "./TableUser";
import { useEffect } from "react"
import { getAllUsers } from "../../../services/apiServices";

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

    const [listUsers, setListUsers] = useState([])
    useEffect(() => {
        fetchListUsers()
    }, []);
    const fetchListUsers = async () => {
        let res = await getAllUsers()
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage Users
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary"
                        onClick={() => setShowModalCreateUser(true)}>
                        Add new user
                    </button>
                </div>
                <div className="table-users-container">
                    <TableUser listUsers={listUsers} />

                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers} />
            </div>
        </div>
    )
}
export default ManageUser;