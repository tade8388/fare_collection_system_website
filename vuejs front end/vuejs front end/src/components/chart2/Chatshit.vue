
<template>
  <div>
    <!-- <v-content> -->
    <!-- <template>
      <v-tabs v-model="open">
        <v-tab @click="inbox()">Inbox</v-tab>
        <v-tab @click="sent()">Sent</v-tab>
        <v-tab @click="recieve()">Recieved</v-tab>
        <v-tab @click="compose()">Compose</v-tab>
      </v-tabs>
      <v-dialog v-model="dialog">
        <>
      </v-dialog>
    </template>-->
    <v-tabs fixed-tabs v-model="tab" flat>
      <v-tab
        v-for="(item, index) in tabs"
        :class="{ active: ct === index }"
        @click="chooser(index)"
        :key="item"
        >{{ item }}</v-tab
      >
      <v-tabs-items v-model="tab">
        <div id="app" v-if="ct === 0 || ct === 1 || ct === 2">
          <v-app>
            <v-container class="fill-height pa-0">
              <v-row class="no-gutters elevation-4">
                <v-col
                  cols="12"
                  sm="3"
                  class="flex-grow-1 flex-shrink-0"
                  style="border-right: 1px solid #0000001f"
                >
                  <v-responsive class="overflow-y-auto fill-height">
                    <v-list subheader>
                      <v-list-item-group v-model="activeChat">
                        <template v-for="(item, index) in parents">
                          <v-list-item
                            :key="item.session_Id"
                            :value="item.session_Id"
                            @click="mark_notification(item)"
                          >
                            <v-list-item-content>
                              <v-list-item-title
                                v-if="item.sender._id == user"
                                v-text="
                                  item.reciever.name.first_Name +
                                  ' ' +
                                  item.reciever.name.last_Name
                                "
                              />
                              <v-list-item-title
                                v-else
                                v-text="
                                  item.sender.name.first_Name +
                                  ' ' +
                                  item.sender.name.last_Name
                                "
                              />
                              <v-list-item-subtitle
                                v-text="item.context.title"
                              />
                            </v-list-item-content>
                            <v-list-item-avatar
                              color="grey lighten-1 white--text"
                            >
                              <v-icon
                                :color="
                                  item.seen ? 'grey' : 'deep-purple accent-4'
                                "
                                >chat_bubble</v-icon
                              >
                            </v-list-item-avatar>
                            <!-- <v-list-item-icon>
                          <v-icon :color="item.seen ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon>
                            </v-list-item-icon>-->
                          </v-list-item>
                          <v-divider
                            :key="`chatDivider${index}`"
                            class="my-0"
                          />
                        </template>
                      </v-list-item-group>
                    </v-list>
                  </v-responsive>
                </v-col>
                <v-col cols="auto" class="flex-grow-1 flex-shrink-0">
                  <v-responsive
                    v-if="activeChat"
                    class="overflow-y-hidden fill-height"
                    height="500"
                  >
                    <v-card flat class="d-flex flex-column fill-height">
                      <v-card-title></v-card-title>
                      <v-card-text class="flex-grow-1 overflow-y-auto">
                        <template v-for="(msg, i) in message">
                          <div :key="msg.session_Id + i">
                            <v-menu offset-y>
                              <template v-slot:activator="{ on }">
                                <v-hover v-slot:default="{ hover }">
                                  <div>
                                    <v-row
                                      :class="{
                                        'd-flex flex-row-reverse':
                                          msg.sender._id == user,
                                      }"
                                    >
                                      <v-col cols="auto">
                                        <v-chip
                                          :color="
                                            msg.sender._id == user
                                              ? '#E91E63'
                                              : '#BA68C8'
                                          "
                                          dark
                                          style="
                                            height: auto;
                                            white-space: normal;
                                          "
                                          class="pa-4 mb-2"
                                          v-on="on"
                                        >
                                          {{ msg.context.body.message }}
                                          <!-- <sub
                                    class="ml-2"
                                    style="font-size: 0.5rem;"
                                          >{{ msg.context.body.file }}</sub>-->
                                          <!-- <v-icon v-if="hover" small>expand_more</v-icon> -->
                                        </v-chip>
                                      </v-col>
                                    </v-row>
                                    <!-- <v-row
                                      :class="{ 'd-flex flex-row-reverse': msg.sender._id == user }"
                                    >
                                      <v-col cols="auto">
                                        <v-chip
                                          v-on="on"
                                          v-if="msg.context.body.file"
                                        >{{msg.context.body.file}}</v-chip>
                                      </v-col>
                                    </v-row>-->
                                  </div>
                                </v-hover>
                              </template>
                              <!-- <v-list>
                            <v-list-item>
                              <v-list-item-title>delete</v-list-item-title>
                            </v-list-item>
                              </v-list>-->
                            </v-menu>
                          </div>
                        </template>
                      </v-card-text>
                      <v-card-text class="flex-shrink-1">
                        <form id="shitform">
                          <v-text-field
                            v-model="text_field"
                            label="type_a_message"
                            type="text"
                            no-details
                            outlined
                            append-outer-icon="send"
                            @keyup.enter="send_message(text_field)"
                            @click:append-outer="send_message(text_field)"
                            hide-details
                          />
                          <!-- <input type="file" ref="file" @change="funct()" /> -->
                        </form>
                      </v-card-text>
                    </v-card>
                  </v-responsive>
                </v-col>
              </v-row>
            </v-container>
          </v-app>
        </div>
        <div v-if="ct === 3">
          <v-row justify="space-around">
            <v-col cols="12" sm="6" l="6" md="6">
              <v-text-field
                label="search"
                :rules="inputRules"
                v-model="search"
                outlined
                dense
                append-icon="search"
              ></v-text-field>
              <v-text-field
                label="title"
                :rules="inputRules"
                v-model="title"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                label="message"
                :rules="inputRules"
                v-model="new_message"
                outlined
                dense
              ></v-text-field>
              <button @click="register_new_notification()">submit</button>
            </v-col>
          </v-row>
        </div>
      </v-tabs-items>
    </v-tabs>
  </div>
  <!-- </v-content> -->
