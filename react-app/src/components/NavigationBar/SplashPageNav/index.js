import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const [menu, setMenu] = useState(false)

	// let splashMenuClassName = menu ? "splash-profile-icon-green" : "splash-profile-icon-white"
	return (
		<div className='navbar-splash-full'>
			<div>
				<NavLink exact to="/" className="navbar-splash-logo">Lofi</NavLink>
			</div>
			{isLoaded && (
				<div>
					{sessionUser && sessionUser.profile_image ?
						<div className='navbar-splash-options'
						// onFocus={() => setMenu(!menu)} onBlur={() => setMenu(!menu)} className={'navbar-splash-options ' + splashMenuClassName} onClick={() => setMenu(!menu)}
						>
							<p>Profile Image</p>
							<p className='splash-profile-text'>Profile</p>
							{menu ?
								<div>
									<i className="fa-solid fa-chevron-down splash-profile-down-icon"></i>
								</div>
								:
								<div >
									<i class="fa-solid fa-chevron-up"></i>
									<div className='navbar-splash-profile-options'>
										<div>Account</div>
										<div>Log out</div>
									</div>
								</div>
							}
						</div>
						: sessionUser ?
							<div className='navbar-splash-options' onClick={() => setMenu(!menu)}>
								<i className="fa-regular fa-user"></i>
								<p className='splash-profile-text'>Profile</p>
								{menu ?
									<div>
										<i className="fa-solid fa-chevron-down splash-profile-down-icon"></i>
									</div>
									:
									<div >
										<i class="fa-solid fa-chevron-up"></i>
										<div className='navbar-splash-profile-options'>
											<div>Account</div>
											<div>Log out</div>
										</div>
									</div>
								}
							</div>
							:
							<div className='navbar-splash-options'>
								{/* <ProfileButton user={sessionUser} /> */}
								<button>Check us out</button>
								<button>Sign up</button>
								<button>Log in</button>
							</div>
					}
				</div>
			)}
		</div>
	);
}

export default Navigation;