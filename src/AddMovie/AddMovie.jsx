import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoMdImages } from 'react-icons/io'
import './AddMovie.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMoviList, postMoviList } from '../Container/movieSlice'
import { useNavigate } from 'react-router-dom'
const AddMovie = () => {
  const [postimageUpload, setPostImageUpload] = useState(null);
  const [producerName, setproducerName] = useState("");
  const [actorname, setactorname] = useState("");
  const [moviename, setMovieName] = useState("");
  const [releaseYear, setReleaseYear] = useState();
  const [desc, setDesc] = useState("")
  const [rating, setRating] = useState('')
  const [customToggler, setCustomToggler] = useState(false);
  const dispatch = useDispatch();
  const { producerList, actorList } = useSelector((state) => state.userSlice);
  const navigate = useNavigate()
  const handleSubmit = async () => {
    console.log('submit');
    if (postimageUpload == null) {
      alert('empty')
    } else {
      const payload = new FormData();
      payload.append('moviename', moviename);
      payload.append('actorname', actorname);
      payload.append('producerName', producerName);
      payload.append('desc', desc);
      payload.append('releaseYear', releaseYear);
      payload.append('rating', rating)
      payload.append('file', postimageUpload);

      try {
        dispatch(postMoviList(payload))
        // navigate('/home')
      } catch (error) {

      }
    }
  }

  useEffect(() => {
    dispatch(getMoviList())
  }, [])
  // console.log(producerlist);
  return (
    <div className='addmovieCon'>
      <form className='postform'>
        <div >
          <input className='textFeild' name='tittle' onChange={(e) => setMovieName(e.target.value)} type='text' placeholder='movie name' />

          {/* <input className='textFeild'  name='tittle' onChange={(e)=>setMovieList(e.target.value)} type='text' placeholder='Tittle' /> */}
        </div>
        <div>
          <select className='ProducerFeild' name='producername' onChange={(e) => setproducerName(e.target.value)}>
            <option value="">Producer</option>
            {producerList.map((e) => <option>{e}</option>)}
          </select>
        </div>
        <div>
          <select className='DirectorFeild' name='actorname' onChange={(e) => setactorname(e.target.value)}>
            <option value="">Actor</option>
            {actorList.map((e) => <option>{e}</option>)}
            <option onClick={() => { setCustomToggler(true) }}>Other</option>
          </select>
          {customToggler ? <div className='cusTogglerCon'>
            <input type='text' onChange={(e) => setactorname(e.target.value)} />
            <button onClick={setCustomToggler(pre => !pre)}>Save</button>
          </div> : <></>}
        </div>
        <input className='dateFeild' type='date' onChange={(e) => setReleaseYear(e.target.value)} />
        <div>
          <input className='textFeild' name='desc' onChange={(e) => setDesc(e.target.value)} placeholder='Desc' />
        </div>
        <div className='imgsecpost' onClick={() => document.querySelector(".imgUpload").click()}>
          <input className='imgUpload'
            onChange={(e) => { setPostImageUpload(e.target.files[0]) }}
            accept='.jpeg, .png, .jpg' type='file' hidden />
          <IoMdImages className='faImg' /><span style={{ color: 'blue', cursor: 'pointer' }}>select your movie img</span>
        </div>
        <div>
          <select className='DirectorFeild' name='rating' onChange={(e) => setRating(e.target.value)}>
            <option value="">Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div >
          <Button className='postBtn' variant='contained' onClick={() => { handleSubmit() }}>Post</Button>
        </div>
      </form>
    </div>
  )
}

export default AddMovie