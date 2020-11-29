<template>
  <v-container
    class="container"
    fill-height
    fluid
    :style="{
      backgroundImage: 'url(' + require('../assets/bg-1_white.png') + ')',
    }"
  >
    <v-container :style="{ top: '70px', position: 'absolute' }">
      <v-row justify="center">
        <h1>Oferta:</h1>
        <br />
      </v-row>
      <v-row justify="center">
        <v-tabs v-model="tab" centered background-color="light-green accent-1">
          <v-tabs-slider color="black" />
          <v-tab v-for="day in days" :key="day.id">
            {{ day.name }}
          </v-tab>
        </v-tabs>
        <br />
      </v-row>
      <v-row justify="center" align="center">
        <v-col md="10">
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="day in days" :key="day.id">
              <v-card elevation="3">
                <v-card-title>
                  Jadłospis
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Wyszukaj"
                    single-line
                    hide-details
                  >
                  </v-text-field>
                </v-card-title>
                <v-data-table
                  v-model="selected"
                  :headers="headers"
                  :items="_offersList(day.id)"
                  item-key="publicId"
                  :search="search"
                  show-select
                  multi-sort
                  hide-default-footer
                >
                  <template v-slot:item.type="{ item }">
                    <span>{{ mealTypes[item.type - 1].name }}</span>
                  </template>
                  <template v-slot:item.price="{ item }">
                    <span>{{ item.price.toFixed(2) }}</span>
                  </template>
                  <template v-slot:top>
                    <v-dialog
                      v-model="dialogEdit"
                      persistent
                      max-width="600px"
                      :retain-focus="false"
                    >
                      <v-card>
                        <form>
                          <v-card-title>
                            <span class="headline"
                              >Edytuj {{ editedOffer.name }}
                            </span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="6" sm="12" md="8">
                                  <v-text-field
                                    v-model="editedOffer.name"
                                    label="Nazwa posiłku"
                                    hint="np. Pierogi ruskie"
                                    required
                                    >{{ editedOffer.name }}</v-text-field
                                  >
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedOffer.price"
                                    label="Cena (PLN)"
                                    type="number"
                                    required
                                    >{{ editedOffer.price }}</v-text-field
                                  >
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-select
                                    v-model="editedOffer.type"
                                    :items="mealTypes"
                                    item-text="name"
                                    item-value="id"
                                    label="Rodzaj"
                                    required
                                    >{{ editedOffer.type }}</v-select
                                  >
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <v-select
                                    v-model="editedOffer.dayOfWeek"
                                    :items="days"
                                    item-text="name"
                                    item-value="id"
                                    label="Dzień tygodnia"
                                    required
                                    >{{ editedOffer.dayOfWeek }}</v-select
                                  >
                                </v-col>
                              </v-row>
                            </v-container>
                            <small>*Wszystkie pola są obowiązkowe</small>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" text @click="close">
                              Anuluj
                            </v-btn>
                            <v-btn color="secondary" text @click="edit">
                              Zapisz
                            </v-btn>
                          </v-card-actions>
                        </form>
                      </v-card>
                    </v-dialog>
                    <v-dialog
                      v-model="dialogDelete"
                      max-width="500px"
                      :retain-focus="false"
                    >
                      <v-card>
                        <v-card-title>
                          <span class="headline"
                            >Usunąć {{ editedOffer.name }}?</span
                          >
                        </v-card-title>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="secondary" text @click="close">
                            Anuluj
                          </v-btn>
                          <v-btn color="error" text @click="remove">
                            Usuń
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                  <template
                    v-if="
                      myPermissions[
                        'FitKidCateringApp.Helpers.StandardPermissions@CateringEmployee'
                      ] ||
                      myPermissions[
                        'FitKidCateringApp.Helpers.StandardPermissions@AdminAccess'
                      ]
                    "
                    v-slot:item.actions="{ item }"
                  >
                    <v-btn
                      small
                      color="secondary"
                      class="mr-2"
                      @click="openEdit(item)"
                    >
                      <v-icon dark> mdi-pencil </v-icon>
                    </v-btn>
                    <v-btn
                      small
                      color="error"
                      class="mr-2"
                      @click="openDelete(item)"
                    >
                      <v-icon dark> mdi-delete </v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card>
            </v-tab-item> </v-tabs-items
          ><br />
          <v-dialog
            v-model="dialogOffer"
            persistent
            max-width="400px"
            :retain-focus="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                block
                elevation="3"
                color="light-green accent-1"
                v-bind="attrs"
                v-on="on"
                @click="calcPrice"
                >Dodaj do zamówienia</v-btn
              >
            </template>
            <v-card>
              <form>
                <v-card-title>
                  <span class="headline">Zamówienie</span>
                </v-card-title>
                <v-card-text>
                  <v-autocomplete
                    v-if="
                      myPermissions[
                        'FitKidCateringApp.Helpers.StandardPermissions@AdminAccess' ||
                          'FitKidCateringApp.Helpers.StandardPermissions@CateringEmployee'
                      ]
                    "
                    v-model="childID"
                    :items="kidsNames"
                    dense
                    filled
                    label="Wybierz dzieckoA"
                  ></v-autocomplete>
                  <v-autocomplete
                    v-if="
                      !myPermissions[
                        'FitKidCateringApp.Helpers.StandardPermissions@AdminAccess'
                      ] && userInfo.institutions.length
                    "
                    v-model="childID"
                    :items="kidsInstitutionNames"
                    dense
                    filled
                    label="Wybierz dzieckoB"
                  ></v-autocomplete>
                  <v-autocomplete
                    v-if="
                      !myPermissions[
                        'FitKidCateringApp.Helpers.StandardPermissions@AdminAccess'
                      ] && !userInfo.institutions.length
                    "
                    v-model="childID"
                    :items="myKidsNames"
                    dense
                    filled
                    label="Wybierz dzieckoC"
                  ></v-autocomplete>
                  <v-textarea
                    v-model="comments"
                    label="Uwagi do zamówienia"
                  ></v-textarea>
                  <v-text-field
                    v-model="orderValue"
                    disabled
                    label="Wartość zamówienia"
                  >
                  </v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="close"> Anuluj </v-btn>
                  <v-btn color="secondary" text @click="order"> Zamów </v-btn>
                </v-card-actions>
              </form>
            </v-card>
          </v-dialog>
          <br />
          <validation-observer ref="observer">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="
                    myPermissions[
                      'FitKidCateringApp.Helpers.StandardPermissions@CateringEmployee'
                    ] ||
                    myPermissions[
                      'FitKidCateringApp.Helpers.StandardPermissions@AdminAccess'
                    ]
                  "
                  color="light-green accent-1"
                  block
                  elevation="3"
                  v-bind="attrs"
                  v-on="on"
                >
                  Dodaj Posiłek
                </v-btn>
              </template>
              <v-card>
                <form>
                  <v-card-title>
                    <span class="headline">Dodaj posiłek</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6" sm="12" md="8">
                          <validation-provider
                            v-slot="{ errors }"
                            name="newname"
                            rules="required|max:256|min:6"
                            slim
                          >
                            <v-text-field
                              v-model="newName"
                              :error-messages="errors"
                              label="Nazwa posiłku"
                              hint="np. Pierogi ruskie"
                              required
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <validation-provider
                            v-slot="{ errors }"
                            name="newprive"
                            rules="required"
                            slim
                          >
                            <v-text-field
                              v-model="newPrice"
                              :error-messages="errors"
                              label="Cena (PLN)"
                              type="number"
                              required
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <validation-provider
                            v-slot="{ errors }"
                            name="newtype"
                            rules="required"
                            slim
                          >
                            <v-select
                              v-model="newType"
                              :items="mealTypes"
                              :error-messages="errors"
                              item-text="name"
                              item-value="id"
                              label="Rodzaj"
                              required
                            ></v-select>
                          </validation-provider> </v-col
                        ><validation-provider
                          v-slot="{ errors }"
                          name="newday"
                          rules="required"
                          slim
                        >
                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="newDay"
                              :error-messages="errors"
                              :items="days"
                              item-text="name"
                              item-value="id"
                              label="Dzień tygodnia"
                              required
                            ></v-select>
                          </v-col>
                        </validation-provider>
                      </v-row>
                    </v-container>
                    <small>*Wszystkie pola są obowiązkowe</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="close"> Anuluj </v-btn>
                    <v-btn color="secondary" text @click="save"> Dodaj </v-btn>
                  </v-card-actions>
                </form>
              </v-card>
            </v-dialog>
          </validation-observer>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required, min, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");
// @vuese
// Widok strony z aktualnym menu
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    dialog: false,
    dialogEdit: false,
    dialogDelete: false,
    dialogOffer: false,
    tab: null,
    search: "",
    selected: [],
    newName: "",
    newPrice: "",
    newType: "",
    newDay: "",
    childID: "",
    comments: "",
    orderValue: 0,
    editedOffer: {},
    days: [
      { id: 0, name: "Poniedziałek" },
      { id: 1, name: "Wtorek" },
      { id: 2, name: "Środa" },
      { id: 3, name: "Czwartek" },
      { id: 4, name: "Piątek" },
      { id: 5, name: "Sobota" },
      { id: 6, name: "Niedziela" },
    ],
    mealTypes: [
      { id: 1, name: "Śniadanie" },
      { id: 2, name: "Obiad jednodaniowy" },
      { id: 3, name: "Obiad dwudaniowy" },
      { id: 4, name: "Podwieczorek" },
    ],
    headers: [
      {
        text: "Posiłek",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Rodzaj", value: "type" },
      { text: "Cena (PLN)", value: "price" },
      { text: "Akcje", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapGetters("offers", ["offersList"]),
    ...mapGetters("user", ["userInfo", "myPermissions"]),
    ...mapGetters("orders", ["ordersList"]),
    ...mapGetters("kids", ["kidsList", "kidsInstitution"]),
    kidsNames() {
      return this.kidsList.map((obj) => ({
        text: obj.name,
        value: obj.publicId,
      }));
    },
    myKidsNames() {
      return this.kidsList.map((obj) => ({
        text: obj.name,
        value: obj.publicId,
      }));
    },
    kidsInstitutionNames() {
      return this.kidsInstitution.map((obj) => ({
        text: obj.name,
        value: obj.publicId,
      }));
    },
  },
  methods: {
    ...mapActions("offers", [
      "getOffers",
      "addOffer",
      "deleteOffer",
      "updateOffer",
    ]),
    ...mapActions("orders", ["addOrder"]),
    ...mapActions("kids", ["getKids", "getMyKids", "getInstitutionKids"]),
    // @vuese
    // Funkcja zwraca listę ofert na odpowiedni dzień
    _offersList(value) {
      return this.offersList.filter(
        (offersList) => offersList.dayOfWeek == value
      );
    },
    // @vuese
    // Funkcja usuwa ofertę o podanym ID oraz zamyka okno dialogowe usuwania
    remove() {
      this.deleteOffer({
        id: this.editedOffer.publicId,
      }).then(() => {
        this.dialogDelete = false;
      });
    },
    // @vuese
    // Zamknięcie wszystkich okien dialogowych
    close() {
      this.dialog = false;
      this.dialogEdit = false;
      this.dialogDelete = false;
      this.dialogOffer = false;
    },
    // @vuese
    // Funkcja aktualizuje wybrany rekord oraz zamyka okno dialogowe edycji
    edit() {
      this.updateOffer({
        id: this.editedOffer.publicId,
        name: this.editedOffer.name,
        price: this.editedOffer.price,
        type: this.editedOffer.type,
        day: this.editedOffer.dayOfWeek,
      }).then(() => {
        this.dialogEdit = false;
      });
    },
    // @vuese
    // Wybranie edytowanego obiwktu i otworzenie okna dialogowego edycji
    openEdit(item) {
      this.editedOffer = Object.assign({}, item);
      this.dialogEdit = true;
    },
    // @vuese
    // Wybranie usuwanego obiektu i otworzenie okna dialogowego usuwania
    openDelete(item) {
      this.editedOffer = Object.assign({}, item);
      this.dialogDelete = true;
    },
    // @vuese
    // Funkcja zapisuje nowy rekord w bazie oraz zamyka okno dialogowe dodawania rekordów
    save() {
      if (this.$refs.observer.validate()) {
        this.addOffer({
          name: this.newName,
          price: this.newPrice,
          type: this.newType,
          day: this.newDay,
        });
        this.dialog = false;
      }
    },
    // @vuese
    // Funkcja oblicza wartość zaznaczonych ofert\
    calcPrice() {
      var sum = 0;
      this.selected.forEach(addprice);
      function addprice(item) {
        sum += item.price;
      }
      this.orderValue = sum.toFixed(2);
    },
    // @vuese
    // Funkcja tworzy zamówienie z wybranymi ofertami dla wybranego dziecka
    order() {
      var meals = [];
      this.selected.forEach(addid);
      function addid(item) {
        meals.push(item.publicId);
      }
      this.addOrder({ id: this.childID, offers: meals });
      this.dialogOffer = false;
    },
  },
  beforeMount() {
    this.getOffers();
    if (
      this.myPermissions[
        "FitKidCateringApp.Helpers.StandardPermissions@AdminAccess" ||
          "FitKidCateringApp.Helpers.StandardPermissions@CateringEmployee"
      ]
    ) {
      this.getKids();
    } else if (
      !this.myPermissions[
        "FitKidCateringApp.Helpers.StandardPermissions@AdminAccess"
      ] &&
      this.userInfo.institutions.length
    ) {
      this.getInstitutionKids(this.userInfo.institutions[0].publicId);
    } else if (
      !this.myPermissions[
        "FitKidCateringApp.Helpers.StandardPermissions@AdminAccess"
      ] &&
      !this.userInfo.institutions.length
    ) {
      this.getMyKids();
    }
  },
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
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
