import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const types = {
  set_AUTHENTICATED:'SET_AUTHENTICATED',
  SET_USER:'SET_USER'
}
const getters = {
  isAuthentivated:state => state.isAuthentivated,
  user: state =>state.user
}
const state={
  isAuthentivated:false,
  user:{}
};
const mutations= {
  [types.set_AUTHENTICATED](state,isAuthentivated){
    if(isAuthentivated){
      state.isAuthentivated = isAuthentivated
    }
    else{
      state.isAuthentivated = false
    }
  },
  [types.SET_USER](state,user){
    if(user){
      state.user = user
    }
    else{
      state.user = {}
    }
  },
};
const actions={
  setAuthentivated : ({commit},isAuthentivated)=>{
    commit(types.set_AUTHENTICATED,isAuthentivated);
  },
  SetUser:({commit},user)=>{
    commit(types.SET_USER,user)
  },
  clearCurrentState :({commit})=>{
    commit(types.set_AUTHENTICATED,false);
    commit(types.SET_USER,null);
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
