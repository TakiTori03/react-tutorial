import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc'
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from '../../../services/apiService'
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

    const [listUser, setListUser] = useState([]);
    const [dataUpdate, setDataUpdate] = useState({});

    const fetchListUser = async () => {
        let res = await getAllUsers();
        console.log(res);
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    }

    const handleClickBtnUpdate = (item) => {
        setShowModalUpdateUser(true);
        setDataUpdate(item);
        console.log("check user =>>>", item)
    }

    const resetUpdateData = () => {
        setDataUpdate({});
    }

    useEffect(() => {
        fetchListUser();
    }, []);

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage-users
            </div>
            <div className="users-container">
                <div className="btn-add-new">
                    <button className="btn btn-primary"
                        onClick={() => setShowModalCreateUser(true)}>
                        <FcPlus />
                        Add new user
                    </button>
                </div>
                <div className="table-users-container">
                    <TableUser
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser} />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                />
            </div>
        </div>
    )
}

export default ManageUser;