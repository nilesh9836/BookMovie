import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state={
	favMovies: []
};

const mutations={
	MARK_FAV(state, payload) {
		if (state.favMovies.length === 0 || state.favMovies.some(e => e.imdbID !== payload.imdbID)) {
			state.favMovies.push(payload);
		}
	},
};

const actions={
	markAsFav(context, movie) {
		context.commit("MARK_FAV", movie);
	},
};

const getters={
	getFavMovies(state) {
		return state.favMovies;
	}
};

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
});
