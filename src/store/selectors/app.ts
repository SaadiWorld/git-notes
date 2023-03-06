import { RootState } from "..";
import get from 'lodash.get'
import { createSelector } from "@reduxjs/toolkit";

const appSelector = (state: RootState) => state.app;

export const getAppPage = createSelector(appSelector, appState => get(appState, 'page', 1));
export const getAppPerPage = createSelector(appSelector, appState => get(appState, 'per_page', 14));
export const getGists = createSelector(appSelector, appState => get(appState, 'gists', null));