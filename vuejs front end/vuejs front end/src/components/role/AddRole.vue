<template>
  <v-app>
    <v-content>
      <h1>set fare</h1>

      <form ref="form" lazy-validation>
        <v-card elevation="0" class="ma-4">
          <v-card-title> </v-card-title>
          <v-card-text>
            <v-text-field
              label="role Id"
              v-model="fareInformation.role_Id"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="role Name "
              v-model="fareInformation.role_Name"
              outlined
              dense
            ></v-text-field>
            <v-select
              v-model="fareInformation.organization_Type"
              :items="organization"
              label="organization type"
              outlined
              dense
            ></v-select>
            <v-select
              v-model="fareInformation.role_Type"
              :items="role"
              label="role type"
              outlined
              dense
            ></v-select>
            <v-select
              v-model="fareInformation.status"
              :items="type"
              label="status"
              outlined
              dense
            ></v-select>

            <v-container>
              <v-select
                v-model="selectionType"
                :items="['leaf', 'independent']"
                label="Selection type"
              ></v-select>
              <v-row>
                <v-col>
                  <v-treeview
                    v-model="selection"
                    :items="items"
                    :selection-type="selectionType"
                    selectable
                    return-object
                    open-all
                  ></v-treeview>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col class="pa-6" cols="6">
                  <template v-if="!selection.length">
                    No role is selected.
                  </template>
                  <template v-else>
                    <div v-for="node in _selection" :key="node.id">
                      {{ node.name }}
                    </div>
                  </template>
                </v-col>
              </v-row>
            </v-container>

            <!-- <v-select    
      v-model= "mi.access"
      :items="type"
      label="access"
      outlined dense
       
    ></v-select> -->
          </v-card-text>
          <v-card-actions>
            <v-btn @click="role"> register role</v-btn></v-card-actions
          >
        </v-card>
      </form>
    </v-content>
  </v-app>
</template>
<script>
import fs from "./../../service/FareService";
import rc from "./../../service/RoleService";
export default {
  data: () => ({
    fareInformation: {
      role__Id: "",
      role_Name: "",
      organization_Type: "",
      role_Type: "",
      rl: null,
    },
    organization: ["Platform_Provider", "Government", "Service_Provider"],
    role: ["Employee", "Adminstrator"],
    type: ["Activated", "Deactivated"],
    selectionType: "leaf",
    selection: [],
    items: [],
    allParentNodes: false,
  }),
  computed: {
    _items() {
      const replaceChildren = (obj, parent) => {
        const clone = Object.assign({}, obj);
        delete clone.children;
        if (parent) clone.parent = parent;
        return clone;
      };

      const addItems = (arr, parent) => {
        const items = arr.reduce((acc, x) => {
          acc.push(replaceChildren(x, parent));

          if (x.children) {
            acc.push(addItems(x.children, x.id));
          }
          return acc;
        }, []);

        return items.flat();
      };

      return addItems(this.items).reduce((acc, x) => {
        acc[x.id] = x;
        return acc;
      }, {});
    },
    _selection() {
      const proxy = {};
      const addParents = (x, all) => {
        const parentId = this._items[x.id].parent;
        if (parentId) {
          if (all) addParents(this._items[parentId]);
          proxy[parentId] = this._items[parentId];
        }
      };
      this.selection.forEach((x) => {
        addParents(x, this.allParentNodes);
        proxy[x.id] = x;
      });
      return Object.values(proxy);
    },
  },
  async mounted() {
    const token = this.$store.state.token;
    var org_Data = (await rc.role_Chooser(token)).data.message;
    console.log(org_Data);

    console.log("kkkkkkkkk");
    // console.log(this.rl)
    console.log(org_Data);
    console.log(".................");
    //console.log(r.employee)
    this.items = org_Data;
  },

  methods: {
    role() {
      console.log("'''''''''''''''xxxxxxxxxxxx");
      console.log(this.selection);
      const token = this.$store.state.token;

      // try {
      //   await rc.register(this.fareInformation, token);
      //   console.log(selection);
      // } catch (er) {
      //   console.log(er);
      // }
    },
  },
};
</script>
<style scoped>
</style>