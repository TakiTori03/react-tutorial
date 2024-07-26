import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { FaMinusSquare } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import {
    getQuizWithQA, getAllQuizForAdmin,
    postUpSertQA
} from '../../../../services/apiService';
import { toast } from 'react-toastify';
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Lightbox from "yet-another-react-lightbox";

const QuizQA = (props) => {

    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({
        value: '',
        label: ''
    });

    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: '',
            imageName: '',
            imageFile: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        }
    ]);

    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })

    useEffect(() => {
        fetchQuiz();
    }, []);

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA();
        }
    }, [selectedQuiz])

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setQuestions(res.DT.qa);
        }
    }
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();

        if (res && res.EC === 0) {

            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz);
        }
    }

    const handlePreviewImage = (qId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === qId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                // url: questionsClone[index].imageFile,
                title: questionsClone[index].imageName
            })
            setIsPreviewImage(true);
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageName: '',
                imageFile: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestion]);

        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
        }

    }
    const handleAddRemoveAnswer = (type, qId, aId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };

            let index = questionsClone.findIndex(item => item.id === qId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === qId);
            if (index > -1) {
                questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== aId);
                setQuestions(questionsClone);
            }

        }

    }


    const handleOnChange = (type, qId, value) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'QUESTION') {
            let index = questionsClone.findIndex(item => item.id === qId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    }

    const handleAnswerQuestion = (type, qId, aId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === qId);
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(item => {
                if (item.id === aId) {
                    if (type === 'CHECKBOX') {
                        item.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        item.description = value;
                    }
                }
                return item;
            })
            setQuestions(questionsClone);
        }
    }
    const handleClickUploadFile = (qId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === qId);
        if (index > -1 && event && event.target && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }

    const handleSubmitQuestion = async () => {

        //validate 
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose quiz...");
            return;
        }
        //validate answer
        let isValidAnswer = true;

        for (let i = 0; i < questions.length; i++) {

            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers.description) {
                    isValidAnswer = false;
                    break;
                }
            }
            if (isValidAnswer === false) {
                break;
            }
        }

        if (isValidAnswer === false) {
            toast.error("Please input answer description...");
            return;
        }
        // validate question
        let isValidQuestion = true;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false;
                break;
            }
        }
        if (isValidQuestion === false) {
            toast.error("Please unput question description ...");
            return;
        }


        //submit question
        let questionsClone = _.cloneDeep(questions);
        console.log(questionsClone)
        // for (let i = 0; i < questionsClone.length; i++) {
        //     if (questionsClone[i].imageFile) {
        //         questionsClone[i].imageFile =
        //             await toBase64(questionsClone[i].imageFile)
        //     }
        // }

        let res = await postUpSertQA({
            quizId: selectedQuiz.value,
            questions: questionsClone
        });
        console.log("check res =>>", res)

    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    return (
        <div className="questions-container">

            <div className="add-new-question">
                <div className=' col-6 form-group'>
                    <label className='mb-2'>Select Quiz:</label>
                    <Select
                        options={listQuiz}
                        value={listQuiz.find((option) => {
                            return option.value === selectedQuiz.value;
                        })}
                        onChange={setSelectedQuiz}

                        label="Select quiz"
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add questions
                </div>
                {questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className='questions-content'>
                                    <div className='description'>
                                        <div className="form-floating ">
                                            <input type="type"
                                                className="form-control"
                                                value={question.description}
                                                placeholder="name@example.com"
                                                onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)} />
                                            <label >Question {index + 1}'s description</label>
                                        </div>
                                    </div>
                                    <div className='group-upload'>
                                        <label className='label-upload' htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='label-up' />
                                        </label>
                                        <input id={`${question.id}`}
                                            type={'file'} hidden
                                            onChange={(event) => handleClickUploadFile(question.id, event)} />
                                        <span>{question.imageFile
                                            ? <span style={{ cursor: "pointer" }}
                                                onClick={() => handlePreviewImage(question.id)}> picture for question-{question.id} </span>
                                            : "0 file is uploaded"}</span>
                                    </div>

                                    <div className='btn-add'>
                                        <span onClick={() => { handleAddRemoveQuestion('ADD', question.id) }}><FaPlus className='icon-add' /></span>
                                        {questions && questions.length > 1 &&
                                            <span onClick={() => { handleAddRemoveQuestion('REMOVE', question.id) }}><FaMinus className='icon-remove' /></span>}
                                    </div>

                                </div>
                                {question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answers-content'>
                                                <input className="form-check-input isCorrect"
                                                    type="checkbox" checked={answer.isCorrect}
                                                    onChange={(event) =>
                                                        handleAnswerQuestion('CHECKBOX', question.id, answer.id, event.target.checked)} />

                                                <div className="form-floating answer-name">
                                                    <input type="type" className="form-control"
                                                        placeholder="name@example.com"
                                                        value={answer.description}
                                                        onChange={(event) =>
                                                            handleAnswerQuestion('INPUT', question.id, answer.id, event.target.value)} />
                                                    <label >ANSWERS {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id, answer.id)}><IoIosAddCircle className='icon-add' /></span>

                                                    {question.answers && question.answers.length > 1 && <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}><FaMinusSquare className='icon-remove' /></span>}
                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        )
                    })
                }


            </div>
            <div className='submit'>
                <button className='btn btn-warning' onClick={() => handleSubmitQuestion()}>Submit</button>
            </div>

            <Lightbox
                open={isPreviewImage}
                plugins={[Zoom, Fullscreen]}
                close={() => setIsPreviewImage(false)}
                slides={[{ src: dataImagePreview.url }]}
                zoom={{
                    scrollToZoom: true,
                    maxZoomPixelRatio: 5
                }}
            />

        </div>
    )
}
export default QuizQA;