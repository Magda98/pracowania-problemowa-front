<template>
  <v-container>
    <v-fab-transition>
      <v-btn
        @click="dialog = true"
        color="secondary"
        dark
        absolute
        right
        top
        fab
        style="margin: 50px 20px;"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Nowa osoba</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="kid.FirstName"
                  label="Imię"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="kid.LastName"
                  label="Nazwisko"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-autocomplete
                  v-model="kid.InstitutionPublicId"
                  :items="institutionsNames"
                  dense
                  filled
                  label="Placówka"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Anuluj
          </v-btn>
          <v-btn color="blue darken-1" text @click="save">
            Dodaj
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEdit" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edycja danych dziecka</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="currentItem.firstName"
                  label="Imię"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="currentItem.lastName"
                  label="Nazwisko"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeEdit">
            Anuluj
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveEdit">
            Zapisz
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      v-if="kidsList.length"
      :headers="headers"
      :items="kidsList"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Lista dzieci</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Na pewno chcesz usunąć osobę?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Anuluj</v-btn
                >
                <v-btn color="error" text @click="deleteItemConfirm"
                  >Usuń</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <div
      v-else
      style="margin:auto; padding-top: 50px;width:100%;text-align:center;"
    >
      brak dodanych dzieci
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialogDelete: false,
      dialogEdit: false,
      dialog: false,
      currentItem: {},
      kid: {
        FirstName: "",
        LastName: "",
        ParentPublicId: "",
        InstitutionPublicId: ""
      },
      headers: [
        {
          text: "Imię i nazwisko",
          align: "start",
          value: "name"
        },
        {
          text: "Rodzic",
          align: "start",
          value: "parentUsername"
        },
        {
          text: "Instytucja",
          align: "start",
          value: "institutionName"
        },
        { text: "Edycja/Usuwanie", value: "actions", sortable: false }
      ]
    };
  },
  computed: {
    ...mapGetters("institutions", ["institutionsList"]),
    ...mapGetters("kids", ["kidsList"]),
    ...mapGetters("user", ["userInfo"]),

    institutionsNames() {
      return this.institutionsList.map(obj => ({
        text: obj.name,
        value: obj.publicId
      }));
    }
  },

  methods: {
    ...mapActions("institutions", ["getInstitutions"]),
    ...mapActions("kids", [
      "getMyKids",
      "addMyKid",
      "editMyKid",
      "deleteMyKid"
    ]),
    ...mapActions("user", ["getMyPermission"]),
    deleteItem(item) {
      this.currentItem = item;
      this.dialogDelete = "true";
    },
    editItem(item) {
      this.currentItem = Object.assign({}, item);
      this.dialogEdit = true;
    },
    closeEdit() {
      this.dialogEdit = false;
    },
    saveEdit() {
      this.editMyKid(this.currentItem);
      this.dialogEdit = false;
    },
    deleteItemConfirm() {
      this.deleteMyKid(this.currentItem.publicId);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    save() {
      this.kid.ParentPublicId = this.userInfo.publicId;
      this.addMyKid(this.kid);
      console.log(this.kid);
      this.close();
    }
  },
  mounted() {
    this.getMyKids();
    this.getInstitutions();
  }
};
</script>
