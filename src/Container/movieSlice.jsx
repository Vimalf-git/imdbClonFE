import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../Common/ApiService";

export const getMoviList =
    createAsyncThunk("getMovieList", async (_, { rejectWithValue }) => {
        try {
            const res = await ApiService.get('/getmovielist');
            return res.data.data;
        } catch (error) {
            return rejectWithValue({ error: error.message })
        }
    })

export const postMoviList =
    createAsyncThunk("postMovieList", async (value, { rejectWithValue }) => {
        try {
            await ApiService.post('/createmovie', value, {
                headers: { "Content-Type": 'multipart/form-data' },
            })

        } catch (error) {
            return rejectWithValue({ error: error.message })
        }
    })



export const updateMovieList =
    createAsyncThunk("updateMovieList", async (value, { rejectWithValue }) => {
        try {
            await ApiService.put('/updatemovie', value, {
                headers: { "Content-Type": 'multipart/form-data' },
            })
        } catch (error) {
            return rejectWithValue({ error: error.message })
        }
    })

export const createWatchList =
    createAsyncThunk("createWatchList", async (value, { rejectWithValue }) => {
        try {
            let res = await ApiService.post('/createwatchlist', value)

        } catch (error) {
            return rejectWithValue({ error: error.message })
        }
    })


export const getWatchList =
    createAsyncThunk("getWatchList", async (value, { rejectWithValue }) => {
        try {
            let res = await ApiService.get(`/getwatchlist/${value}`)
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

export const getActorList =
    createAsyncThunk("getActorList", async (_, { rejectWithValue }) => {
        try {
            let res = await ApiService.get(`/getactors`);
            if (res.status == 200) {
                return res.data;
            }
        } catch (error) {
            return rejectWithValue({ error: error.message });
        }
    })
const movieData = createSlice({
    name: 'movieList',
    initialState: {
        movieData: [],
        movieDataSam: [],
        isLoading: false,
        watchListdata: [],
        producerList: [],
        actorList: [],
        updateEditData: {},
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
        updateMovieLocalList: (state, action) => {
            state.movieData.splice(action.payload.id, 1, action.payload.data)
            state.movieDataSam.splice(action.payload.id, 1, action.payload.data)

        },
        addActorData: (state, action) => {
            state.actorList.push(action.payload)
        },
        addProducerData: (state, action) => {
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
            })
            .addCase(getMoviList.rejected, (state, action) => {
                state.isLoading = false;
                state.movieDataSam = []
                state.movieData = []
            })
            
            .addCase(getWatchList.pending, (state, action) => {
            })
            .addCase(getWatchList.fulfilled, (state, action) => {
                state.watchListdata = action.payload
            })
            .addCase(getWatchList.rejected, (state, action) => {
                state.watchListdata = [];

            })

            // editUpdatedata

            .addCase(getWatchEditList.pending, (state, action) => {
                })
            .addCase(getWatchEditList.fulfilled, (state, action) => {
                state.updateEditData = action.payload
            })
            .addCase(getWatchEditList.rejected, (state, action) => {
                state.updateEditData = [];

            })

            .addCase(getActorList.pending, (state, action) => {
            })
            .addCase(getActorList.fulfilled, (state, action) => {
                state.actorList = action.payload.actorList
                state.producerList = action.payload.producerList
            })
            .addCase(getActorList.rejected, (state, action) => {
                state.actorList = []
                state.producerList = []
            })

    }
})

export const { filter, remove, addWatchList, removeWatchList,
    updateMovieLocalList, addActorData, addProducerData } = movieData.actions;
export default movieData.reducer