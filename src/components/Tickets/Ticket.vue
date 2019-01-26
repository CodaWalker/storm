<template >
  <v-container>

    <v-layout align-content-space-between row>


        <v-flex d-flex xs12 sm6 md4>
          <v-card v-if="not" text-color="rgb(25, 118, 210)">
            <v-card-title primary class="title"><h4>{{box}} Предложение ID#{{not.id}}</h4></v-card-title>
            <v-card-text> <v-form ref="form"  v-model="valid" lazy-validation>
              <v-text-field
                      :disabled="disabled"
                      v-model="not.name"
                      :rules="nameRules"
                      :counter="10"
                      label="Название "
                      required
              ></v-text-field>
              <v-text-field
                      :disabled="disabled"
                      v-model="not.name"
                      :rules="nameRules"
                      :counter="10"
                      label="Название "
                      required
              ></v-text-field>
              <v-text-field
                      :disabled="disabled"
                      v-model="not.name"
                      :rules="nameRules"
                      :counter="10"
                      label="Название "
                      required
              ></v-text-field>
              <v-btn class="primary"
                     @click="setPerformingUserID(not.recipientID)"
              >

              </v-btn>
              <v-checkbox
                      :disabled="disabled"
                      v-model="checkbox"
                      :rules="[v => !!v || 'You must agree to continue!']"
                      label="Do you agree?"
                      required
              ></v-checkbox>

              <v-btn
                      :disabled="!valid || disabled"
                      @click="submit"
              >
                submit
              </v-btn>
              <v-btn  :disabled="disabled"
                      @click="clear">clear</v-btn>
            </v-form>

            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md5 >
        <v-card
                class="mx-auto"
                v-if="ticket && user">
          <v-layout align-content-space-between row>
          <v-flex d-flex xs12 sm6 md4 >
            <v-card>
           </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm12 md4 >
            <v-card>
              <v-img
                      :aspect-ratio="16/9"
                      :src="ticket.imgSrc"
              ></v-img>
            </v-card>
          </v-flex>
            <v-flex d-flex xs12 sm6 md4 >
              <v-card>
              </v-card>
            </v-flex>
            </v-layout>

          <v-card-text>
            <div>
              <h4 class="text--primary mb-4"><p>Заявка ID#{{ticket.id}} {{ticket.title}}</p></h4>
            </div>
            <v-flex  d-flex xs12 sm12 md12>
              <v-textarea
                      style="font-size:smaller"
                      outline
                      :disabled="disabled"
                      :rows="1"
                      name="ticketDescription"
                      label="Описание:"
                      v-model="ticket.description"
              ></v-textarea>
            </v-flex>
            <v-flex md12>
              <v-progress-linear  height="3" v-model="heightList"></v-progress-linear></v-flex>
            <v-layout
                    id="scroll"
                    v-scroll:#scroll-target="onScroll"
                    column
                    align-center
                    justify-center
                    style="max-height: 255px"
            >
            <v-container

                    id="scroll-target"
                    class="scroll-y"
            >
            <v-list-tile
                    v-bind:class="{ isActive: clickNoticeId   ===  notice.id }"
                    style="padding-top:5px;padding-bottom: 3px"
                    avatar
                    v-for="notice in  allNoticesComb"
                    v-if="notice.ticket.id === ticket.id "
                    :key="notice.id"
            >
              <v-list-tile-content>
                <v-list-tile-title>
                  <h6  class="text--secondary mb-6">Оправитель: {{notice.sender.nickName}}</h6>
                </v-list-tile-title>
                <v-list-tile-title>
                  <h6  class="text--secondary mb-6">Получатель: {{notice.recipient.nickName}}</h6>
                </v-list-tile-title>
                <v-list-tile-title>
                  <h6  class="text--secondary mb-7">Status: {{notice.status}}  </h6>
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                        :to="'/ticket/' + notice.ticket.id + '&' + notice.ticket.CreatedUserID"
                        @click="clickNoticeIdN(notice.id)"
                        class="primary"
                        v-bind:class="{ isDisabled: clickNoticeId   ===  notice.id}"
                >Выбрать</v-btn>
              </v-list-tile-action>


            </v-list-tile>
              </v-container
>
              </v-layout>





            <!--<h1 class="text&#45;&#45;secondary">{{ticket.title}}</h1>-->

          </v-card-text>
          <!--<v-card-actions>-->
            <!--<v-btn class="warning" flat>Редактировать</v-btn>-->
            <!--<v-btn class="success">Принять</v-btn>-->
          <!--</v-card-actions>-->


        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md4>
        <v-card  v-if="not" text-color="rgb(25, 118, 210)">
          <v-card-title primary class="title">



          </v-card-title>
          <v-card-text>
            <v-flex xs12>
             <!-->
            </v-flex>
            <h5 class="text--secondary"><p></p></h5>

            <v-form ref="form"  v-model="valid" lazy-validation>
              <v-text-field
                      :disabled="disabled"
                      v-model="not.dateCreate"
                      :rules="nameRules"
                      label="Создан"
                      required
              ></v-text-field>
              <v-text-field
                      :disabled="disabled"
                      v-model="not.dateCreate"
                      :rules="nameRules"
                      label="Создан"
                      required
              ></v-text-field>
              <v-text-field
                      :disabled="disabled"
                      v-model="not.dateCreate"
                      :rules="nameRules"
                      label="Создан"
                      required
              ></v-text-field>
              <v-select
                      :disabled="disabled"
                      v-model="statusRules"
                      :items="items"
                      :rules="[v => !!v || 'Item is required']"
                      label="Item"
                      required
              ></v-select>
              <v-text-field
                      :disabled="disabled"
                      v-model="not.dateOver"
                      :rules="nameRules"
                      label="Завершиено"
                      required
              ></v-text-field>
              <v-checkbox
                      :disabled="disabled"
                      v-model="checkbox"
                      :rules="[v => !!v || 'You must agree to continue!']"
                      label="Do you agree?"
                      required
              ></v-checkbox>

              <v-btn
                      :disabled="!valid || disabled"
                      @click="submit"
              >
                submit
              </v-btn>
              <v-btn  :disabled="disabled"
                      @click="clear">clear</v-btn>
            </v-form>


          </v-card-text>
        </v-card>
      </v-flex>




    </v-layout>

  </v-container>

</template>

<script>
  export default {
      mounted(){
          this.$store.dispatch('getTickets');
                   this.$store.dispatch('getUsers');
          this.$store.dispatch('getNotices');

                   },
      data: () => ({
//          buttons:{
//              open:true,
//              edit:false
//          },
          heightList:0,
          offsetTop: 0,
          isActive: true,
          box:'',
          //!!!
          disabled:true,
          valid: true,
          name: '',
          nameRules: [
              v => !!v || 'Name is required',
              v => (v && v.length <= 10) || 'Name must be less than 10 characters'
          ],
          status: '',
          statusRules: [
              v => !!v || 'E-mail is required',
              v => /.+@.+/.test(v) || 'E-mail must be valid'
          ],
          select: null,
          items: [
              'Item 1',
              'Item 2',
              'Item 3',
              'Item 4'
          ],
          checkbox: false,
          performingUserID:0
          //!!!

      }),
   props:['tid','uid','nid'],
      methods:{
//          buttonClick(){
//              this.buttons.edit = !this.buttons.edit;
//              this.buttons.open = !this.buttons.open;
//          },
          //noticeLength(noticeLength){},
          onScroll (e) {
              //console.log(this.noticeLength);
             // if(){this.heightList = 100;}
              this.heightList = ~~((e.target.scrollTop/(e.target.scrollHeight - e.target.clientHeight))*100);
          },
          clickNoticeIdN(nid) {
              this.$store.state.combain.a = nid;
          },
          setPerformingUserID(id){
              this.performingUserID = id;
              console.log(this.performingUserID);
              //Выполнить добавление в базу выбора исполнителя, но прежде запрос на подтверждение в течении некоторого времени
              //Выключить доступноть этой кнопки, и включить подстветку для предложения.
              //Добавить возможность писать комментарии и статус после подтверждения о выполнении.
          },

          //!!!
          submit () {
              if (this.$refs.form.validate()) {
                  // Native form submission is not yet supported
                  axios.post('/api/submit', {
                      name: this.name,
                      email: this.email,
                      select: this.select,
                      checkbox: this.checkbox
                  })
              }
          },
          clear (){
              this.$refs.form.reset()
          }
          //!!!



      },
      computed: {

          not() {
              //console.log(this.$store.getters.noticeById(this.$store.state.combain.a));
              return this.$store.getters.noticeById(this.$store.state.combain.a);
          },
          clickNoticeId() {
              //const nid = this.nid;
              // const nid = this.nid;
              return this.$store.state.combain.a;
           //   console.log(this.$store.state.combain.a);
          },

          allNoticesComb(){
              //console.log(this.$store.getters.allNoticesComb);
              return  this.$store.getters.allNoticesComb
          },
          ticket() {
              const tid = this.tid;
              return this.$store.getters.ticketById(tid)
          },
          user() {
              const uid = this.uid;
              //console.log(this.$store.getters.userById(uid));
              return this.$store.getters.userById(uid)
          }

      }
  }
</script>
<style>
    .isActive{
    background-color: #1976d2;
    border-radius: 9px;
    border-color: #2262d2;
    border-style: solid;
    border-bottom-width: 6px;
    border-right-width: 6px;
  }
  .isDisabled{
    display: none;
  }
  #scroll{
    background-color: snow;
    border:solid;
    border-color: green;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    overflow: hidden;
    padding-right: 17px;

  }

  #scroll-target{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding-right: 17px; /* Increase/decrease this value for cross-browser compatibility */
    box-sizing: content-box; /* So the width will be 100% + 17px */
  }
    div.isNoActive{
    background-color: rebeccapurple;
    border-radius: 9px;
    border-color: #2262d2;
    border-style: solid;
    border-bottom-width: 6px;
    border-right-width: 6px;
  }
</style>