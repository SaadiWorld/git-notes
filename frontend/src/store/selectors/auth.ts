import { RootState } from "..";
import get from 'lodash.get'
import { createSelector } from "@reduxjs/toolkit";

const authSelector = (state: RootState) => state.auth;

export const getToken = createSelector(authSelector, authState => get(authState, 'token', ''));
export const getUser = createSelector(authSelector, authState => get(authState, 'user', null));
export const getUserAvatar = createSelector(getUser, user => get(user, 'avatar_url', ''));
export const getUserTotalGistsCount = createSelector(getUser, user => get(user, 'public_gists', 0));