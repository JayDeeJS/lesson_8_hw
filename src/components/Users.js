const Users = ({user}) => {
    return (
        <div className="userCard">
            <h4>{user.name}</h4>
            <i>{user.email}</i>
            <p>{user.address.city} {user.address.zipcode}</p>
        </div>
    )
};

export default Users;