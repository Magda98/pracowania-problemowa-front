<template>
  <v-container
    class="container"
    fluid
    fill-height
    :style="{
      backgroundImage: 'url(' + require('../assets/bg-1_white.png') + ')'
    }"
  >
    <div style="width: 98%; position: absolute; top: 80px;" v-if="!loading">
      <!-- <v-fab-transition>
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
    </v-fab-transition> -->
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
      <v-dialog v-model="dialogOrders" max-width="50%">
        <v-card>
          <div v-if="comment">
            <v-card-title>
              <span class="headline">Uwagi do zamówienia</span>
            </v-card-title>
            <v-card-text>
              {{ comment }}
            </v-card-text>
          </div>
          <div v-if="ordersList.length">
            <v-card-title>
              <span class="headline">Łączna kwota do zapłaty tygodniowo</span>
            </v-card-title>
            <v-card-text style="font-size: 20px;">
              {{ pricing }} zł
            </v-card-text>
          </div>
          <v-card-title>
            <span class="headline">Zamówienia dziecka</span>
          </v-card-title>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
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
                    <v-col cols="2"> {{ dish.price }} zł </v-col>
                    <v-col cols="4">
                      <v-btn
                        small
                        outlined
                        color="primary"
                        @click="deleteOrder(dish.publicId, day)"
                        >Zrezygnuj z zamówienia</v-btn
                      ></v-col
                    >
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
      <v-dialog v-model="dialogDeleteOrder" max-width="600px">
        <v-card>
          <v-card-title class="headline"
            >Na pewno chcesz usunąć dane zamówienie?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogDeleteOrder = false"
              >Anuluj</v-btn
            >
            <v-btn color="error" text @click="deleteOrderConfirmed">Usuń</v-btn>
            <v-spacer></v-spacer>
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
        :footer-props="{
          'items-per-page-text': 'Wierszy na stronę',
          'items-per-page-all-text': 'Wszystkie',
          'items-per-page-options': [10, 25, 50, -1]
        }"
        multi-sort
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
    </div>
    <v-progress-circular
      style="margin: auto;"
      v-else
      indeterminate
      color="green"
    ></v-progress-circular>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// @vuese
// Widok stroy listy podopiecznych - administrator
export default {
  data() {
    return {
      loading: true,
      delOrder: "",
      currentDay: "",
      currentKid: "",
      comment: "",
      dialogDeleteOrder: false,
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
        {
          text: "Edycja/Usuwanie",
          value: "actions",
          sortable: false,
          align: "center"
        },
        { text: "Zamówienia", value: "orders", sortable: false }
      ]
    };
  },
  computed: {
    ...mapGetters("institutions", ["institutionsList"]),
    ...mapGetters("admin", ["userList"]),
    ...mapGetters("kids", ["kidsList"]),
    ...mapGetters("offers", ["offersList"]),
    userNames() {
      return this.userList.map(obj => ({
        text: obj.userName,
        value: obj.publicId
      }));
    },
    institutionsNames() {
      return this.institutionsList.map(obj => ({
        text: obj.name,
        value: obj.publicId
      }));
    },
    pricing() {
      let x = this.offersList.filter(offer => {
        const valid = this.ordersList.includes(offer.publicId);
        return valid;
      });
      let price = 0;
      x.forEach(element => {
        price += element.price;
      });
      return price;
    },
    kidDishList() {
      return this.offersList
        .filter(offer => {
          const valid = this.ordersList.includes(offer.publicId);
          return valid;
        })
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
    ...mapActions("orders", ["getOrder", "deleteOrders"]),
    ...mapActions("institutions", ["getInstitutions"]),
    ...mapActions("kids", ["getKids", "addKid", "editKid", "deleteKid"]),
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
      this.editKid(this.currentItem);
      this.dialogEdit = false;
    },
    // @vuese
    // funkcja usuwa daną osobę wywołując daną funkcję z magazynu Vuex
    deleteItemConfirm() {
      this.deleteKid(this.currentItem.publicId);
      this.closeDelete();
    },
    // @vuese
    // funkcja zamyka okno dialogowe
    close() {
      this.dialog = false;
    },
    // @vuese
    // funkcja zamyka okno dialogowe usuwania
    closeDelete() {
      this.dialogDelete = false;
    },
    // @vuese
    // funkcja dodaje nową osobę wowołując odpowednią funkcje z magazynu Vuex
    save() {
      this.addKid(this.kid);
      this.close();
    },
    closeOrders() {
      this.dialogOrders = false;
    },
    deleteOrderConfirmed() {
      let orders = this.ordersList.filter(e => e !== this.delOrder);
      this.deleteOrders({
        id: this.currentKid,
        offers: orders,
        comments: this.comment,
        day: this.currentDay
      }).then(response => {
        this.getOrder(this.currentKid).then(response => {
          this.ordersList = response.offers;
          this.comment = response.comment;
          this.dialogOrders = true;
        });
      });

      this.dialogDeleteOrder = false;
    },
    deleteOrder(order, day) {
      this.currentDay = day;
      this.delOrder = order;
      this.dialogDeleteOrder = true;
    },
    see(item) {
      this.currentKid = item.publicId;
      this.getOrder(item.publicId).then(response => {
        this.ordersList = response.offers;
        this.comment = response.comment;
        this.dialogOrders = true;
      });
    }
  },
  async mounted() {
    this.getUsers({
      UserName: this.nick,
      Email: this.email,
      FirstName: this.surname,
      LastName: this.name
    });
    await this.getKids();
    this.getInstitutions();
    this.getOffers();
    this.loading = false;
  }
};
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 40px;
  color: #272727;
}
.container {
  position: relative;
  width: 100%;
  max-width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
