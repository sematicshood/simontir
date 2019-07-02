export const mutations = {
    UPDATE(state: any, data: any) {
        state[data.states] = data.update;
    },
};
