import { createSlice } from "@reduxjs/toolkit";

const mailsSlice = createSlice({
    name: "mails",
    initialState: {
        recievedMails: [],
        sentMails: [],
        selectedMail: null,
        totalUnreadMails: 0,
    },
    reducers: {
        addRecievedMails(state, action) {
            state.recievedMails = action.payload;
        },
        addSentMails(state, action) {
            state.sentMails = action.payload;
        },
        removeRecievedMail(state, action) {
            const id = action.payload;
            state.recievedMails = state.recievedMails.filter(
                (mail) => id !== mail.id
            );
        },
        removeSentMail(state, action) {},
        selectMail(state, action) {
            state.selectedMail = action.payload;
        },
        onRead(state, action) {
            const readId = action.payload;
            const existing = [...state.recievedMails];
            existing.forEach((mail) => {
                if (mail.id === readId) {
                    mail.unRead = false;
                }
            });
            state.recievedMails = existing;
        },
        updateUnRead(state, action) {
            state.totalUnreadMails = action.payload;
        },
    },
});

export const mailsAction = mailsSlice.actions;
export default mailsSlice.reducer;
