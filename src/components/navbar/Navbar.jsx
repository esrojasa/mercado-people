import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AutentiContext } from "../../context/ContextAutentificacion";
import Logo from "../../assets/carrito.png";
import "./navbar.css";
import Context from "../../context/context"

const Navbar = () => {

    const { usuario, cerrarSesion, cargando } = useContext(AutentiContext);
    const { cartTotal, formatNumberES } = useContext(Context);

    if (cargando) return <h1>Cargando ...</h1>


    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <div className="d-flex align-items-center">

                    <Link className="navbar-brand text-white cursor-pointer" to="/">
                        <img src={Logo} alt="logo" height={50} width={50} />
                        <strong className="titulo">Mercado People</strong>
                    </Link>
                    <li className="nav-item d-flex">
                        <Link className="nav-link text-white cursor-pointer" to="/products">
                            Categoria Productos
                        </Link>
                    </li>
                </div>

                <ul className="navbar-nav ">


                    <li className="}nav-item">
                        <span className="nav-link text-white cursor-pointer"></span>
                    </li>
                    {usuario?.activo ?
                        <div className="d-flex align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link text-white cursor-pointer" to="/vender">
                                    Crear Publicación
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white dropdown-item" to="/favoritos">
                                    Mis favoritos
                                </Link>
                            </li>
                        </div>
                        : null}

                    {/* public */}

                    {usuario?.activo &&
                        <li className="nav-item">
                            <Link className="nav-link text-white cursor-pointer" to="/carro">
                                <i className="fa-solid fa-cart-shopping"> ${cartTotal() === 0 ? 0 : formatNumberES(cartTotal())}</i>
                            </Link>
                        </li>
                    }
                    {usuario?.activo ?
                        <li className="nav-item ms-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {usuario?.email}
                                </button>
                                <ul className="dropdown-menu">

                                    <Link className="nav-link cursor-pointer dropdown-item" onClick={() => cerrarSesion()}>
                                        Cerrar sesión
                                    </Link>

                                </ul>
                            </div>
                        </li>
                        :
                        <>
                            <li className="nav-item ms-4">
                                <Link className="nav-link text-white cursor-pointer" to="/singup">
                                    Registrate
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/login">
                                    Iniciar Sesión
                                </Link>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
