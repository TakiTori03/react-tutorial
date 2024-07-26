import { useEffect, useState } from "react";
import { getAllQuizForAdmin, } from "../../../../services/apiService";
import { toast } from "react-toastify";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalEditQuiz from "./ModalEditQuiz";

const TableList = () => {
    const [listQuiz, setListQuiz] = useState([]);

    const [isShowModalDeleteQuiz, setIsShowModalDeleteQuiz] = useState(false);
    const [isShowModalEditQuiz, setIsShowModalEditQuiz] = useState(false);

    const [dataDelete, setDataDelete] = useState('');
    const [dataEdit, setDataEdit] = useState('');

    useEffect(() => {
        fetchQuiz()
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();

        if (res && res.EC === 0) {
            toast.success(res.EM);
            setListQuiz(res.DT);
        } else {
            toast.error(res.EM);
        }
    }

    const handleClickBtnDelete = (item) => {
        setDataDelete(item);
        setIsShowModalDeleteQuiz(true);
    }

    const handleClickBtnEdit = (item) => {
        setDataEdit(item);
        setIsShowModalEditQuiz(true);
    }

    return (
        <>
            <div>Table List Users</div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                {listQuiz && listQuiz.length > 0
                    ? <tbody>
                        {listQuiz.map((item, index) => {
                            return (
                                <tr key={`row-${index}`}>
                                    <td > {item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td>
                                        <button className="btn btn-primary "
                                            onClick={() => handleClickBtnEdit(item)}>Edit</button>
                                        <button className="btn btn-warning"
                                            onClick={() => handleClickBtnDelete(item)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    : <caption> No data from db</caption>
                }
            </table>

            <ModalDeleteQuiz
                show={isShowModalDeleteQuiz}
                setShow={setIsShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchQuiz={fetchQuiz}
            />
            <ModalEditQuiz
                show={isShowModalEditQuiz}
                setShow={setIsShowModalEditQuiz}
                dataEdit={dataEdit}
                fetchQuiz={fetchQuiz}
            />
        </>
    )
}

export default TableList;