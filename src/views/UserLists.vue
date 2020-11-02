<template>
  <v-card v-if="userList">
    <v-card-title>
      <v-spacer></v-spacer>
      <v-row>
        <v-col>
          <v-text-field
            class="field"
            v-model="name"
            clearable
            label=" Imie i Nazwisko"
            single-line
            hide-details
            v-debounce:500ms="search"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            class="field"
            v-model="email"
            clearable
            label="E-mail"
            single-line
            hide-details
            v-debounce:500ms="search"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            class="field"
            v-model="nick"
            clearable
            label="Nazwa"
            single-line
            hide-details
            v-debounce:500ms="search"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table :headers="headers" :items="userList" class="elevation-1">
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ editedItem.userName }}</span>
            </v-card-title>
            <v-card-text>
              <v-container v-if="permissions">
                <v-row v-for="item in permissions" :key="item.key">
                  <div style="width: 100%; font-weight: bold;">
                    {{ item.name }}:
                  </div>
                  <v-col
                    v-for="item_permision in item.sections[0]"
                    :key="item_permision.key"
                  >
                    <v-checkbox
                      v-if="currentUserPermissions"
                      :label="item_permision.value"
                      v-model="checkbox[item_permision.key]"
                      color="success"
                      hide-details
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="close">
                Anuluj
              </v-btn>
              <v-btn color="secondary" text @click="save">
                zapisz
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn small color="secondary" class="mr-2" @click="editItem(item)">
          <v-icon left dark>
            mdi-pencil
          </v-icon>
          uprawnienia
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    editedItem: {},
    surname: "",
    nick: "",
    name: "",
    email: "",
    dialog: false,
    checkbox: {
      AdminAccess: false,
      UserAccess: false
    },
    headers: [
      { text: "Id", value: "id" },
      {
        text: "Imię",
        value: "firstName"
      },
      { text: "Nazwisko", value: "lastName" },
      { text: "E-mail", value: "email" },
      { text: "Nazwa", value: "userName" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),
  computed: {
    ...mapGetters("admin", [
      "userList",
      "currentUserPermissions",
      "permissions"
    ])
  },
  methods: {
    ...mapActions("admin", [
      "getPermissions",
      "getUsers",
      "getUserPermissions",
      "setUserPermissions"
    ]),
    search() {
      this.getUsers({
        UserName: this.nick,
        Email: this.email,
        FirstName: this.surname,
        LastName: this.name
      });
    },
    close() {
      this.dialog = false;
    },
    save() {
      this.setUserPermissions({
        id: this.editedItem.id,
        AdminAccess: this.checkbox.AdminAccess,
        UserAccess: this.checkbox.UserAccess,
        key: this.permissions[0].key
      }).then(() => {
        this.dialog = false;
      });
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.getUserPermissions(item.id).then(() => {
        this.dialog = true;
        this.checkbox.AdminAccess =
          this.currentUserPermissions[0].value.AdminAccess === "Allow"
            ? true
            : false;
        this.checkbox.UserAccess =
          this.currentUserPermissions[0].value.UserAccess === "Allow"
            ? true
            : false;
        console.log(this.currentUserPermissions);
      });
    }
  },
  beforeMount() {
    this.getPermissions();
    this.getUsers({
      UserName: this.nick,
      Email: this.email,
      FirstName: this.surname,
      LastName: this.name
    });
  }
};
</script>
<style lang="scss" scoped>
.filed {
  margin-right: 10px !important;
}
</style>
