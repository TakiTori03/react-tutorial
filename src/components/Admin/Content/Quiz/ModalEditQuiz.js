import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import { putEditQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';

import _ from 'lodash'

const ModalEditQuiz = (props) => {
    const { show, setShow, dataEdit } = props

    const handleClose = () => {
        setShow(false);
        setName("");
        setDescription("");
        setType("EASY");
        setImage("");
    }

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("EASY");
    const [image, setImage] = useState(dataEdit.image);
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        if (event ?? event.target ?? event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
            setPreviewImage("");
        }

        // console.log("upload file", event.target.files[0]);
    }

    const handleSubmitEditQuiz = async () => {
        //validate
        //call api
        const data = await putEditQuiz(dataEdit.id, description, name, type, image);
        console.log("==> res", data)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchQuiz();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    useEffect(() => {
        if (!_.isEmpty(dataEdit)) {
            //update state
            setName(dataEdit.name);
            setDescription(dataEdit.description);
            setType(dataEdit.type);

            if (dataEdit && dataEdit.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataEdit.image}`)
            }

        }
    }, [dataEdit])

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control" value={description} onChange={(event) => setDescription(event.target.value)} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Type</label>
                            <select className="form-select" onChange={(event) => setType(event.target.value)} value={type}>
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="DIFFICULT">DIFFICULT</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor='labelUpload'>
                                <FcPlus />Upload File Image</label>
                            <input
                                type='file'
                                hidden id="labelUpload"
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                : <span>Preview Image</span>
                            }

                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitEditQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditQuiz;