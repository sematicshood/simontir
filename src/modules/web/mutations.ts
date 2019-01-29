export const mutations = {
    UPDATE(state, data) {
        state[data.states] = data.update;
    }
}