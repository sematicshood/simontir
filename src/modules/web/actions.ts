export const actions = {
    changeStatusSidebar({ commit, state }: any) {
        commit('UPDATE', {states: 'sidebar', update: !state.sidebar});
    },
};
