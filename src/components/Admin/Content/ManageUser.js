import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss'
import { useState } from "react";
import TableUser from "./TableUser";
import { useEffect } from "react"
import { getAllUsers, getUserWithPaginate } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import { Link } from "react-router-dom";


const ManageUser = (props) => {
    const LIMIT_USER = 5;

    const [pageCount, setPageCount] = useState(0)

    const [currentPage, setCurrentPage] = useState(1)
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)

    const [showModalViewUser, setshowModalViewUser] = useState(false)

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [listUsers, setListUsers] = useState([])
    useEffect(() => {
        // fetchListUsers()
        fetchListUsersWithPaginate(1, LIMIT_USER);
    }, []);
    const fetchListUsers = async () => {
        let res = await getAllUsers()
        console.log("res.EC: ",res.EC)
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }
    const fetchListUsersWithPaginate = async (page, LIMIT_USER) => {
        let res = await getUserWithPaginate(page, LIMIT_USER)
        if (res.EC === 0) {
            console.log("respone.dt ", res.DT)
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true)
        setDataUpdate(user)

    }
    const handleClickBtnView = (user) => {
        setshowModalViewUser(true)
        setDataUpdate(user)

    }
    const resetUpdateData = () => {
        setDataUpdate({})
    }
    const handleClickBtnDelete = (user)=> {
        setShowModalDeleteUser(true)
        setDataDelete(user)
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
                    <TableUserPaginate
                    listUsers={listUsers}
                    handleClickBtnUpdate={handleClickBtnUpdate}
                    handleClickBtnDelete={handleClickBtnDelete}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    pageCount={pageCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    />

                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    />

                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setshowModalViewUser}
                    dataUpdate={dataUpdate}
                    // fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                />
                <ModalDeleteUser
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                dataDelete={dataDelete}
                fetchListUsers={fetchListUsers}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}
export default ManageUser;