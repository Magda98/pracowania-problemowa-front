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
                  <template v-slot:top>
                    <v-dialog
                      v-model="dialogEdit"
                      persistent
                      max-width="600px"
                      retain-focus="False"
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
                      retain-focus="False"
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
                  <template v-slot:item.actions="{ item }">
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
          <v-btn block elevation="3" color="light-green accent-1" @click="order"
            >Dodaj do zamówienia</v-btn
          >
          <br />
          <validation-observer ref="observer">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
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
                            rules="required|max:256|min:4"
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
                    <v-btn color="error" text @click="close">
                      Anuluj
                    </v-btn>
                    <v-btn color="secondary" text @click="save">
                      Dodaj
                    </v-btn>
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

extend("required", {
  ...required,
  message: "To pole jest obowiązkowe",
});

extend("max", {
  ...max,
  message: "Nazwa posiłku nie może być dłuższa niż 256 znaków",
});
extend("min", {
  ...min,
  message: "Nazwa posiłku nie może być krótsza niż 4 znaki",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    dialog: false,
    dialogEdit: false,
    dialogDelete: false,
    tab: null,
    search: "",
    selected: [],
    newName: "",
    newPrice: "",
    newType: "",
    newDay: "",
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
  },
  methods: {
    ...mapActions("offers", [
      "getOffers",
      "addOffer",
      "deleteOffer",
      "updateOffer",
    ]),

    /** Zwrócenie ofert odpowiadających danemu dniu */
    _offersList(value) {
      return this.offersList.filter(
        (offersList) => offersList.dayOfWeek == value
      );
    },
    /** Usunięcie rekordu */
    remove() {
      this.deleteOffer({
        id: this.editedOffer.publicId,
      }).then(() => {
        this.dialogDelete = false;
      });
    },
    /** Zamknięcie okien dialogowych */
    close() {
      this.dialog = false;
      this.dialogEdit = false;
      this.dialogDelete = false;
    },
    /** Aktualizacja rekordu */
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
    /** Otworzenie okna dialogowego edycji rekordu */
    openEdit(item) {
      this.editedOffer = Object.assign({}, item);
      this.dialogEdit = true;
    },
    /** Otworzenie okna dialogowego usuwania rekordu */
    openDelete(item) {
      this.editedOffer = Object.assign({}, item);
      this.dialogDelete = true;
    },
    /** Zapisanie w bazie nowego rekordu */
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
    order() {
      var ids = [];
      this.selected.forEach(addid);
      function addid(item) {
        ids.push(item.publicId);
      }
      alert("Do zamówienia dodano posiłki o id: " + ids);
    },
  },
  beforeMount() {
    this.getOffers();
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
