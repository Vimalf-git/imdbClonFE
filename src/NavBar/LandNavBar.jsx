import React, { useEffect, useState } from 'react'
import './LandNav.css'
import { Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../Common/useLogout';
import CancelIcon from '@mui/icons-material/Cancel';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { filter, getMoviList, getWatchList } from '../Container/movieSlice';

const LandNavBar = () => {
    const [hamBurger, setHamBurger] = useState(false);
    const [userName, setUserName] = useState(null);
    const [logOutToggler, setLogOutTogg] = useState(false);
    const navigate = useNavigate()
    const logout = useLogout()
    const dispatch = useDispatch()
    const { watchListdata } = useSelector((state) => state.userSlice);

    useEffect(() => {
        let token = sessionStorage.getItem('token');
        let name = jwtDecode(token).username
        setUserName(name)
        dispatch(getWatchList())
        // dispatch(getMoviList())

    }, [])
    const filterData = (value) => {
        dispatch(filter(value))
    }
    return (<>
        <nav className='landNav'>
            <div className='landnav-l-con'>
                <div className='navbrandname'>
                    <h1>IMDb</h1>
                </div>
                <Link to={'/addmovie'} className='addMovieList'>AddMovie</Link>
                <Link to={'/home'} className='addMovieList'>Home</Link>

            </div>
            <div className='searchCon'>
                <input type='text' className='searchBar' placeholder="Search..."
                    onChange={(e) => { filterData(e.target.value) }}
                />

            </div>
            <div className='landnav-r-con'>
                <div className='cartCon'
                    onClick={() => navigate('/watchlist')}
                >
                    <BookmarkAddIcon className='carticon' />
                    {/* {countCart ? */}
                    <p className='countCart'>{watchListdata.length}</p>
                    <p className='Watchlist'>Watchlist</p>
                </div>
                <div className='avatarProfile' onClick={() => { setLogOutTogg(pre => !pre) }}
                >
                    <AccountCircleIcon className='avatarIcon'
                    >
                    </AccountCircleIcon>
                    <h4>{userName ?? ''}</h4>
                </div>
                {logOutToggler ? <div className='logoutToggEle'>
                    <button className='logOutBtnDesView' onClick={()=>{logout()}}>Logout</button>
                </div> : <></>}

            </div>

        </nav>




        {/* /*** mobile view   */}


        <nav className='landNavmob'>
            <div className='navbrandname'>
                <h1>IMDb</h1>
            </div>
            <div >
                <input type='text' className='searchBar' placeholder="Search..."
                    onChange={(e) => { filterData(e.target.value) }} />
            </div>
            <div>
                {hamBurger ?
                    <CancelIcon className='burgerIcon' onClick={() => setHamBurger(pre => !pre)} /> :
                    <LunchDiningIcon className='burgerIcon' onClick={() => setHamBurger(pre => !pre)} />
                }
                {hamBurger ? <>
                    <div className='landnav-r-conMob'>

                        <div className='avatarProfile mobAllignuser'
                        >
                            <AccountCircleIcon className='avatarIcon'
                            >
                            </AccountCircleIcon>
                            <h4>{userName ?? ''}</h4>
                        </div>
                        <div className='cartCon mobAllign'
                            onClick={() => navigate('/watchlist')}
                        >
                            <BookmarkAddIcon className='carticon' />
                            <p className='countCart'>{watchListdata.length}</p>
                            <p className='Watchlist'>Watchlist</p>
                        </div>

                        <Link to={'/addmovie'} className='addMovieList mobAllign'>AddMovie</Link>
                        <Link to={'/home'} className='addMovieList mobAllign'>Home</Link>
                        <Button variant='contained' onClick={() => { logout() }} className='logoutbtn mobAllign' sx={{ backgroundColor: '#F4424E', marginBottom: '2em' }}>Logout</Button>
                    </div>
                </> : <></>
                }
            </div>
        </nav>
    </>
    )
}

export default LandNavBar