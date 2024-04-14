import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuizByAdmin } from '../../../../services/apiServices';

const ModalDeleteQuiz=(props)=> {
  const {show, setShow, dataDelete} = props;

  const handleClose = () => setShow(false);
 

  const handleSubmitDeletequiz = async ()=> {
   
    let data = await deleteQuizByAdmin(dataDelete.id)

    if (data && data.EC === 0) {
        toast.success(data.EM)
        handleClose()
      
        await props.fetchQuiz()
    }
    if (data && data.EC !== 0) {
        toast.error(data.EM)
    }
  }

  return (
    <>
    
      <Modal 
      show={show} 
      onHide={handleClose}
      backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure delete quiz:<b>{dataDelete && dataDelete.id ? dataDelete.id : ""}</b> </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=> handleSubmitDeletequiz()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteQuiz;