import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export class Menu extends React.Component {
    render() {
        return (
            <div id="menu">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div id="container_menu">
                                <div id="content_menu">
                                    <ul id="menu_ul">
                                        <li class="menu_li">
                                            <Link to="/">Accueil</Link>
                                        </li>
                                        <li class="menu_li">
                                            <NavLink to="/nos-chambres">Nos chambres</NavLink>
                                        </li>
                                        <li class="menu_li">
                                            <NavLink to="/conciergerie">Conciergerie</NavLink>
                                        </li>
                                        <li class="menu_li">
                                            <NavLink to="/business">Business</NavLink>
                                        </li>
                                        <li class="menu_li">
                                            <NavLink to="/actualites">Actualités</NavLink>
                                        </li>
                                        <li class="menu_li">
                                            <NavLink to="/contact">Contact</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu
