import React, { useEffect } from 'react'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { addWatchList, createWatchList, delteMoviList, getMoviList, getWatchEditList, remove } from '../Container/movieSlice';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from 'react-router-dom';
import { DateRangeOutlined, StarBorderRounded } from '@mui/icons-material';
const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { movieData } = useSelector((state) => state.userSlice);
    const deleteData = (index, id) => {
        dispatch(remove(index));
        dispatch(delteMoviList(id));
    }
    const addWatchListData = (data) => {
        dispatch(addWatchList(data))
        dispatch(createWatchList(data))
    }
    const editData = (id) => {
        dispatch(getWatchEditList(id));
        navigate(`/editmovie/${id}`)
    }
    useEffect(() => {
        dispatch(getMoviList());
    }, [])

    return (
        <div className='homeCon'>
            <div className='cardcon'>
                {movieData.length > 0 ? movieData.map((e, i) => {
                    return <div className='card' key={i}>
                        <div className='cardheader'>
                            <div className='addplayList'>
                                <PlaylistAddIcon className='playlistBtn' onClick={() => { addWatchListData(e) }} />
                            </div>
                            <div className='editDelBtn'>
                                <DeleteIcon className='deleteBtn' onClick={() => { deleteData(i, e._id) }} />
                                <ModeEditIcon className='editBtn' onClick={() => { editData(e._id) }} />
                            </div>
                        </div>
                        <div className='cardimg'>
                            <img className='moviImg' src={e.moviePic} />
                        </div>
                        <div className='movieName'>
                            <p>Movie:<span>{e.movieName.toUpperCase()}</span></p>
                        </div>
                        <p className='plot'>Plot:</p>
                        <div className='cardDesc'>
                            <p>{e.desc.length > 105 ? e.desc[0].toUpperCase() + e.desc.slice(1, 105) + '...' : e.desc}</p>
                        </div>
                        <div className='cardFooter'>
                            <div className='footerName'>
                                <p>Actor:<span style={{ color: '#F5C518' }}>{e.actorName}</span></p>
                                <p>Producer:<span style={{ color: '#F5C518' }}>{e.producerName}</span></p>
                            </div>
                            <div className='releaseyr'>
                                <p><DateRangeOutlined /> <span style={{ color: '#F5C518' }}>{e.releaseYear}</span></p>
                                <p ><StarBorderRounded /> <span style={{ color: '#F5C518' }}>{e.rating ?? 0}</span></p>
                            </div>
                        </div>
                    </div>
                }) : <div className='loadingCom' style={{ color: 'white' }}>
                    <p>Loading...</p>
                    <p>No Data Found</p>
                </div>}
            </div>
        </div>
    )
}

export default Home