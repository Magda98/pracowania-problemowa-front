<template>
  <v-container>
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
      v-if="kidsInstitution.length"
      :headers="headers"
      :items="kidsInstitution"
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
// @vuese
// Widok strony listy podopiecznych - opiekun placówki
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
    ...mapGetters("kids", ["kidsInstitution"]),
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
    ...mapActions("kids", ["getInstitutionKids", "editMyKid", "deleteMyKid"]),
    ...mapActions("user", ["getMyPermission"]),
    // @vuese
    // funkcja, która przypisuje dany obiekt do zmiennej currentItem w celu usuniecia daniej osoby
    // @arg Argument to osoba której dotyczy wybrany wiersz
    deleteItem(item) {
      this.currentItem = item;
      this.dialogDelete = "true";
    },
    // @vuese
    // funkcja, która przypisuje dany obiekt do zmiennej currentItem w celu edycji daniej osoby
    // @arg Argument to osoba której dotyczy wybrany wiersz
    editItem(item) {
      this.currentItem = Object.assign({}, item);
      this.dialogEdit = true;
    },
    // @vuese
    // funkcja zamyka okno dialogowe edycji
    closeEdit() {
      this.dialogEdit = false;
    },
    // @vuese
    // funkcja zapisuje zmiany w edycji osoby wywołując odpowiednią funkcję z magazynu Vuex
    saveEdit() {
      this.editMyKid(this.currentItem);
      this.dialogEdit = false;
    },
    // @vuese
    // funkcja usuwa daną osobę wywołując daną funkcję z magazynu Vuex
    deleteItemConfirm() {
      this.deleteMyKid(this.currentItem.publicId);
      this.closeDelete();
    },
    // @vuese
    // funkcja zamyka okno dialogowe
    close() {
      this.dialog = false;
    }
  },
  mounted() {
    this.getInstitutionKids(this.userInfo.institutions[0].publicId);
  }
};
</script>
