<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration form</v-toolbar-title>

          </v-toolbar>
          <v-card-text>
            <v-form  v-model="valid" ref="form" validation>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                v-model="getUser.email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                v-model="getUser.password"
                :counter="6"
                :rules="passwordRules"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="confirm-password"
                label="ConfirmPassword"
                type="password"
                v-model="getUser.confirmPassword"
                :counter="6"
                :rules="confirmPasswordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onSubmit()"
              :disabled="!valid"
            >Create account</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // import axios from '../../../node_modules/axios/dist/axios.min'
  import root from '../../main'
  export default {
    data () {
      return {
        user:{
            nickName: 'user',
            email: 's',
            password: 's',
            statusOnline: '1',
        },
        valid: false,
        emailRules: [
          v => !!v || 'Требуется E-mail',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail должен быть действительным',
          v => this.emailUnic(v) || 'Email должен быть уникальным'
        ],
        passwordRules: [
          v => !!v || 'Необходим пароль',
          v => (v && v.length >= 6) || 'Пароль должен быть равен больше 6 символов'
        ],
        confirmPasswordRules:[
          v => !!v || 'Необходим пароль',
          v => v === this.getUser.password || 'Пароль должен соответствовать'
        ]
      }
    },
      computed:{
        emailComputed(){
            return true;
        },
          getUser() {
              return this.$store.getters.getUser
          },
          getToFormDataUser(){
            return this.$store.getters.getToFormDataUser
          },
          getToFormData(){
              return this.$store.getters.getToFormData;
          }


      },

    methods: {
        emailUnic(){
            this.$store.commit('setToFormData', this.getUser);
            //Выполнить создание пользователя выбранного из FormData
            this.$store.dispatch('getSearchEmailUnic', this.getToFormData);
            return false;
        },
        registerUser(obj) {
        console.log(obj);
        //commit('setLoading', true);
        // let formData = commit('toFormData',this.editedItem);
        //let obj = {email,password};
        root.axios.post("http://storm/api.php?action=create&obj=user", this.ToFormData(obj))
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
                    console.log(user);
                    //commit('setUser',user);
                    //this.dispatch('getAllUsers');
                }
            });
    },
        ToFormData(val){

            let form_data = new FormData();
            for (   let key in val ) {
                //console.log(val);
                form_data.append(key, val[key]);
                //console.log(form_data.getAll('userName'));
            }

            return form_data;
        },

      onSubmit() {
        if (this.$refs.form.validate()) {
           console.log(this.getUser);
            //this.registerUser(this.getUser);

            this.$store.commit('setToFormData', this.getUser);
            //Выполнить создание пользователя выбранного из FormData
            this.$store.dispatch('getSaveUser', this.getToFormData);
            //создаем значение - create
//          const user = {
//            email: this.email,
//            password: this.password,
//            nickName: this.nickName,
//            statusOnline: this.statusOnline
//          };
            //Не выполняем никаких проверок, а следом добавляем данные в FormData
            //this.$store.commit('setToFormDataUser',this.getUser);
            //Выполнить создание пользователя выбранного из FormData
            //return this.$store.dispatch('registerUser', this.getToFormDataUser);
        }
      }
    }
  }
</script>
