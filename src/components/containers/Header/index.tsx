import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import Dropdown from 'react-bootstrap/Dropdown';
import Logout from "../../auth/Logout";

const Header = () => {
    const { isAuth } = useTypedSelector(state => state.auth);
    return (
        <nav className="navbar navbar-expand navbar-dark sticky-top bg-dark rounded-bottom-2">
            <div className="collapse navbar-collapse container p-0">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Головна</Link>
                    </li>
                    {
                        isAuth &&
                        <>
                            <li className="nav-item">
                                <Dropdown>
                                    <Dropdown.Toggle className="nav-link" variant="dark" id="dropdown-basic">
                                        Створити
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.ItemText className="btn"><Link className="nav-link text-black" to="/brand">Бренд</Link></Dropdown.ItemText>
                                        <Dropdown.ItemText className="btn"><Link className="nav-link text-black" to="/year">Рік</Link></Dropdown.ItemText>
                                        <Dropdown.ItemText className="btn"><Link className="nav-link text-black" to="/property">Властивість</Link></Dropdown.ItemText>
                                        <Dropdown.ItemText className="btn"><Link className="nav-link text-black" to="/characteristic">Характеристика</Link></Dropdown.ItemText>
                                        <Dropdown.ItemText className="btn"><Link className="nav-link text-black" to="/photo">Фото</Link></Dropdown.ItemText>
                                        <Dropdown.ItemText className="btn"><Link className="nav-link text-black" to="/car">Авто</Link></Dropdown.ItemText>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                            <li className="nav-item">
                                <Dropdown>
                                    <Dropdown.Toggle className="nav-link" variant="dark" id="dropdown-basic">
                                        Показати
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.ItemText className="btn"><Link className="nav-link text-black" to="/brands">Бренди</Link></Dropdown.ItemText>
                                        <Dropdown.ItemText className="btn"><Link className="nav-link text-black" to="/years">Роки</Link></Dropdown.ItemText>
                                        <Dropdown.ItemText className="btn"><Link className="nav-link text-black" to="/properties">Властивістивості</Link></Dropdown.ItemText>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        </>
                    }
                </ul>
                <ul className="navbar-nav ms-auto site-font">
                    {
                        isAuth ?
                            <li className="nav-item">
                                <Logout />
                            </li> :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Увійти</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Створити акаунт</Link>
                                </li>
                            </>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Header;