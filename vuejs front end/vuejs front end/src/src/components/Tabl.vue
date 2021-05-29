<template>
  <v-app>
    <v-system-bar app height="60px" color="white">
      <v-avatar size="40">
        <img src="images/HP.png" />
      </v-avatar>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        outlined
        dense
        hide-details
      ></v-text-field>
      <v-badge>
        <span slot="babage">3</span>
        <v-btn icon color="white"> <v-icon> fa fa-bell</v-icon></v-btn>
      </v-badge>
      <div class="white--text">
        <!-- <v-responsive> -->
        <v-avatar size="40">
          <v-img src="images/car.jpeg"></v-img>
        </v-avatar>
        <!-- </v-responsive> -->
        <span>tadese matebie</span>
      </div>
    </v-system-bar>

    <v-app-bar flat app class="blue-grey darken-2">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title> CBFCS </v-toolbar-title>
      <!-- <v-spacer></v-spacer>
                             <v-badge>
                         <span slot="babage">3</span>
                  <v-btn icon color="white"> <v-icon> fa fa-bell</v-icon></v-btn>
                     </v-badge>   
                     <div class="white--text">          
                 
                   <v-avatar size="40">
                <v-img src="images/car.jpeg"></v-img>
                 </v-avatar >
              
                 <span>tadese matebie</span>
                     </div> -->
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app class="blue-grey darken-2">
    </v-navigation-drawer>
    <v-content>
      <v-data-table
        :headers="headers"
        :items="organization"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>My CRUD</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on"
                  >New Item</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.organizationid"
                          label="organization id"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.calories"
                          organizationname="organization name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.organizationtype"
                          label="organization type"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.mainoffice"
                          label="main office"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.detailaboutorganization"
                          label="detail about organization"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)"> edit </v-icon>
          <v-icon small @click="deleteItem(item)"> delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-content>
  </v-app>
</template>


<script>
export default {
  data: () => ({
    dialog: false,
    drawer: false,
    headers: [
      {
        text: "organizationid ",
        align: "start",
        sortable: false,
        value: "organizationid",
      },
      { text: "organization name", value: "organizationname" },
      { text: "organization type", value: "organizationtype" },
      { text: "mainoffice", value: "mainoffice" },
      { text: "detail about organization ", value: "detailaboutorganization" },
      { text: "Actions", value: "action", sortable: false },
    ],
    organization: [],
    editedIndex: -1,
    editedItem: {
      organizationid: "",
      organizationname: "",
      organizationtype: "",
      mainoffice: "",
      detailaboutorganization: "",
    },
    defaultItem: {
      organizationid: "",
      organizationname: "",
      faorganizationtype: "",
      mainoffice: "",
      detailaboutorganization: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.organization = [
        {
          organizationid: "fuck123",
          organizationname: "fuck",
          organizationtype: "mainstreet",
          mainoffice: "bole",
          detailaboutorganization: "this fucking nigga",
        },
        {
          organizationid: "fuck123",
          organizationname: "fuck",
          organizationtype: "mainstreet",
          mainoffice: "bole",
          detailaboutorganization: "this fucking nigga",
        },
        {
          organizationid: "fuck123",
          organizationname: "fuck",
          organizationtype: "mainstreet",
          mainoffice: "bole",
          detailaboutorganization: "this fucking nigga",
        },
        {
          organizationid: "fuck123",
          organizationname: "fuck",
          organizationtype: "mainstreet",
          mainoffice: "bole",
          detailaboutorganization: "this fucking nigga",
        },
        {
          organizationid: "fuck123",
          organizationname: "fuck",
          organizationtype: "mainstreet",
          mainoffice: "bole",
          detailaboutorganization: "this fucking nigga",
        },
        {
          organizationid: "fuck123",
          organizationname: "fuck",
          organizationtype: "mainstreet",
          mainoffice: "bole",
          detailaboutorganization: "this fucking nigga",
        },
        {
          organizationid: "fuck123",
          organizationname: "fuck",
          organizationtype: "mainstreet",
          mainoffice: "bole",
          detailaboutorganization: "this fucking nigga",
        },
        {
          organizationid: "fuck123",
          organizationname: "fuck",
          organizationtype: "mainstreet",
          mainoffice: "bole",
          detailaboutorganization: "this fucking nigga",
        },
        {
          organizationid: "fuck123",
          organizationname: "fuck",
          organizationtype: "mainstreet",
          mainoffice: "bole",
          detailaboutorganization: "this fucking nigga",
        },
        {
          organizationid: "fuck123",
          organizationname: "fuck",
          organizationtype: "mainstreet",
          mainoffice: "bole",
          detailaboutorganization: "this fucking nigga",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.organization.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>