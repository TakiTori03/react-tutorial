import ModalCreateUser from "./ModalCreateUser";



const ManageUser = (props) => {
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage-users
            </div>
            <div className="users-container">
                <div>
                    <button>Add new user</button>
                </div>
                <div>
                    Table Users
                    <ModalCreateUser />
                </div>
            </div>
        </div>
    )
}

export default ManageUser;