import { RootState } from "..";
import get from 'lodash.get'
import { createSelector } from "@reduxjs/toolkit";

const authSelector = (state: RootState) => state.auth;

export const getToken = createSelector(authSelector, authState => get(authState, 'token', ''));
export const getUser = createSelector(authSelector, authState => get(authState, 'user', null));
export const getIsAuthenticated = createSelector(getToken, getUser, (token, user) => token && user);

export const getName = createSelector(getUser, user => get(user, 'name', ''));
export const getUserName = createSelector(getUser, user => get(user, 'login', ''));
export const getUserEmail = createSelector(getUser, user => get(user, 'email', ''));
export const getUserAvatar = createSelector(getUser, user => get(user, 'avatar_url', ''));
export const getUserCompany = createSelector(getUser, user => get(user, 'company', ''));
export const getUserLocation = createSelector(getUser, user => get(user, 'location', ''));
export const getUserBio = createSelector(getUser, user => get(user, 'bio', ''));
export const getUserBlog = createSelector(getUser, user => get(user, 'blog', ''));

export const getUserTotalFollowers = createSelector(getUser, user => get(user, 'followers', 0));
export const getUserTotalFollowing = createSelector(getUser, user => get(user, 'following', 0));
export const getUserTotalGistsCount = createSelector(getUser, user => get(user, 'public_gists', 0));
export const getUserTotalReposCount = createSelector(getUser, user => get(user, 'public_repos', 0));