import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getActorList, getMoviList, getWatchEditList, updateMovieList } from '../Container/movieSlice'
const EditMovie = () => {
    const param = useParams()
    let { producerList, actorList, updateEditData } = useSelector(state => state.userSlice);
    const [postimageUpload, setPostImageUpload] = useState(null);
    const [producerName, setproducerName] = useState("");
    const [actorname, setactorname] = useState("");
    const [moviename, setMovieName] = useState("");
    const [releaseYear, setReleaseYear] = useState();
    const [desc, setDesc] = useState("")
    const [rating, setRating] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleSubmit = async () => {

        const payload = new FormData();
        payload.append('id', param.id);
        payload.append('moviename', moviename);
        payload.append('actorname', actorname);
        payload.append('producerName', producerName);
        payload.append('desc', desc);
        payload.append('rating', rating)
        payload.append('releaseYear', releaseYear);
        payload.append('file', postimageUpload);
        try {
            let resData = await dispatch(updateMovieList(payload))
            let status = resData.type.split('/')[1]
            if (status == "rejected") {
                toast.error('movie is already exist')
            } else if (status == "fulfilled") {
                navigate('/home')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getUpdateData = () => {
        setMovieName(updateEditData.movieName);
        setReleaseYear(updateEditData.releaseYear);
        setproducerName(updateEditData.producerName);
        setactorname(updateEditData.actorName);
        setDesc(updateEditData.desc);
        setRating(updateEditData.rating)
    }
    useEffect(() => {
        getUpdateData();
    }, [updateEditData])
    useEffect(() => {
        dispatch(getActorList())
        dispatch(getWatchEditList(param.id));
    }, [])
    return (
        <div className='addmovieCon'>
            <form className='postform'>
                <div >
                    <input className='textFeild' value={moviename ?? 'd'} name='tittle' onChange={(e) => setMovieName(e.target.value)} type='text' placeholder='movie name' />
                </div>
                <div>
                    <select className='ProducerEditFeild' value={producerName ?? ''} name='producername' onChange={(e) => setproducerName(e.target.value)}>
                        <option value="">Producer</option>
                        {producerList.map((e, i) => <option key={i}>{e}</option>)}
                    </select>
                </div>
                <div>
                    <select className='actorEditFeild' value={actorname ?? ''} name='actorname' onChange={(e) => setactorname(e.target.value)}>
                        <option value="">Actor</option>
                        {actorList.map((e, i) => <option key={i}>{e}</option>)}
                    </select>
                </div>
                <input className='dateFeild' value={releaseYear ?? ''} type='date' onChange={(e) => setReleaseYear(e.target.value)} />
                <div>
                    <input className='textFeild' value={desc ?? ''} name='desc' onChange={(e) => setDesc(e.target.value)} placeholder='Plot' />
                </div>
                <div className='imgsecpost' onClick={() => document.querySelector(".imgUpload").click()}>
                    <input className='imgUpload'
                        onChange={(e) => { setPostImageUpload(e.target.files[0]) }}
                        accept='.jpeg, .png, .jpg' type='file' hidden />
                    <AddPhotoAlternateIcon className='faImg' /><span style={{ color: 'blue', cursor: 'pointer' }}>select your movie img</span>
                </div>
                <div>
                    <select className='ratingEditFeild' value={rating ?? ''} name='rating' onChange={(e) => setRating(e.target.value)}>
                        <option value="">Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div>
                    <Button className='postBtn' variant='contained' onClick={() => { handleSubmit() }}>Update</Button>
                </div>
            </form>
        </div>)
}

export default EditMovie