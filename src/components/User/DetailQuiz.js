import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import { toast } from "react-toastify";
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from "./Question";
import ModalResult from "./ModalResult";

const DetailQuiz = () => {
    const param = useParams();
    const location = useLocation();

    const quizId = param.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [curQuestion, setCurQuestion] = useState(0);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({})
    useEffect(() => {
        fetchDataQuestions();
    }, [quizId]);

    const fetchDataQuestions = async () => {
        const res = await getDataQuiz(quizId);

        if (res && res.EC === 0) {
            toast.success(res.EM);
            let rawData = res.DT;
            // let data = 

            setDataQuiz(_.chain(rawData)
                .groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    })
                    return { questionId: key, answers, questionDescription, image }
                })
                .value());
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }

    }

    const handleClickNext = () => {
        if (dataQuiz && dataQuiz.length > curQuestion + 1) {
            setCurQuestion(curQuestion + 1);
        }
    }
    const handleClickPrev = () => {
        if (curQuestion > 0) {
            setCurQuestion(curQuestion - 1);
        }
    }

    const handleClickFinish = async () => {
        console.log("check dataquiz", dataQuiz);

        let payload = {
            quizId: +quizId,
            answers: [],
        }

        let a = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];
                //xu li answer user

                question.answers.forEach(a => {
                    if (a.isSelected) {
                        userAnswerId.push(a.id);
                    }
                })
                a.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = a;

            let res = await postSubmitQuiz(payload);
            console.log("check dap an =>>>", res)
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true);
            } else {
                alert('Wrong something ...')
            }
        }
    }

    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === + questionId)
        if (question && question.answers) {
            question.answers = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })


        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }

    }

    return (
        <div className="detail-quiz-container container mt-5">
            <div className="left-content">
                <div className="title">
                    Quiz{quizId} : {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <Question data={
                        dataQuiz && dataQuiz.length > 0
                            ? dataQuiz[curQuestion]
                            : []
                    }
                        handleCheckBox={handleCheckBox}
                        index={curQuestion} />
                </div>
                <div className="footer">
                    <button className="btn btn-primary"
                        onClick={() => handleClickPrev()}>Prev</button>
                    <button className="btn btn-secondary"
                        onClick={() => handleClickNext()}>Next</button>
                    <button className="btn btn-warning"
                        onClick={() => handleClickFinish()}>Finish</button>
                </div>
            </div>

            <div className="right-content">

            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>

    )
}
export default DetailQuiz;