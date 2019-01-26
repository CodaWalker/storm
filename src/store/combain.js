import safeJsonStringify from 'safe-json-stringify'
export default {
    // props:['uid'],
    state: {
        t:[],
        n:[],
        u:[],
        a:0,
       // loading:false
    },
    mutations:{
        setClickNoticeId(state,val){
            state.a = val;
        },
        // setLoadingComb(state,val) {
        //     state.loading = val;
        // },
        setT(state,param){
            state.t = param;
            //console.log(state.t);
        },

        setN(state,param){
            state.n = param;
            //console.log(state.n);
        },
        setU(state,param){
            state.u = param;
            //console.log(state.m);
        }
    },
    actions:{
    },
    getters: {
        getLoadingComb:(state) => state.loading,

        allTicketsComb(state){
            return state.t.filter(_t => {

               return _t
              //  console.log(state.t[1].notices);//1,6
              //  console.log(state.t[2].notices);//1,6
            })
        },

        allNoticesComb(state) {
            state.t.notices = [];
            state.t.noticeIds = [];
            state.n.filter(_n => {
            _n.ticket = state.t[_n.ticketID - 1];
            });

            state.n.filter(_n => {
                    //console.log(_n.id+'-'+_n.senderID+'-'+_n.recipientID);
                    for(let i=0;i<state.u.length;i++){
                        //console.log(state.u[i].id);
                        if(state.u[i].id === _n.senderID)
                        { //console.log('notis ID'+_n.id);
                            //console.log('sender ID' + state.u[i].id);
                            _n.sender = state.u[i]
                        }
                        if(state.u[i].id === _n.recipientID)
                        { //console.log('notis ID'+_n.id);
                            //console.log('recipient ID' + state.u[i].id);
                            _n.recipient = state.u[i]
                        }
                    }
            });
            state.t.filter(_t => {
                _t.createdUser = state.u[_t.CreatedUserID - 2];
                _t.all_notices = state.n;
                let i = 0;
                while(i < _t.all_notices.length){
                    i++;

                    if(_t.id === _t.all_notices[i-1].ticket.id){

                        if(_t.notices){
                                     //_t.notices = state.n[i-1]
                                    _t.notices.push(state.n[i-1]);
                        }
                        else
                            _t.notices = [ state.n[i-1] ];

                        //_t.notices = [ state.n[i-1] ];
                        if(_t.noticeIds){
                            //_t.noticeIds.push(state.n[i-1].id);
                             _t.noticeIds.push(parseInt(state.n[i-1].id));

                            //_t.noticeIds.push(state.n[i-1].id);
                        }
                        else
                            //_t.noticeIds = [ state.n[i-1].id ]
                             _t.noticeIds = [ parseInt(state.n[i-1].id) ]
                        //_t.noticeIds = [ state.n[i-1].id ]
                    }
                }  //delete  _t.all_notices;
        });
            //console.log(state.n);
            return state.n.filter(_n => {

                 //_n = safeJsonStringify(_n.notices);
                //_n = _n.notices;
                console.log(_n);
                           return _n
                 })
        },

    }

}
