import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoMdCloseCircle, IoMdImages } from 'react-icons/io'
import './AddMovie.css'
import { useDispatch, useSelector } from 'react-redux'
import { addActorData, addProducerData, getActorList, getMoviList, postMoviList } from '../Container/movieSlice'
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
  const [producercustomToggler, setproducercustomToggler] = useState(false);
  const [producerGender, setProducerGender] = useState("");
  const [producerBio, setProducerBio] = useState("");
  const [actorGender, setActorGender] = useState("");
  const [actorBio, setActorBio] = useState("");
  const dispatch = useDispatch();
  const { producerList, actorList, isLoading } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (postimageUpload == '' || producerName == '' || actorname == '' || (moviename =='') || releaseYear == undefined || desc == '' || rating == '') {
      console.log(releaseYear);
      alert('fill all feild');

    } else {
      const payload = new FormData();
      payload.append('moviename', moviename);
      payload.append('actorname', actorname);
      payload.append('producerName', producerName);
      payload.append('desc', desc);
      payload.append('releaseYear', releaseYear);
      payload.append('rating', rating)

      payload.append('producerGender', producerGender)
      payload.append('producerBio', producerBio)
      payload.append('actorGender', actorGender)
      payload.append('actorBio', actorBio)

      payload.append('file', postimageUpload);
      try {
        let res=dispatch(postMoviList(payload))
        console.log(res);
        dispatch(getMoviList())
        // setTimeout(() => {
          navigate('/home')
        // }, 1500)
      } catch (error) {

      }
    }
  }
  const setActorData = () => {
    console.log(actorname);
    dispatch(addActorData(actorname))
    setCustomToggler(false);
  }
  const setProducerData = () => {
    // console.log(actorname);
    dispatch(addProducerData(producerName))
    setproducercustomToggler(false);
  }
  useEffect(() => {
    dispatch(getActorList())
    // dispatch(getMoviList())
  }, [])
  // console.log(actorList);
  return (
    <div className='addmovieCon'>
      <form className='postform' onSubmit={(e) => { e.preventDefault() }} >
        <div >
          <input className='textFeild' name='tittle' onChange={(e) => setMovieName(e.target.value)}
            type='text' placeholder='movie name' />
        </div>

        <div className='actorCon'>
          <select className='ProducerFeild' name='producername' value={producerName} onChange={(e) => setproducerName(e.target.value)}>
            <option value="">Producer</option>
            {producerList&&producerList.map((e, i) => <option key={i}>{e}</option>)}
          </select>
          <Button className='addBtn' variant='contained' onClick={() => setproducercustomToggler(true)}>Add</Button>

          {producercustomToggler ? <div className='cusTogglerCon'>
            <IoMdCloseCircle className='crossIcon' onClick={() => setproducercustomToggler(pre => !pre)} />
            <h4>Add Producer</h4>

            <input className='addInput' type='text' placeholder='producerName' onChange={(e) => setproducerName(e.target.value)} />
            <select onChange={(e) => { setProducerGender(e.target.value) }}>
              <option className='male'>Male</option>
              <option className='female'>Female</option>
              <option className='trans'>trans</option>
            </select>
            <input onChange={(e) => { setProducerBio(e.target.value) }} placeholder='bio' className='addInput' type='text' />
            <Button className='addBtn' variant='contained' onClick={() => { setProducerData() }}>Save</Button>
          </div> : <></>}
        </div>


        <div className='actorCon'>
          <select className='actorFeild' value={actorname} name='actorname' onChange={(e) => setactorname(e.target.value)}>
            <option value="">Actor</option>
            {actorList&&actorList.map((e, i) => <option key={i}>{e}</option>)}
            {/* <option onClick={() => { setCustomToggler(true) }}>Other</option> */}
          </select>
          <Button className='addBtn' variant='contained' onClick={() => setCustomToggler(true)}>Add</Button>

          {customToggler ? <div className='cusTogglerCon'>
            <IoMdCloseCircle className='crossIcon' onClick={() => setCustomToggler(pre => !pre)} />
            <h4>Actor Name</h4>
            <input className='addInput' type='text' placeholder='ActorName' onChange={(e) => setactorname(e.target.value)} />
            <select onChange={(e) => { setActorGender(e.target.value) }}>
              <option className='male'>Male</option>
              <option className='female'>Female</option>
              <option className='trans'>trans</option>
            </select>
            <input onChange={(e) => { setActorBio(e.target.value) }} placeholder='Bio' className='addInput' type='text' />
            <Button className='addBtn' variant='contained' onClick={() => { setActorData() }}>Save</Button>
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
          <select className='rating' name='rating' onChange={(e) => setRating(e.target.value)}>
            <option value="">Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div >
          <Button className='postBtn'  onClick={() => { handleSubmit() }} variant='contained' >Post</Button>
        </div>
      </form>
    </div>
  )
}

export default AddMovie