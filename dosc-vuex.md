# Moduł Magazynu Vuex

## store/index.js

Moduł magazynu Vuex przechowujący dane w local storage

## admin/state

obiekt przechowujący aktualne stany danych zmiennych pobranych z API

Typ: [Object][44]

### Właściwości

-   `userList` **[Array][45]** tablica przechowująca listę obiektów użytkowników pobranych z API
-   `permissions` **[Object][44]** obiekt zawierający informacje o dostępnych uprawnieniach
-   `currentUserPermissions` **[Object][44]** obiekt zawierający informacje o uprawnieniach danego użytkownika

## store/modules/admin

Magazyn do przechowywania informacji do których dostęp ma administrator

## admin/getters

obiekt posiadający funkcje które zwracają obiekty lub tablice z obiektu state

Typ: [object][44]

## admin/actions

getPermissions - funkcja pobiera dostępne uprawnienia z API następnie wywołuje mutacje "permissions" <br/>
 getUsers - funkcja pobiera wszystkich użytkowników z API, następnie wywołuje mutację "users" <br/>
 getUserPermissions - funkcja pobierająca z API uprawnienia danego uzytkownika <br/>

## admin/mutations

obiekt posiadający funkcje które zmieniają stan zmiennych w obiekcie state

Typ: [object][44]

## institutions/state

obiekt przechowujący aktualne stany danych zmiennych pobranych z API

Typ: [Object][44]

### Właściwości

-   `institutionsList` **[Array][45]** tablica przechowująca listę obiektów instytucji pobranych z API

## store/modules/institutions

Magazyn do przechowywania informacji dotyczących instytucji

## institutions/getters

obiekt posiadający funkcje które zwracają obiekty lub tablice z obiektu state

Typ: [Object][44]

## institutions/actions

getInstitutions - funkcja pobiera listę instytucji z API <br/>
addInstitutions - wywołuje zapytanie aby dodać nową instytucję <br/>
deleteInstitution - wywołuje zapytanie w celu usunięcia instytucji <br/>
editInstitution - wywołuje zapytanie w celu edycji danych instytucji <br/>

## institutions/mutations

obiekt posiadający funkcje które zmieniają stan zmiennych w obiekcie state

Typ: [object][44]

## kids/state

obiekt przechowujący aktualne stany danych zmiennych pobranych z API

Typ: [Object][44]

### Właściwości

-   `kidsList` **[Array][45]** tablica przechowująca listę obiektów o z informacjami o danych podopiecznych pobranych z API

## store/modules/kids

Magazyn do przechowywania informacji o podopiecznych

## kids/getters

obiekt posiadający funkcje które zwracają obiekty lub tablice z obiektu state

Typ: [Object][44]

## kids/actions

getKids - funkcja pobiera listę podopiecznych z API - administrator <br/>
  getMyKids - funkcja pobiera listę podopiecznych z API - rodzic  <br/>
  addKid - funkcja dodaje podopiecznego - administrator  <br/>
  addMyKid - funkcja dodaje podopiecznego - rodzic  <br/>
  editKid - funkcja edytuje podopiecznego - administrator  <br/>
  editMyKid - funkcja edytuje podopiecznego - rodzic  <br/>
  deleteKid - funkcja usuwa podopiecznego - administrator  <br/>
  deleteMyKid - funkcja usuwa podopiecznego - rodzic  <br/>

## kids/mutations

obiekt posiadający funkcje które zmieniają stan zmiennych w obiekcie state

Typ: [object][44]

## store/modules/menu

Magazyn do przechowywania informacji o aktualnym menu

## menu/state

obiekt przechowujący aktualne stany danych zmiennych pobranych z API

Typ: [Object][44]

### Właściwości

-   `offersList` **[Array][45]** tablica zawierająca obiekty aktualnych pozycji w menu

## menu/getters

obiekt posiadający funkcje które zwracają obiekty lub tablice z obiektu state

Typ: [object][44]

## menu/actions

getOffers - funkcja zwracająca listę ofert <br/>
 addOffer - funkcja dodająca ofertę do menu <br/>
 deleteOffer - funkcja usuwająca wybraną ofertę <br/>
 updateOffer - funkcja aktualizująca wybraną ofertę

## menu/mutations

obiekt posiadający funkcje które zmieniają stan zmiennych w obiekcie state

Typ: [object][44]

