import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiServices'

const ModalCreateUser = (props) => {
    const { show, setShow } = props;

    const handleClose = () => {
        setShow(false)
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER")
        setImage("")
        setPreviewImage("")
    };
    // const handleShow = () => setShow(true);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("USER")
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
        //  else
        //     setPreviewImage("")

    }
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


    const handleSubmitCreateUser = async () => {


        if (!password) {
            toast.error("Invalid password")
            return
        }
        let data = await postCreateNewUser(email, password, username, role, image)
        // console.log("component res:", data)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            // await props.fetchListUsers()
            props.setCurrentPage(1)
            await props.fetchListUsersWithPaginate(1, 6)
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Add new user
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop="static"
                className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-12 col-md-6">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-12 col-md-6">
                                <label>User name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)} />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label>Role</label>
                                <select
                                    className="form-control"
                                    onChange={(event) => setRole(event.target.value)}
                                    value={role}>
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-12 col-md-6">
                                <label className='form-label label-upload' htmlFor='LabelUpload'>
                                    Upload File Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id='LabelUpload'
                                    onChange={(event) => handleUploadImage(event)} />
                                <div className='col-md-12 img-preview'>
                                    {previewImage ?
                                        <img src={previewImage}></img>
                                        :
                                        <span>Preview img</span>
                                    }


                                </div>
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser