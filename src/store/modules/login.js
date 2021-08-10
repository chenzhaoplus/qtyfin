
const state={
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
}
const getters={}
const actions={}
const mutations = {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
        state.Authorization = user.Authorization;
        localStorage.setItem('Authorization', user.Authorization);
    }
}

export default{
    state, 
    getters,
    actions,
    mutations,
}