import React from 'react'
import { Link, NavLink} from 'react-router-dom'
import { fallDown as Menu } from 'react-burger-menu'

class Navbar extends React.Component {
    showSettings (event) {
        event.preventDefault();
    }
    
    render() {
        return (
            <React.Fragment> 
                <Menu disableAutoFocus  menuClassName={ "menu" } itemListClassName={ "menu-item" } width={"400px"} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
                    <Link to="/"><img id="logo_menu" src={require(`../components/img/logo_menu.png`)} /></Link><br />
                    <Link className="lien_menu" to="/">Accueil</Link><br />
                    <NavLink className="lien_menu" to="/nos-chambres">Nos chambres</NavLink><br />
                    <NavLink className="lien_menu" to="/conciergerie">Conciergerie</NavLink><br />
                    <NavLink className="lien_menu" to="/business">Business</NavLink><br />
                    <NavLink className="lien_menu" to="/actualites">Actualités</NavLink><br />
                    <NavLink className="lien_menu" to="/contact">Contact</NavLink>
                </Menu>                   
                <header>                    
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div id="header_info">
                                    <Link to="/"><img id="logo_header" src={require(`../components/img/logo_header.png`)} /></Link>
                                    4-6 Rue Taylor, 75010 Paris
                                    <br className="hidden-md hidden-lg" />
                                    <div id="reservez_header">
                                        <a href="https://sky-eu1.clock-software.com/49764/9114/wbe/products/new" target="_blank">Réserver</a> | <a href="tel:0142401101"><span>01 42 40 11 01</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>              
            </React.Fragment>
        )
    }
}

export default Navbar
