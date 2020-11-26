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
          <span class="headline">Nowa placówka</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="institution.Name"
                  label="Nazwa"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="institution.Street"
                  label="Ulica"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="institution.ZipCode"
                  label="Kod pocztowy"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="institution.City"
                  label="Miasto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-autocomplete
                  v-model="institution.OwnerPublicId"
                  :items="userNames"
                  dense
                  filled
                  label="Właściciel"
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
          <span class="headline">Edycja placówki</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="currentItem.name"
                  label="Nazwa"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="currentItem.street"
                  label="Ulica"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="currentItem.zipCode"
                  label="Kod pocztowy"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="currentItem.city"
                  label="Miasto"
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
      v-if="institutionsList.length"
      :headers="headers"
      :items="institutionsList"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Placówki</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Na pewno chcesz usunąć placówkę?</v-card-title
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
      brak placówek
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// @vuese
// Widok stroy Instytucji
export default {
  data() {
    return {
      dialogDelete: false,
      dialogEdit: false,
      dialog: false,
      currentItem: {},
      institution: {
        Name: "",
        Street: "",
        ZipCode: "",
        City: "",
        OwnerPublicId: ""
      },
      headers: [
        {
          text: "Nazwa",
          align: "start",
          value: "name"
        },
        {
          text: "Ulica",
          align: "start",
          value: "street"
        },
        {
          text: "Kod pocztowy",
          align: "start",
          value: "zipCode"
        },
        {
          text: "Miasto",
          align: "start",
          value: "city"
        },
        {
          text: "Osoba zarządzająca",
          align: "start",
          value: "ownerUsername"
        },
        { text: "Edycja/Usuwanie", value: "actions", sortable: false }
      ]
    };
  },
  computed: {
    ...mapGetters("institutions", ["institutionsList"]),
    ...mapGetters("admin", ["userList"]),
    userNames() {
      return this.userList.map(obj => ({
        text: obj.userName,
        value: obj.publicId
      }));
    }
  },

  methods: {
    ...mapActions("institutions", [
      "getInstitutions",
      "addInstitutions",
      "deleteInstitution",
      "editInstitution"
    ]),
    ...mapActions("admin", ["getUsers"]),
    ...mapActions("user", ["getMyPermission"]),
    // @vuese
    // funkcja, która przypisuje dany obiekt do zmiennej currentItem w celu usuniecia daniej instytucji
    // @arg Argument to instytucja której dotyczy wybrany wiersz
    deleteItem(item) {
      this.currentItem = item;
      this.dialogDelete = "true";
    },
    // @vuese
    // funkcja, która przypisuje dany obiekt do zmiennej currentIem w celu edycji
    // @arg Argument to instytucja której dotyczy wybrany wiersz
    editItem(item) {
      this.currentItem = Object.assign({}, item);
      this.dialogEdit = true;
    },
    // @vuese
    // funkcja, która zamyka okno dialogowe
    closeEdit() {
      this.dialogEdit = false;
    },
    // @vuese
    // funkcja, która zapisuje wyedytowane dane instytucji, wywołuje funkcję z magazynu Vuex
    saveEdit() {
      this.editInstitution(this.currentItem);
      this.dialogEdit = false;
    },
    // @vuese
    // funkcja, która wywołuje funkcję z magazyku Vuex w celu usunięcia danej instytucji
    deleteItemConfirm() {
      this.deleteInstitution(this.currentItem.publicId);
      this.closeDelete();
    },
    // @vuese
    // funkcja, która zamyka okno dialogowe
    close() {
      this.dialog = false;
    },
    // @vuese
    // funkcja, która zamyka okno dialogowe
    closeDelete() {
      this.dialogDelete = false;
    },

    // @vuese
    // funkcja, która dodaje instytucje
    save() {
      this.addInstitutions(this.institution);
      this.close();
    }
  },
  beforeMount() {
    this.getInstitutions();
    this.getUsers({
      UserName: "",
      Email: "",
      FirstName: "",
      LastName: ""
    });
  }
};
</script>
