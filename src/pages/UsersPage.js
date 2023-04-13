import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/usersSlice";
import { useEffect } from "react";
import Users from "../components/Users";

const UsersPage = () => {

    const dispatch = useDispatch()
    const {users, reqSuccess, reqError, preloader} = useSelector(state => state.usersReducer)

    const handleFetchUsers = () => {
        dispatch(fetchUsers(users))
    }

    useEffect(() => {
        handleFetchUsers()
    }, [])

    return (
        <main className="usersWrapper">
            <h3>Users list</h3>
            <section className="usersContent">
                {
                    users.map(user =>
                        <Users key={user.id} user={user} />
                    )
                }
            </section>

            {preloader && <h5 className="loader">loading...</h5> }
            {reqSuccess && <h5 className="success">{`Status ${reqSuccess}: fetched`}</h5>}
            {reqError && <h5 className="error">{`Status ${reqError}: not found`}</h5>}

        </main>
    )
};

export default UsersPage;