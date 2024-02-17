import React from 'react'
import './WatchList.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { removeWatchList, removewatch } from '../Container/movieSlice';
const WatchList = () => {
  const dispatch=useDispatch();
  const { watchListdata} = useSelector((state) => state.userSlice);
  const deleteData = (index, id) => {
    dispatch(removeWatchList  (index));
    dispatch(removewatch(id))
}
  return (
    <div className='watchListCon'>
      <div className='WatchcardCon'>
        {watchListdata.map((e, i) => {
          return <div className='watchlistCard' key={i}>
            <div className='imgCon'>
              <img className='watchImg' src={e.moviePic} />
            </div>
            <div className='WatchrightCon'>
            <div className='watchListName'>
              <p>Actor: <span style={{ color: '#F5C518' }}>{e.actorName}</span></p>
              <p>Producer: <span style={{ color: '#F5C518' }}>{e.producerName}</span></p>
            </div>
            <div className='ratingsWatchList'>
              <p>Roy: <span style={{ color: '#F5C518' }}>{e.releaseYear}</span></p>
              <p>Rating: <span style={{ color: '#F5C518' }}>{e.rating??0}</span></p>
            </div>
            <div className='watchListDel'>
            <DeleteIcon className='watchdelIcon' onClick={() => { deleteData(i, e._id) }} />

            </div>

              </div>
            
          </div>
        })}
      </div>
    </div>
  )
}

export default WatchList