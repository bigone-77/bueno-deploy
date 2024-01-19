import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface CurrentUserState {
    id: number;
    nickname: string;
    point: number;
}

const initialState = {
    id: 0,
    nickname: "",
    point: 0,
} as CurrentUserState

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<CurrentUserState>) => {
            state.id = action.payload.id;
            state.nickname = action.payload.nickname;
            state.point = action.payload.point;
        },
        removeCurrentUser: (state) => {
            state.id = 0;
            state.nickname = "";
            state.point = 0;
        },
        updateCurrentUserNickname: (state, action: PayloadAction<Partial<CurrentUserState>>) => {
            Object.assign(state, action.payload);
        }
    }
})

export const { setCurrentUser, removeCurrentUser, updateCurrentUserNickname } = currentUserSlice.actions;

export default currentUserSlice.reducer;