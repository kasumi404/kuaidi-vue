import { login } from '@/api/manage'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      //const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        if(userInfo.username === 'admin'&& userInfo.userpassword === '123456'){
          commit('SET_TOKEN', userInfo.username)
          commit('SET_NAME', userInfo.username)
          setToken(userInfo.username)
          resolve()
        }
        else{
          login(userInfo.username,userInfo.userpassword).then(response => {
            const data = response.data.manage
            if(data.root === 'admin' || data.root === 'normal'){
              commit('SET_TOKEN', data.root)
              commit('SET_NAME', userInfo.username)
              setToken(response.data.manage.root)
              resolve()
            }
            else{
              reject("")
            }
          }).catch(error => {
            reject(error)
          })
        }
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const roles = state.token;
        if (roles && roles.length > 0) {
          commit('SET_ROLES', roles)
        }else {
          reject('getInfo: roles must be a non-null array !')
        }
        resolve(roles)
        // getUserInfo(state.token).then(response => {
        //   console.log('getUserInfo  '+response[0].data)
        //   if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
        //     reject('error111')
        //   }
        //   const data = response[0].data

        //   if (data.userroot && data.userroot.length > 0) { // 验证返回的roles是否是一个非空数组
        //     commit('SET_ROLES', data.userroot)
        //   } else {
        //     reject('getInfo: roles must be a non-null array !')
        //   }

        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   commit('SET_INTRODUCTION', data.introduction)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
