import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from "lodash"
const ModalViewUser = (props) => {
    const { show, setShow, dataUpdate, resetUpdateData } = props;

    const handleClose = () => {
        setShow(false)
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER")
        setImage("")
        setPreviewImage("")
        resetUpdateData()
    };

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("USER")
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            //update state
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role)
            setImage("")
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }


        }
    }, [dataUpdate])

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop="static"
                className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>=View user</Modal.Title>
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
                                    disabled
                                    onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    disabled
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
                                    disabled
                                    onChange={(event) => setUsername(event.target.value)} />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label>Role</label>
                                <select
                                    disabled
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
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser