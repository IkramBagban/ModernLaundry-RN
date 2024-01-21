import { createSelector, createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    accounts: [],
    conversation: [], // messages will be here.
  },

  reducers: {
    addAccountsToStore: (state, action) => {
      state.accounts = action.payload;
      console.log("accounts added to store");
    },

    addAllConversationToStore: (state, action) => {
        console.log("conversation adding...");
      state.conversation = action.payload;
      console.log("conversation added to store");
    },
  },
});

export const { addAccountsToStore, addAllConversationToStore } =
  chatSlice.actions;
export default chatSlice.reducer;

export const selectAllAccounts = (state) => state.chat.accounts;
export const selectAllConversation = (state) => state.chat.conversation;

export const getAllAccounts = createSelector(
  [selectAllAccounts],
  (accounts) => accounts
);

export const getAllConversation = createSelector(
  [selectAllConversation],
  (conversation) => conversation
);
