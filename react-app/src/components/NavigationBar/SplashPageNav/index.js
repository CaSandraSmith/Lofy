import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const history = useHistory()
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);
	const [menu, setMenu] = useState(false)
	const [menuHover, setMenuHover] = useState(false)
	let splashMenuClassName = menu || menuHover ? "splash-profile-icon-green" : "splash-profile-icon-white"

	let handleLogout = async () => {
		dispatch(logout())
	}

	return (
		<div className='navbar-splash-full'>
			<div className='splash-logo-and-name'>
				<img className='spash-logo' src="https://res.cloudinary.com/djp7wsuit/image/upload/v1687234717/Removal-267_zrbqvv.png" />
				<NavLink exact to="/" className="navbar-splash-logo">Lofi</NavLink>
			</div>
			{isLoaded && (
				<div>
					{sessionUser ?
						<div
							onMouseEnter={() => setMenuHover(true)}
							onMouseLeave={() => setMenuHover(false)}
							className={'navbar-splash-options ' + splashMenuClassName}
							onClick={() => setMenu(!menu)}
						>	{sessionUser.profile_image ?
							<img className='splash-profile-image' src={sessionUser.profile_image} alt='your profile image' />
							:
							<i className="fa-regular fa-user"></i>
							}
							<p className='splash-profile-text'>Profile</p>
							{menu ?
								<div >
									<i class="fa-solid fa-chevron-up"></i>
									<div className='navbar-splash-profile-options'>
										<div onClick={() => alert("Feature coming soon")}>Account</div>
										<div onClick={handleLogout}>Log out</div>
									</div>
								</div>
								:
								<div>
									<i className="fa-solid fa-chevron-down splash-profile-down-icon"></i>
								</div>
							}
						</div>
						:
						<div className='navbar-splash-options-logged-out'>
							<p onClick={() => history.push("/signup")}>Sign up</p>
							<p onClick={() => history.push("/login")}>Log in</p>
						</div>
					}
				</div>
			)}
		</div>
	);
}

export default Navigation;