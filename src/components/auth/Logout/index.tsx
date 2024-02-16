import { useActions } from "../../../hooks/useActions";

const Logout = () => {
    const { LogoutUser } = useActions();
    return (
        <div className="btn text-danger" onClick={LogoutUser} >
            Вийти
        </div>
    );
}

export default Logout;