
const TableUser = (props) => {

    const { listUsers } = props

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers && listUsers.length > 0 &&
                        listUsers.map((user, index) => {
                            return (<tr key={`table-user-${index}`}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="btn btn-secondary">View</button>
                                    <button className="btn btn-warning mx-3">Update</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>
                                Not Found Data
                            </td>
                        </tr>}
                </tbody>
            </table>
        </>
    )
}
export default TableUser