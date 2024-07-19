import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiService';
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete, fetchListUser } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteUser = async () => {
        const data = await deleteUser(dataDelete.id);
        console.log("==> res", data)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            props.fetchListUser();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete User </Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you want to delete user <b>
                    {dataDelete && dataDelete.email && dataDelete.email ? dataDelete.email : " "}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cant
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteUser}>

                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;