import { useState } from 'react';
import './ManageQuiz.scss'
import Select from 'react-select';
import { postCreateQuiz } from '../../../../services/apiService';
import React from 'react';
import { toast } from 'react-toastify';
import TableListQuiz from './TableListQuiz';
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA';
import AssignQuiz from './AsignQuiz';

const ManageQuiz = () => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'DIFICULT', label: 'DIFICULT' },
    ];

    const ref = React.useRef();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState(null);

    const handleChangeFile = (event) => {
        if (event ?? event.target ?? event.target.files[0]) {
            setImage(event.target.files[0]);
        } else {

        }
    }

    const handleSubmidCreateQuiz = async () => {
        let res = await postCreateQuiz(description, name, type?.value, image);
        ref.current.value = "";
        console.log("check res =>>>", res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setDescription('');
            setType('EASY');
            setImage(null);
        } else {
            toast.error(res.EM);
        }
    }
    return (
        <div className="quiz-container">


            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <div className="title">
                        <Accordion.Header> Manage quizzes</Accordion.Header>
                    </div>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add new quiz</legend>
                                <div className="form-floating mb-3">
                                    <input type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)} />
                                    <label >Name</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text"
                                        className="form-control"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label >Description</label>
                                </div>
                                <div className=' my-3'>
                                    <Select
                                        placeholder="Quiz type..."
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                    />
                                </div>
                                <div className='more-action form-group'>
                                    <label className='mb-1' >Up load file</label>
                                    <input type='file'
                                        className='form-control'
                                        ref={ref}
                                        onChange={(event) => handleChangeFile(event)} />
                                </div>
                                <div className='mt-3'>
                                    <button className='btn btn-warning'
                                        onClick={() => handleSubmidCreateQuiz()}>Save</button>
                                </div>

                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <TableListQuiz />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header> Update Q/A Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header> Assign user for quuiz</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>




    )
}

export default ManageQuiz;