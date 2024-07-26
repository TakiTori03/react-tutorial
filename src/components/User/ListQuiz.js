import { useEffect } from "react";
import { useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import { toast } from "react-toastify";
import './ListQuiz.scss'
import { useNavigate } from "react-router-dom";

const ListQuiz = () => {
    const [listQuiz, setListQuiz] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        getListQuiz()
    }, []);

    const getListQuiz = async () => {
        const data = await getQuizByUser();

        if (data && data.EC === 0) {
            toast.success(data.EM);
            setListQuiz(data.DT);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }


    return (
        <div className="list-user-container container">
            {listQuiz && listQuiz.length > 0 &&
                listQuiz.map((quiz, item) => {
                    return (
                        <div key={`quiz-${item}`} className="card" style={{ width: "18rem" }}>
                            <img src={`data:image/jpeg;base64,${quiz.image}`} className="card-img-top" alt="quiz image" />
                            <div className="card-body">
                                <h5 className="card-title">{item + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button className="btn btn-primary" onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}>Start quiz</button>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}
export default ListQuiz;