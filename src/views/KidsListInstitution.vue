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
                  v-model="kid.ParentPublicId"
                  :items="userNames"
                  dense
                  filled
                  label="Rodzic"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <!-- <v-autocomplete
                  v-model="kid.InstitutionPublicId"
                  :items="institutionsNames"
                  dense
                  filled
                  label="Placówka"
                ></v-autocomplete> -->
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
    <v-dialog v-model="dialogOrders" max-width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">Zamówienia dziecka</span>
        </v-card-title>
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab v-for="day in days" :key="day">
            {{ day }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="day in days" :key="day">
            <v-card>
              <v-card-text v-if="kidDishList[day].length">
                <v-row v-for="dish in kidDishList[day]" :key="dish.publicId">
                  <v-col cols="6">
                    {{ dish.name }}
                  </v-col>
                  <v-col cols="6"> {{ dish.price }} zł </v-col>
                </v-row>
              </v-card-text>
              <v-card-text v-else>
                brak zamówień na dany dzień
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="closeOrders">
            Zamknij
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
      <template v-slot:item.orders="{ item }">
        <v-btn small class="mr-2" color="secondary" @click="see(item)">
          Zamówienia
        </v-btn>
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
// Widok stroy listy podopiecznych - administrator
export default {
  data() {
    return {
      dialogDelete: false,
      dialogEdit: false,
      dialog: false,
      tab: null,
      dialogOrders: false,
      ordersList: [],
      currentItem: {},
      kid: {
        FirstName: "",
        LastName: "",
        ParentPublicId: "",
        InstitutionPublicId: ""
      },
      days: [
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota",
        "Niedziela"
      ],
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
        { text: "Edycja/Usuwanie", value: "actions", sortable: false },
        { text: "Zamówienia", value: "orders", sortable: false }
      ]
    };
  },
  computed: {
    ...mapGetters("institutions", ["institutionsList"]),
    ...mapGetters("admin", ["userList"]),
    ...mapGetters("kids", ["kidsInstitution"]),
    ...mapGetters("offers", ["offersList"]),
    ...mapGetters("user", ["userInfo"]),
    userNames() {
      return this.userList.map(obj => ({
        text: obj.userName,
        value: obj.publicId
      }));
    },
    kidDishList() {
      return this.offersList
        .filter(offer => this.ordersList.includes(offer.publicId))
        .reduce(
          (offers, currOffer) => ({
            ...offers,
            [this.days[currOffer.dayOfWeek]]: [
              ...offers[this.days[currOffer.dayOfWeek]],
              currOffer
            ]
          }),
          {
            Poniedziałek: [],
            Wtorek: [],
            Środa: [],
            Czwartek: [],
            Piątek: [],
            Sobota: [],
            Niedziela: []
          }
        );
    }
  },

  methods: {
    ...mapActions("offers", ["getOffers"]),
    ...mapActions("orders", ["getOrder"]),
    ...mapActions("institutions", ["getInstitutions"]),
    ...mapActions("kids", [
      "getInstitutionKids",
      "addKid",
      "editKid",
      "deleteKid"
    ]),
    ...mapActions("admin", ["getUsers"]),
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
      this.currentItem.InstitutionPublicId = this.userInfo.institutions[0].publicId;
      this.editKid(this.currentItem);
      this.dialogEdit = false;
    },
    // @vuese
    // funkcja usuwa daną osobę wywołując daną funkcję z magazynu Vuex
    deleteItemConfirm() {
      this.deleteKid({
        id: this.currentItem.publicId,
        institutionId: this.userInfo.institutions[0].publicId
      });
      this.closeDelete();
    },
    // @vuese
    // funkcja zamyka okno dialogowe
    close() {
      this.dialog = false;
    },
    closeOrders() {
      this.dialogOrders = false;
    },
    // @vuese
    // funkcja zamyka okno dialogowe usuwania
    closeDelete() {
      this.dialogDelete = false;
    },
    // @vuese
    // funkcja dodaje nową osobę wowołując odpowednią funkcje z magazynu Vuex
    save() {
      this.kid.InstitutionPublicId = this.userInfo.institutions[0].publicId;
      this.addKid(this.kid);
      this.close();
    },
    see(item) {
      this.getOrder(item.publicId).then(response => {
        this.ordersList = response.offers;
        this.dialogOrders = true;
      });
    }
  },
  mounted() {
    this.getUsers({
      UserName: this.nick,
      Email: this.email,
      FirstName: this.surname,
      LastName: this.name
    });
    this.getInstitutionKids(this.userInfo.institutions[0].publicId);
    this.getOffers();
  }
};
</script>