## orders/state

obiekt przechowujący aktualne stany danych zmiennych pobranych z API

Typ: [Object][44]

### Właściwości

-   `ordersList` **[Array][45]** tablica zawierająca zamówienia

## store/modules/orders

Magazyn do przechowywania informacji o zamówieniach

## orders/getters

obiekt posiadający funkcje które zwracają obiekty lub tablice z obiektu state

Typ: [object][44]

## orders/actions

addOrder - funkcja zapisująca zamówienie w bazie

## orders/mutations

obiekt posiadający funkcje które zmieniają stan zmiennych w obiekcie state

Typ: [object][44]

## toastMessage/state

The Vuex 'state' object.

Typ: [object][44]

### Właściwości

-   `alertTyp` **[String][46]** ="success" - typ wiadomości
-   `alertIcon` **[String][46]** ="mdi-checkbox-marked-circle-outline" - ikona
-   `message` **[String][46]** wiadomość
-   `timeout` **[Number][47]** =2000 - czas na jaki pojawia się snackbar
-   `showAlert` **Bolean** =false - jeżeli wartość = "true" to snackbar sie pokazuje

## store/modules/toastMessage

Pokazuje snackbar z informacjami

## toastMessage/getters

The module 'getters' object.

Typ: [object][44]

## toastMessage/actions

alert - pokazuje snackbar z daną wiadomością <br/>
hideAlert - zamyka snackbar po kliknięciu przycisku zamykającego <br/>

## toastMessage/mutations

Ustawia odpowiednio zmienne w obiekcie state

Typ: [object][44]

## store/modules/user

Magazyn do przechowywania informacji o zalogowanym użytkowniku

## user/state

obiekt przechowujący aktualne stany danych zmiennych pobranych z API

Typ: [Object][44]

### Właściwości

-   `id` **[String][46]** id użytkownika
-   `logged_in` **[Boolean][48]** true jeżeli użytkownik jest zalogowany
-   `getToken` **[Boolean][48]** true jeżeli token został zapisany
-   `expires` **[String][46]** czas wygaśnięcia tokenu
-   `token` **[String][46]** token użytkownika zwracany po zalogowaniu
-   `refToken` **[String][46]** refresh token - służy do odświeżania czasu tokena
-   `userInfo` **[Object][44]** obiekt zawierający informacje o danym użytkowniku
-   `myPermissions` **[Array][45]** tablica zawierająca informacje o uprawnieniach danego użytkownika

## user/getters

obiekt posiadający funkcje które zwracają obiekty lub tablice z obiektu state

Typ: [object][44]

## user/actions

login - funkcja zajmująca sielogowaniem użytkownica do systemu <br/>
 getUserData - funkcja pobiera dane dotyczące zalogowanego uzytkownika <br/>
 refreshToken - funkcja odświeżająca token <br/>
logout - funkcja służąca do wylgowania użytkownika <br/>
register - funkcja służąca do rejestracji nowego uzytkownika

## user/mutations

obiekt posiadający funkcje które zmieniają stan zmiennych w obiekcie state

Typ: [object][44]

[1]: #index

[2]: #adminstate

[3]: #properties

[4]: #storemodulesadmin

[5]: #admingetters

[6]: #adminactions

[7]: #adminmutations

[8]: #institutionsstate

[9]: #properties-1

[10]: #storemodulesinstitutions

[11]: #institutionsgetters

[12]: #institutionsactions

[13]: #institutionsmutations

[14]: #kidsstate

[15]: #properties-2

[16]: #storemoduleskids

[17]: #kidsgetters

[18]: #kidsactions

[19]: #kidsmutations

[20]: #storemodulesmenu

[21]: #menustate

[22]: #properties-3

[23]: #menugetters

[24]: #menuactions

[25]: #menumutations

[26]: #ordersstate

[27]: #properties-4

[28]: #storemodulesorders

[29]: #ordersgetters

[30]: #ordersactions

[31]: #ordersmutations

[32]: #toastmessagestate

[33]: #properties-5

[34]: #storemodulestoastmessage

[35]: #toastmessagegetters

[36]: #toastmessageactions

[37]: #toastmessagemutations

[38]: #storemodulesuser

[39]: #userstate

[40]: #properties-6

[41]: #usergetters

[42]: #useractions

[43]: #usermutations

[44]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[45]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[46]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[47]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[48]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean
