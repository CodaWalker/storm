import root from '../main'

class User{
    constructor(id){
        this.id = id
    }
}
export default {
    state: {
        users:[],
        user: {
            nickName: 'user',
            email: '',
            password: '',
            confirmPassword:'',
            statusOnline: '1',
            },
        error:null,
        formData:{},
    },
    mutations:{
        setUser(state,user){
            state.user = user;
        },
        setUsers(state,users){
            state.users = users;
        },
        setError(state,payload){
            state.error = payload;
        },
        clearError(state){
            state.error = null;
        },
        setToFormDataUser(state,val){

            let form_data = new FormData();
            for (   let key in val ) {
                form_data.append(key, val[key]);
                //console.log(form_data.getAll('userName'));
            }
            //console.log(form_data);S
            state.formData = form_data;
        },
    },
    actions:{
        registerUser({commit}, obj) {
            console.log(obj);
            //commit('setLoading', true);
            // let formData = commit('toFormData',this.editedItem);
            //let obj = {email,password};
            root.axios.post("http://storm/api.php?action=create&obj=user", obj)
                .then(response => {
                    console.log(response);
                    if (response.data.error) {
                        this.errorMessage = response.data.message;
                        console.log(this.errorMessage);
                        //commit('setSnackNameOtherVal','создания');
                        //commit('setSnack','error');
                    } else {
                        let user = response.data.user;
                        this.successMessage = response.data.message;
                        commit('setUser',user);
                        //this.dispatch('getAllUsers');
                    }
                });
            //setTimeout(() => {commit('setLoading', false);}, 1000);
        },

        getUsers({ commit },time) {
            setTimeout(()=>{
                //commit('setLoadingComb', true);
                root.axios.get("http://storm/api.php?action=read&obj=users")
                    .then(response => {
                        if (response.data.error) {
                            this.errorMessage = response.data.message;
                            console.log('err-users');
                        } else {
                            console.log('ok-users');
                            const users = response.data.users;
                            commit('setU',users);
                            commit('setUsers',users);
                        }
                    });
            },time);
            //setTimeout(() => {commit('setLoadingComb', false);}, 1);
        }
    },
    getters:{
        getToFormDataUser:(state) => state.formData,

        getUser:(state) => state.user,

        allUsers(state){
            // this.dispatch('getUsers',20000);
            return state.users
        },
        userById(state){
            return userId => {
                return state.users.find(
                    user => user.id === userId)
            }
         },
    }
}
