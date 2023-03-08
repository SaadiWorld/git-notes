import { RootState } from "..";
import get from 'lodash.get'
import { createSelector } from "@reduxjs/toolkit";
import { GIST_VIEW, INITIAL_PAGE, PER_PAGE, TOTAL_GISTS_COUNT } from "../../types/common";

const appSelector = (state: RootState) => state.app;

export const getAppPage = createSelector(appSelector, appState => get(appState, 'page', INITIAL_PAGE));
export const getAppPerPage = createSelector(appSelector, appState => get(appState, 'per_page', PER_PAGE));
export const getTotalGists = createSelector(appSelector, appState => get(appState, 'total_gists', TOTAL_GISTS_COUNT));
export const getGists = createSelector(appSelector, appState => get(appState, 'gists', null));
export const getClientId = createSelector(appSelector, appState => get(appState, 'client_id', ''));
export const getRedirectUri = createSelector(appSelector, appState => get(appState, 'redirect_uri', ''));
export const getGistView = createSelector(appSelector, appState => get(appState, 'gist_view', GIST_VIEW.LIST));