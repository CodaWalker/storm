<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Создать новую заявку</h1>
        <v-form v-model="valid" ref="form" validation class="mb-3">
          <v-text-field
                  name="title"
                  label="Назание заявки"
                  type="text"
                  v-model="title"
                  required
                  :rules="[v => !!v || 'Необходимо назвать заявку кратко, используйте ключевые слова']"
          ></v-text-field>
          <v-textarea
                  name="description"
                  label="Описание заказа"
                  type="text"
                  v-model="description"
                  multi-line
                  :rules="[v => !!v || 'Опишите свою заявку максимально подробно']"
          ></v-textarea>
        </v-form>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-btn class="warning">
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img src="" height="100">
          </v-flex>
        </v-layout><hr>
        <v-layout row

        >
          <v-flex xs12>
            <v-switch
                    label="Добавить в общий чат(по умолчанию) или указать специалиста?"
                    v-model="promo"
                    color="primary"
            ></v-switch> </v-flex><v-flex xs8 sm6>
            <v-select
                    :items="agents"
                    label="Solo field"
                    solo
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 >
            <v-spacer></v-spacer>
            <v-btn
                    :disabled="!valid"
                    class="success"
                    @click="createTicket"
            >
              Создать заявку
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

    export default {
        mounted:function(){
        },
        data () {
            return {
                nickName:[],
                title: '',
                description: '',
                promo: false,
                valid: false,
                agents: ['@Alex','@Rush'
                ]
            }
        },
        methods: {
            createTicket () {
                if (this.$refs.form.validate()) {
                    // logic
                    const ticket = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo,
                        imgSrc:'https://avdisk.ru/uploads/images/n/o/n/noname.jpg'
                    };

                    this.$store.dispatch('createTicket',ticket)
                }
            }
        }
    }
</script>
