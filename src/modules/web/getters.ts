export const getters = {
    GET(state) {
        return (params) => {
            return state[params]
        }
    }
}