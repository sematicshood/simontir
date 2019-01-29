export const actions = {
    changeStatusSidebar({ commit, state }) {
        commit('UPDATE', {states: 'sidebar', update: !state.sidebar});
    }
}