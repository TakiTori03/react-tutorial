import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllQuizForAdmin, getAllUsers, postAsignQuizToUser } from '../../../../services/apiService';
import { toast } from 'react-toastify';
const AssignQuiz = () => {

    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();

        if (res && res.EC === 0) {

            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(newQuiz);
        }
    }

    const fetchUser = async () => {
        let res = await getAllUsers();

        if (res && res.EC === 0) {

            let newUser = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(newUser);
        }
    }

    const handleAsign = async () => {
        const res = await postAsignQuizToUser(selectedQuiz.value, selectedUser.value);
        console.log("check res =>>>", res)
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setSelectedQuiz({});
            setSelectedUser({});
        } else {
            toast.error(res.EM);
        }
    }
    return (
        <div className='assign-quiz-container row'>
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

            <div className=' col-6 form-group'>
                <label className='mb-2'>Select User:</label>
                <Select
                    options={listUser}
                    value={listUser.find((option) => {
                        return option.value === selectedUser.value;
                    })}
                    onChange={setSelectedUser}

                    label="Select user"
                />
            </div>

            <div><button className='btn btn-warning'
                onClick={() => handleAsign()}>Asign</button></div>
        </div>
    )
}
export default AssignQuiz;