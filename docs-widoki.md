
# Widoki

## UserLists

Widok strony z uprawnieniami użytkowników


|Funkcja|Opis|Argumenty|
|---|---|---|
|search|funkcja umożliwiająca wyszukiwanie danego użytkownika|-|
|close|Zamyka okno dialogowe|-|
|save|funkcja zapisuje zmienione uprawnienia danego użytkownika wywołując odpowiednią funkcję z magazynu Vuex|-|
|editItem|Funkcja otwiera odpowiendie okno dialogowe edycji z uprawnieniami danego użytkownika|-|



## Register

Widok stroy rejestracji



|Funkcja|Opis|Argumenty|
|---|---|---|
|submit|Funkcja uruchamiana po kliknięciu przycisku zaloguj, wywołuje funkcję rejestracji z magazynu Vuex|-|



## OrdersList

Widok strony zamówień



|Funkcja|Opis|Argumenty|
|---|---|---|
|tableData|funkcja tworzy tabelę z danymi do wyświetlenia|-|
|see|funkcja wyświetla okno dialogowe ze szczegółami zamówienia|Jako argument podaje się wyświetlane zamówienie|



## MyKidList

Widok strony listy podopiecznych - rodzic



|Funkcja|Opis|Argumenty|
|---|---|---|
|deleteItem|funkcja, która przypisuje dany obiekt do zmiennej currentItem w celu usuniecia daniej osoby|Argument to osoba której dotyczy wybrany wiersz|
|editItem|funkcja, która przypisuje dany obiekt do zmiennej currentItem w celu edycji daniej osoby|Argument to osoba której dotyczy wybrany wiersz|
|closeEdit|funkcja zamyka okno dialogowe edycji|-|
|saveEdit|funkcja zapisuje zmiany w edycji osoby wywołując odpowiednią funkcję z magazynu Vuex|-|
|deleteItemConfirm|funkcja usuwa daną osobę wywołując daną funkcję z magazynu Vuex|-|
|close|funkcja zamyka okno dialogowe|-|
|closeDelete|funkcja zamyka okno dialogowe usuwania|-|
|save|funkcja dodaje nową osobę wowołując odpowednią funkcje z magazynu Vuex|-|



## Menu

Widok strony z aktualnym menu

#### Funkcjas

|Funkcja|Opis|Argumenty|
|---|---|---|
|_offersList|Funkcja zwraca listę ofert na odpowiedni dzień|-|
|remove|Funkcja usuwa ofertę o podanym ID oraz zamyka okno dialogowe usuwania|-|
|close|Zamknięcie wszystkich okien dialogowych|-|
|edit|Funkcja aktualizuje wybrany rekord oraz zamyka okno dialogowe edycji|-|
|openEdit|Wybranie edytowanego obiwktu i otworzenie okna dialogowego edycji|-|
|openDelete|Wybranie usuwanego obiektu i otworzenie okna dialogowego usuwania|-|
|save|Funkcja zapisuje nowy rekord w bazie oraz zamyka okno dialogowe dodawania rekordów|-|
|calcPrice|Funkcja oblicza wartość zaznaczonych ofert\|-|
|order|Funkcja tworzy zamówienie z wybranymi ofertami dla wybranego dziecka|-|






## Login

Widok stroy logowania




|Funkcja|Opis|Argumenty|
|---|---|---|
|submit|Funkcja uruchamiana po kliknięciu przycisku zaloguj, wywołuje funkcję logowania z magazynu Vuex|-|
|clear|Funkcja uruchamiana po kliknięciu przycisku wyczyść, usuwa dane z pól tekstowych formularza|-|



## KidsListInstitution

Widok stroy listy podopiecznych - administrator



|Funkcja|Opis|Argumenty|
|---|---|---|
|deleteItem|funkcja, która przypisuje dany obiekt do zmiennej currentItem w celu usuniecia daniej osoby|Argument to osoba której dotyczy wybrany wiersz|
|editItem|funkcja, która przypisuje dany obiekt do zmiennej currentItem w celu edycji daniej osoby|Argument to osoba której dotyczy wybrany wiersz|
|closeEdit|funkcja zamyka okno dialogowe edycji|-|
|saveEdit|funkcja zapisuje zmiany w edycji osoby wywołując odpowiednią funkcję z magazynu Vuex|-|
|deleteItemConfirm|funkcja usuwa daną osobę wywołując daną funkcję z magazynu Vuex|-|
|close|funkcja zamyka okno dialogowe|-|
|closeDelete|funkcja zamyka okno dialogowe usuwania|-|
|save|funkcja dodaje nową osobę wowołując odpowednią funkcje z magazynu Vuex|-|



## KidsList

Widok stroy listy podopiecznych - administrator



|Funkcja|Opis|Argumenty|
|---|---|---|
|deleteItem|funkcja, która przypisuje dany obiekt do zmiennej currentItem w celu usuniecia daniej osoby|Argument to osoba której dotyczy wybrany wiersz|
|editItem|funkcja, która przypisuje dany obiekt do zmiennej currentItem w celu edycji daniej osoby|Argument to osoba której dotyczy wybrany wiersz|
|closeEdit|funkcja zamyka okno dialogowe edycji|-|
|saveEdit|funkcja zapisuje zmiany w edycji osoby wywołując odpowiednią funkcję z magazynu Vuex|-|
|deleteItemConfirm|funkcja usuwa daną osobę wywołując daną funkcję z magazynu Vuex|-|
|close|funkcja zamyka okno dialogowe|-|
|closeDelete|funkcja zamyka okno dialogowe usuwania|-|
|save|funkcja dodaje nową osobę wowołując odpowednią funkcje z magazynu Vuex|-|



## Institutions

Widok stroy Instytucji



|Funkcja|Opis|Argumenty|
|---|---|---|
|deleteItem|funkcja, która przypisuje dany obiekt do zmiennej currentItem w celu usuniecia daniej instytucji|Argument to instytucja której dotyczy wybrany wiersz|
|editItem|funkcja, która przypisuje dany obiekt do zmiennej currentIem w celu edycji|Argument to instytucja której dotyczy wybrany wiersz|
|closeEdit|funkcja, która zamyka okno dialogowe|-|
|saveEdit|funkcja, która zapisuje wyedytowane dane instytucji, wywołuje funkcję z magazynu Vuex|-|
|deleteItemConfirm|funkcja, która wywołuje funkcję z magazyku Vuex w celu usunięcia danej instytucji|-|
|close|funkcja, która zamyka okno dialogowe|-|
|closeDelete|funkcja, która zamyka okno dialogowe|-|
|save|funkcja, która dodaje instytucje|-|



# Stats

Widok strony statystyk

## Funkcje


|Funkcja|Opis|Argumenty|
|---|---|---|
|getHeaders|Funkcja zwraca odpowiednie nagłówki w zależności od stanu przełącznika|argumentem jest stan przełącznika|
|getData|Funkcja zwraca odpowiednie dane w zależności od stanu przełącznika|argumentem jest stan przełącznika|




# OrdersList

Widok strony zamówień

## Funkcje

|Funkcja|Opis|Argumenty|
|---|---|---|
|tableData|funkcja tworzy tabelę z danymi do wyświetlenia|-|
|see|funkcja wyświetla okno dialogowe ze szczegółami zamówienia|Jako argument podaje się wyświetlane zamówienie|



