<!--<template>-->

    <!--<div>-->
        <!--<v-container grid-list-lg>-->
            <!--<v-layout row wrap>-->
                <!--<v-flex-->
                        <!--xs12-->
                        <!--sm6-->
                        <!--md4-->
                        <!--v-for="ticket in shareTickets"-->
                        <!--:key="ticket.id"-->
                <!--&gt;-->
                    <!--<v-card>-->
                        <!--<v-img-->
                                <!--:src="ticket.imgSrc"-->
                                <!--height="200px"-->
                        <!--&gt;-->
                        <!--</v-img>-->
                        <!--<v-card-title primary-title>-->
                            <!--<div>-->
                                <!--<h3 class="headline mb-0">{{ticket.name}}</h3>-->
                                <!--<div><h5 class="mb-5">{{ticket.description}}</h5></div>-->
                            <!--</div>-->
                        <!--</v-card-title>-->
                        <!--<v-card-actions>-->
                            <!--<v-spacer></v-spacer>-->
                            <!--<v-btn flat :to="'/ticket/' + ticket.id">Открыть</v-btn>-->
                            <!--<v-btn raised class="primary">Принять</v-btn>-->
                        <!--</v-card-actions>-->
                    <!--</v-card>-->
                <!--</v-flex>-->
            <!--</v-layout>-->
        <!--</v-container>-->
    <!--</div>-->
<!--</template>-->
<template>
    <v-container>
        <v-layout row justify-space-between >
            <v-flex  xs3 >
                                <h1 class="text--secondary mb-3">Заявки в общем чате</h1>
                                <v-card
                                        class="elevation-10 mb-2"
                                        v-for="ticket in allTickets"
                                        :key="ticket.id"
                                        v-if="ticket"
                                >
                                    <v-layout row>
                                        <v-flex xs8>
                                            <v-img
                                                    :src="ticket.imgSrc"
                                                    height="170px"
                                            ></v-img>
                                        </v-flex>
                                        <v-flex xs8>
                                            <v-card-text>
                                                <h2 class="text--primry">{{ticket.title}}</h2>
                                                <p>{{ticket.description}}</p>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                        class="info"
                                                        :to="'/ticket/' + ticket.id"
                                                >Подробнее</v-btn>
                                            </v-card-actions>
                                        </v-flex>

                    </v-layout>
                </v-card>
            </v-flex>
            <v-flex  xs4>
                <h1 class="text--secondary mb-3">Все пользователи OnLine</h1>
                <v-card
                        class="elevation-10 mb-2"
                        v-for="user in allUsers"
                        :key="user.id"
                        v-if="user"
                >
                    <v-layout row>
                        <v-flex xs4>
                            <v-img
                                    :src="user.imgSrc"
                                    height="160px"
                            ></v-img>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2 class="text--primry">{{user.nickName}}</h2>
                                <p>{{user.email}}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                >Предложить заявку</v-btn>
                            </v-card-actions>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="info"
                                :to="'/userPage/' + user.id"
                                >Профиль</v-btn>
                            </v-card-actions>
                        </v-flex>

                    </v-layout>
                </v-card>
            </v-flex>
            <!--<v-flex  xs4>-->
                <!--<h1 class="text&#45;&#45;secondary mb-3">Все клиенты OnLine</h1>-->
                <!--<v-card-->
                        <!--class="elevation-10 mb-2"-->
                        <!--v-for="client in onlineClients"-->
                        <!--:key="client.id"-->
                <!--&gt;-->
                    <!--<v-layout row>-->
                        <!--<v-flex xs4>-->
                            <!--<v-img-->
                                    <!--:src="client.imgSrc"-->
                                    <!--height="180px"-->
                            <!--&gt;</v-img>-->
                        <!--</v-flex>-->
                        <!--<v-flex xs8 >-->
                            <!--<v-card-text>-->
                                <!--<h2 class="text&#45;&#45;primry">{{client.nickName}}</h2>-->
                                <!--<p>{{client.email}}</p>-->
                            <!--</v-card-text>-->
                            <!--<v-card-actions>-->
                                <!--<v-spacer></v-spacer>-->
                                <!--<v-btn-->
                                <!--&gt;Посмотреть заявки</v-btn>-->
                            <!--</v-card-actions>-->
                            <!--<v-card-actions>-->
                                <!--<v-spacer></v-spacer>-->
                                <!--<v-btn class="info"-->
                                <!--&gt;Профиль</v-btn>-->
                            <!--</v-card-actions>-->
                        <!--</v-flex>-->

                    <!--</v-layout>-->
                <!--</v-card>-->
            <!--</v-flex>-->
        </v-layout>
    </v-container>
</template>
<script>
import root from '../main'
    export default {
        created(){
            //this.$store.dispatch('getMasters');
            //this.$store.dispatch('getClients');
            this.$store.dispatch('getUsers');
            this.$store.dispatch('getTickets');
            //this.$store.dispatch('getNotices');
        },
        computed:{

            allTickets() {
                //this.$store.dispatch('getTickets',30000);
                return this.$store.getters.allTickets
            },
            allMasters(){
               // this.$store.dispatch('getMasters',40000);
                //return this.$store.getters.allMasters
            },

//            onlineMasters(){
//                //this.$store.dispatch('getMasters',30000);
//                return this.$store.getters.onlineMasters
//            },
//            onlineClients(){
//                //this.$store.dispatch('getMasters',30000);
//                return this.$store.getters.onlineClients
//            }
            allUsers(){
                //this.$store.dispatch('getMasters',30000);
                return this.$store.getters.allUsers
            }
//            Tickets() {
//                return this.$store.getters.Tickets
//            }
        }
    }
</script>

<style scoped>
    .car-link {
        position: absolute;
        bottom: 50px;
        left: 50%;
        background: rgba(0, 0, 0, .5);
        transform: translate(-50%, 0);
        padding: 5px 15px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
</style>
