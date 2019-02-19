export const getters = {
    GET(state: any) {
        return (params: any) => {
            return state[params];
        };
    },
};
