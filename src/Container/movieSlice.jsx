import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../Common/ApiService";
import { useNavigate } from "react-router-dom";
export const getMoviList =
    createAsyncThunk("getMovieList", async (_, { rejectWithValue }) => {
        try {
            const res = await ApiService.get('/getmovielist');
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



export const updateMovieList =
    createAsyncThunk("postMovieList", async (value, { rejectWithValue }) => {
        try {
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
export const delteMoviList =
    createAsyncThunk("delteMovieList", async (value, { rejectWithValue }) => {
        try {
            let res = await ApiService.delete(`/deletemovie/${value}`)
            if (res.status == 200) {
                getMoviList()
                getWatchList()
            }
        } catch (error) {
            return rejectWithValue({ error: error.message })
        }
    })

export const getWatchEditList =
    createAsyncThunk("getWatchEditList", async (value, { rejectWithValue }) => {
        try {
            let res = await ApiService.get(`/getwatchupdatelist/${value}`);
            if (res.status == 200) {
                return res.data.UpdateListRes;
            }
        } catch (error) {
            return rejectWithValue({ error: error.message });
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
        producerList: [],
        actorList: [],
        updateEditData: {}
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
        addActorData:(state,action)=>{
            // console.log(action.payload);
           state.actorList.push(action.payload)
        },
        addProducerData:(state,action)=>{
            state.producerList.push(action.payload)
        },
        remove: (state, action) => {
            state.movieData.splice(action.payload, 1);
            state.movieDataSam.splice(action.payload, 1);
            state.watchListdata.splice(action.payload, 1);
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
                let data = action.payload.map((e, i) => e.producerName)
                state.producerList = data.filter((e, i) => data.indexOf(e) == i)
                let actorData = action.payload.map((e, i) => e.actorName)
                state.actorList = actorData.filter((e, i) => actorData.indexOf(e) == i)

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

            // editUpdatedata

            .addCase(getWatchEditList.pending, (state, action) => {
                state.isLoading = true;
                // state.updateEditData = '';
            })
            .addCase(getWatchEditList.fulfilled, (state, action) => {
                state.isLoading = false
                state.updateEditData = action.payload
            })
            .addCase(getWatchEditList.rejected, (state, action) => {
                state.isLoading = false;
                state.updateEditData = [];

            })
    }
})

export const { filter, remove, addWatchList, removeWatchList,addActorData,addProducerData } = movieData.actions;
export default movieData.reducer