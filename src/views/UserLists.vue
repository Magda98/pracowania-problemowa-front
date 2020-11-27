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
            v-on:input="search"
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
// @vuese
// Widok strony z uprawnieniami użytkowników
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
      CateringEmployee: false
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
      { text: "Edycja", value: "actions", sortable: false }
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
    // @vuese
    //  funkcja umożliwiająca wyszukiwanie danego użytkownika
    search() {
      this.getUsers({
        UserName: this.nick,
        Email: this.email,
        FirstName: this.surname,
        LastName: this.name
      });
    },
    // @vuese
    // Zamyka okno dialogowe
    close() {
      this.dialog = false;
    },
    // @vuese
    // funkcja zapisuje zmienione uprawnienia danego użytkownika wywołując odpowiednią funkcję z magazynu Vuex
    save() {
      this.setUserPermissions({
        id: this.editedItem.id,
        AdminAccess: this.checkbox.AdminAccess,
        CateringEmployee: this.checkbox.CateringEmployee,
        key: this.permissions[0].key
      }).then(() => {
        this.dialog = false;
      });
    },
    // @vuese
    // Funkcja otwiera odpowiendie okno dialogowe edycji z uprawnieniami danego użytkownika
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.getUserPermissions(item.id).then(response => {
        this.dialog = true;
        if (!response.length) {
          this.checkbox.AdminAccess = false;
          this.checkbox.CateringEmployee = false;
        } else {
          this.checkbox.AdminAccess =
            response[0].value.AdminAccess === "Allow" ? true : false;
          this.checkbox.CateringEmployee =
            response[0].value.CateringEmployee === "Allow" ? true : false;
        }
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