</template>
<script>
import shit from "../../service/Hello";
export default {
  data() {
    return {
      open: 1,
      ct: 0,
      dialog: 0,
      activeChat: 1,
      currentTab: 1,
      tabs: ["Inbox", "sent", "recieved", "compose"],
      tab: null,
      session_Id: 0,
      text_field: "",
      message: "",
      // items: ["compose", "inbox", "sent", "recieved"],
      selected: [2],
      user: "",
      parents: [],
      x: "",
      search: "",
      new_message: "",
      title: "",
    };
  },
  async mounted() {
    await this.inbox();
  },
  methods: {
    async mark_notification(x) {
      this.session_Id = x.session_Id;
      // console.log(this.session_Id);
      var data = (await shit.notification_Search(this.session_Id)).data.message;
      if (!Array.isArray(data)) this.message = [data];
      else this.message = data;
      // console.log(this.message);
      var seen = (await shit.notification_mark(this.session_Id)).data.success;
      // console.log(seen);
      if (seen) {
        for (i = 0; i < parents.length; i++) {
          if (parents[i].session_Id == this.session_Id) parents[i].seen = seen;
        }
      }
    },
    // kk(yy) {
    //   console.log(yy);
    // },
    chooser(index) {
      if (index == 0) this.inbox();
      else if (index == 1) this.sent();
      else if (index == 2) this.recieved();
      else if (index == 3) this.ct = 3;
    },
    compose() {
      this.dialog = 1;
    },
    funct() {
      this.x = this.$refs.file.files;
    },
    async inbox() {
      var data = (await shit.notification_view()).data;
      this.user = data.id;
      this.parents = data.message.message;
      this.ct = 0;
    },
    async sent() {
      var data = (await shit.notification_custom("sender")).data;
      if (!Array.isArray(data.message.message))
        this.parents = [data.message.message];
      else this.parents = data.message.message;
      this.user = data.id;
      this.ct = 1;
    },
    async recieved() {
      var data = (await shit.notification_custom("reciever")).data;
      if (!Array.isArray(data.message.message))
        this.parents = [data.message.message];
      else this.parents = data.message.message;
      this.user = data.id;
      this.ct = 2;
    },
    async register_new_notification() {
      var notification = {
        reciever: this.search,
        title: this.title,
        message: this.new_message,
      };
      var data = await shit.register_notification(notification).data;
    },
    async send_message(message) {
      //  var z = new FormData(shitform);
      //   if (this.x != "") z.append("Notification_File", this.x[0]);
      //   z.append("session_Id", this.session_Id);
      //   z.append("message", message);
      var send_message = {
        session_Id: this.session_Id,
        message: this.message,
      };
      var data = (await shit.register_notification(send_message)).data;
      if (data.success) {
        var new_message = {
          sender: {
            _id: this.user,
          },
          context: {
            body: {
              message: message,
            },
          },
        };
        //if (this.x != "") new_message.context.body.file = this.x[0];
        this.message.push(new_message);
      }
      //else {
      //  console.log("oooooooooooooooo");
      // }
    },
  },
};
</script>

