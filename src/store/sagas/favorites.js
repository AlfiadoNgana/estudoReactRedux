import { call, put, select } from 'redux-saga/effects'; // serve para le dar com async await e promises
import api from '../../services/api';

import { Creators as FavoriteActions } from '../ducks/favorite';

export function* addFavorite(action) {
  try {
    // const response = yield api.get(api.get, `/repos/${action.payload.repository}`);
    // este call do redux-saga usamos para le dar com metodos que retornam promises
    const { data } = yield call(api.get, `/repos/${action.payload.repository}`);

    const isDuplicate = yield select(state =>
      state.favorites.data.find(favorite => favorite.id === data.id)
    );
    if (isDuplicate) {
      yield put(FavoriteActions.addFavoriteFailure('repositorio ja existe'));
    } else {
      const repositoryData = {
        id: data.id,
        name: data.full_name,
        description: data.description,
        url: data.html_url,
      };
      console.log(repositoryData);

      // enviar action para os reduceres da nossa aplicacao
      yield put(FavoriteActions.addFavoriteSuccess(repositoryData));
    }
  } catch (error) {
    yield put(
      FavoriteActions.addFavoriteFailure('erro ao adicionar repositorio')
    );
  }
}
