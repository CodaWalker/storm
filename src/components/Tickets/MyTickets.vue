<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Мои заявки</h1>
                <v-card
                class="elevation-10 mb-2"
                v-for="ticket in myTickets"
                :key="ticket.id"
                >
                    <v-layout row>
                        <v-flex xs4>
                            <v-img
                                :src="ticket.imgSrc"
                                height="160px"
                            ></v-img>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2 class="text--primry">{{ticket.title}}</h2>
                                <p>{{ticket.description}}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-flex sm7>
                                    <v-select

                                            v-model="ticket.status"
                                            :items="status"
                                            label="Статус"
                                            solo
                                    ></v-select>
                                </v-flex>
                                <v-spacer></v-spacer>
                                <v-btn
                                        class="info"
                                        :to="'/ticket/' + ticket.id"
                                >Открыть</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data(){
          return {
              status:['новая','открыта','в процессе','остановлена','закрыта']
          }
        },
        computed:{
            myTickets(){
                return this.$store.getters.myTickets
            }
        }
    }
</script>
