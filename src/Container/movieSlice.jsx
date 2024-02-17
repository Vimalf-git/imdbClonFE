import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../Common/ApiService";
import { useNavigate } from "react-router-dom";
export const getMoviList =
    createAsyncThunk("getMovieList", async (_, { rejectWithValue }) => {
        try {
            const res = await ApiService.get('/getmovielist');
            console.log(res.data);
            if (res.status == 200)
                return res.data.data;
        } catch (error) {
            return rejectWithValue({ error: error.message })
        }
    })

export const postMoviList =
    createAsyncThunk("postMovieList", async (value, { rejectWithValue }) => {
        try {
            let res = await ApiService.post('/createmovie', value, {
                headers: { "Content-Type": 'multipart/form-data' },
            })
            if (res.status == 200) {
                //   navigate('/home')
                getMoviList()
            }
            //   if(res.status==200)
            // return res.data.data;
        } catch (error) {
            return rejectWithValue({ error: error.message })
        }
    })

export const delteMoviList =
    createAsyncThunk("delteMovieList", async (value, { rejectWithValue }) => {
        try {
            let res = await ApiService.delete(`/deletemovie/${value}`)
            if (res.status == 200) {
                getMoviList()
            }
        } catch (error) {
            return rejectWithValue({ error: error.message })
        }
    })

export const updateMovieList =
    createAsyncThunk("postMovieList", async (value, { rejectWithValue }) => {
        try {
            console.log(value);
            let res = await ApiService.put('/updatemovie', value, {
                headers: { "Content-Type": 'multipart/form-data' },
            })
            if (res.status == 200) {
                getMoviList()
            }
        } catch (error) {
            return rejectWithValue({ error: error.message })
        }
    })

export const createWatchList =
    createAsyncThunk("createWatchList", async (value, { rejectWithValue }) => {
        try {
            console.log(value);
            let res = await ApiService.post('/createwatchlist', value)
            if (res.status == 200) {
                // getMoviList()
            }
        } catch (error) {
            return rejectWithValue({ error: error.message })
        }
    })


export const getWatchList =
    createAsyncThunk("getWatchList", async (_, { rejectWithValue }) => {
        try {
            // console.log(value);
            let res = await ApiService.get('/getwatchlist')
            if (res.status == 200) {
                return res.data.data
            }
        } catch (error) {
            return rejectWithValue({ error: error.message })
        }
    })

export const removewatch =
    createAsyncThunk("removewatch", async (value, { rejectWithValue }) => {
        try {
            let res = await ApiService.delete(`/removewatchlist/${value}`)
            if (res.status == 200) {
                getWatchList()
            }
        } catch (error) {
            return rejectWithValue({ error: error.message })
        }
    })

// removewatchlist
const movieData = createSlice({
    name: 'movieList',
    initialState: {
        movieData: [],
        movieDataSam: [],
        isLoading: false,
        watchListdata: [],
        producerList:[],
        actorList:[]
    },
    reducers: {
        filter: (state, action) => {
            if (action.payload != "") {
                const filData = state.movieDataSam.filter((e) => e.movieName.includes(action.payload.toLowerCase()));
                state.movieData = filData;
            } else {
                state.movieData = state.movieDataSam
            }
        },
        remove: (state, action) => {
            state.movieData.splice(action.payload, 1);
            state.movieDataSam.splice(action.payload, 1);
        },
        addWatchList: (state, action) => {
            state.watchListdata.push(action.payload)
        },
        removeWatchList: (state, action) => {
            state.watchListdata.splice(action.payload, 1);
        }

    },
    extraReducers(builder) {
        builder.addCase(getMoviList.pending, (state, action) => {
            state.isLoading = true;
        })
            .addCase(getMoviList.fulfilled, (state, action) => {
                state.movieData = action.payload;
                state.isLoading = false
                state.movieDataSam = action.payload
                // const [producerlist,setProducerList]=useState([]);
                // const setproducer=()=>{
                 let data=action.payload.map((e,i)=>e.producerName)
                 console.log(data);
                 state.producerList=data.filter((e,i)=>data.indexOf(e)==i)
                 let actorData=action.payload.map((e,i)=>e.actorName)
                 state.actorList=actorData.filter((e,i)=>actorData.indexOf(e)==i)
                  // console.log(data);
                // }
            })
            .addCase(getMoviList.rejected, (state, action) => {
                state.isLoading = false;
                state.movieDataSam = []
                state.movieData = []
            })

            // postmovieData
            .addCase(postMoviList.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(postMoviList.fulfilled, (state, action) => {
                state.isLoading = false
                state.movieDataSam = []
                state.movieData = []
                // const navigate=useNavigate();
                // navigate('/home')
            })
            .addCase(postMoviList.rejected, (state, action) => {
                state.isLoading = false;
            })
            // getwatchlist

            .addCase(getWatchList.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getWatchList.fulfilled, (state, action) => {
                state.isLoading = false
                state.watchListdata = action.payload
                // state.movieData = []
            })
            .addCase(getWatchList.rejected, (state, action) => {
                state.isLoading = false;
                state.watchListdata = [];

            })
    }
})

export const { filter, remove, addWatchList, removeWatchList} = movieData.actions;
export default movieData.reducer