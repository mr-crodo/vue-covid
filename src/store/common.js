export default {
    state: {
        loading: false,
        error: false
    },
    mutations: {
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state) {
            state.error = false
        }
    },
    actions: {
        setLoading ({ commit }, payload) {
            commit('setLoading', payload)
        },
        setError ({ commit }, payload) {
            commit('setError', payload)
        },
        clearError ({ commit }, payload) {
            commit('clearError', payload)
        }
    },
    getters: {
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
}