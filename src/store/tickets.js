import root from '../main'
export default {
    state:{
        tickets: []
    },
    mutations:{
        createTicket(state, payload){
            state.tickets.push(payload)
        },
        setTickets(state,tickets){setTimeout(()=>{
            state.tickets = tickets; },1);
            //state.t = tickets;
            //console.log(state.t);
        },
    },
    actions:{
        getTickets({ commit },time) {
            setTimeout(()=>{
                //commit('setLoadingComb', true);
                root.axios.get("http://storm/api.php?action=read&obj=tickets")
                    .then(response => {
                        if (response.data.error) {
                            this.errorMessage = response.data.message;
                            console.log('err-tickets');
                        } else {  //console.log(this.state.users)
                            //this.state.users = response.data.users;
                            console.log('ok-tickets');
                            const tickets = response.data.tickets;
                            commit('setT',tickets);
                            commit('setTickets',tickets);
                            //  this.users = (response.data.users);
                            // console.log(this.users);
                            //return this.users
                        }
                        // commit('setUsers',response.data )
                    });
            },time);
            //setTimeout(() => {commit('setLoadingComb', false);}, 1);
        },
        createTicket({commit},payload){
            payload.id = '5';
            commit('createTicket',payload)
        }
    },
    getters:{

        allTickets (state){
            //console.log(state.tickets);
            return state.tickets
        },
        // shareTickets(state){
        //     return state.tickets.filter(ticket => {
        //         // return ticket.share === true // аналогично тому что ниже
        //         return ticket.share === '1'
        //     })
        // },
        allTickets(state){
            return state.tickets.filter(ticket => {
                // return ticket.share === true // аналогично тому что ниже
                return ticket
            })
        },
        //ticket.CreatedUserID
        ticketById(state){
            console.log();
            return ticketId => {
                return state.tickets.find(
                    ticket => ticket.id === ticketId)
            }
        },
        // ticketByUId(state){
        //     return ticketUId => {
        //         return state.tickets.find(
        //             ticket => ticket.CreatedUserID === ticketUId)
        //     }
        // }
    }
}