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

export const getSelectedGist = createSelector(appSelector, appState => get(appState, 'selectedGist', null));
export const getSelectedGistId = createSelector(getSelectedGist, selectedGist => get(selectedGist, 'id', null));
export const getSelectedGistOwner = createSelector(getSelectedGist, selectedGist => get(selectedGist, 'owner', null));
export const getIsStarredGist = createSelector(getSelectedGist, selectedGist => get(selectedGist, 'isStarred', false));
export const getForkedGistId = createSelector(getSelectedGist, selectedGist => get(selectedGist, 'forkedGistId', null));
export const getForksList = createSelector(getSelectedGist, selectedGist => get(selectedGist, 'forks', []));
export const getSelectedGistUserName = createSelector(getSelectedGistOwner, selectedGistOwner => get(selectedGistOwner, 'login', ''));

export const getValidationStates = createSelector(appSelector, appState => get(appState, 'validationStates', null));
export const getAppMessage = createSelector(getValidationStates, validationStates => get(validationStates, 'message', ''));
export const getIsAppLoading = createSelector(getValidationStates, validationStates => get(validationStates, 'isLoading', false));
export const getIsAppSuccess = createSelector(getValidationStates, validationStates => get(validationStates, 'isSuccess', false));
export const getIsAppError = createSelector(getValidationStates, validationStates => get(validationStates, 'isError', false));

