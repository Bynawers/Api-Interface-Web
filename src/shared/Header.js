import React from 'react';
import "@fontsource/source-sans-pro";
import "../styles/Header.css"

function Header(props){

	function logout() {
		props.setIsLogin(false);
	}

	const handlePage = (select) => {
		props.setPage(select)
	}

	return(
		<div className='header'>
			<h2 className="title">Grappe Api</h2>

			<div className='buttonHeaderContainer'>
				<div className='buttonHeader validHeader' onClick={() => handlePage("Valid")} style={{ backgroundColor: props.page === "Valid" ? "#A36FA5" : ""}}>
					Valider
				</div>
				<div className='buttonHeader searchHeader' onClick={() => handlePage("Search")} style={{ backgroundColor: props.page === "Search" ? "#A36FA5" : ""}}>
					Rechercher
				</div>
				<div className='buttonHeader addHeader' onClick={() => handlePage("Add")} style={{ backgroundColor: props.page === "Add" ? "#A36FA5" : ""}}>
					Ajouter
				</div>
			</div>

			<p className="logout" onClick={() => logout()}>Deconnexion</p>
		</div>
	);
}

export default Header;