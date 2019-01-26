import root from '../main'
export default {

    state:{
        notices: [],
    },
    mutations:{

        createNotices(state, payload){
            state.notices.push(payload)
        },
        setNotices(state,notices){
            state.notices = notices;
            //state.n = notices;


            //console.log(state.n);
        },
    },
    actions:{
         getNotices({ commit },time) {
            setTimeout(()=>{
               // commit('setLoadingComb', true);
                root.axios.get("http://storm/api.php?action=read&obj=notices")
                    .then(response => {
                        if (response.data.error) {
                            this.errorMessage = response.data.message;
                            console.log('err-notices');
                        } else {  //console.log(this.state.users)
                            //this.state.users = response.data.users;
                            console.log('ok-notices');
                            const notices = response.data.notices;
                            commit('setNotices',notices);
                            commit('setN',notices);
                            //  this.users = (response.data.users);
                            // console.log(this.users);
                            //return this.users
                        }
                        // commit('setUsers',response.data )
                    });
            },time);
             //setTimeout(() => {commit('setLoadingComb', false);}, 1);
        },
        createNotice({commit},payload){
            payload.id = '5';
            commit('createNotice',payload)
        }
    },
    getters:{
        allNotices (state){
            return state.notices
        },
        noticeById(state){
            return noticeId => {
                return state.notices.find(

                    notice => notice.id === noticeId)

            }
        },
        // inboxNotices(state){
        //     return state.notices.filter(notice => {
        //         // return notice.share === true // аналогично тому что ниже
        //         return notice.box === 'inbox'
        //     })
        // },
        // outboxNotices(state){
        //     return state.notices.filter(notice => {
        //         // return notice.share === true // аналогично тому что ниже
        //         return notice.box === 'outbox'
        //     })
        // },
        noticesTicketId(state){
            //
        },
        // noticeById(state){
        //     return ticket => {
        //         return state.notices.find(notice => notice.ticketId === state.tickets.ticket.id)
        //
        //     }
        // }
    }
}