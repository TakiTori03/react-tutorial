import axios from '../utils/axiosCustomize';
const postCreateNewUser = (email, password, username, role, image) => {
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', image);
    return axios.post('api/v1/participant', form);
}

const getAllUsers = () => {
    return axios.get("api/v1/participant/all");
}

const putUpdateUser = (id, username, role, image) => {
    const form = new FormData();
    form.append('id', id);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', image);
    return axios.put('api/v1/participant', form);
}

const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (email, password) => {
    return axios.post('api/v1/login', { email, password, delay: 3000 })
}

const postRegister = (email, username, password) => {
    if (username) {
        return axios.post('api/v1/register', { email, username, password })
    } else {
        return axios.post('api/v1/register', { email, password })
    }

}

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}

const getDataQuiz = (quizId) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
}

const postSubmitQuiz = (data) => {
    return axios.post('api/v1/quiz-submit', { ...data })
}

const postCreateQuiz = (description, name, difficul, image) => {
    const form = new FormData();
    form.append('description', description);
    form.append('name', name);
    form.append('difficulty', difficul);
    form.append('quizImage', image);

    return axios.post('api/v1/quiz', form);
}

const getAllQuizForAdmin = () => {
    return axios.get('api/v1/quiz/all');
}

const deleteQuiz = (id) => {
    return axios.delete(`api/v1/quiz/${id}`);
}
const putEditQuiz = (id, description, name, type, image) => {
    const form = new FormData();
    form.append('id', id);
    form.append('description', description);
    form.append('name', name);
    form.append('difficulty', type);
    form.append('quizImage', image);
    return axios.put('api/v1/quiz', form);
}
const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
    const form = new FormData();
    form.append('quiz_id', quiz_id);
    form.append('description', description);
    form.append('questionImage', image);
    return axios.post('api/v1/question', form);
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', { description, correct_answer, question_id });
}

const postAsignQuizToUser = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId })
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}

const postUpSertQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', { ...data })
}
export {
    postCreateNewUser, getAllUsers,
    putUpdateUser, deleteUser,
    getUserWithPaginate, postLogin,
    postRegister, getQuizByUser,
    getDataQuiz, postSubmitQuiz,
    postCreateQuiz, getAllQuizForAdmin,
    deleteQuiz, putEditQuiz, postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion, postAsignQuizToUser,
    getQuizWithQA, postUpSertQA
};