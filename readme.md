# Opis projektu
    Wirtualne menu restauracji Gościpizza, pozwalające na przeglądanie oferty i jej edycję, oraz posiadające podstawowe funkcje tworzenia kont i logowania

# Funkcjonalności
    Przeglądanie listy ofert pizzeri z opcjami filtracji i sortowania
    Tworzenie kont użytkownika
    Logowanie użytkownika
    Dodawanie, edycja i usuwanie ofert (tylko w przypadku kiedy aktualnie zalogowany użytkownik jest administratorem)
    Możliwość wejścia na sekcję informacyjną "o nas"

# Instalacja i uruchomienie
    Aby zainstalować i uruchomić projekt należy:
    1. Uruchomić wiersz poleceń poprzez
    2. Utworzyć folder w którym ma znaleźć się aplikacja za pomocą komendy: "mkdir <nazwa folderu>"
    3. Otworzyć folder za pomocą komendy: "cd <nazwa folderu>"
    4. Sklonować repozytorium komendą: "git clone https://github.com/Szym235/J205"
    5. Otworzyć folder za pomocą komendy: "cd J205"
    6. Zainstalować zależności poprzez komendę: "npm install ejs express bcrypt express-session mongodb" 
    7. Stworzyć bazę danych według instrukcji z pliku "docker.txt"
    8. Uruchomić aplikację za pomocą komendy "npm start"
    9. Uruchomić stronę poprzez wpisanie adresu "http://localhost:3000" w przeglądarce 

# Aby uruchomić ponownie aplikacje należy:
 Powtórzyć kroki 1, 3, 5, 8 i 9

# Lista endpointów:
- GET / - Strona główna

- GET /add - Strona dodawania produktów
- POST /add - Dodanie produktu

- POST /delete/:id - Usunięcie produktu

- GET /about - Strona "o nas"

- GET /edit/:id - Strona edycji
- POST /edit/:id - Edycja produktu

- GET /register - Strona rejestracji użytkownika
- POST /register - Rejestracja użytkownika
- GET /login - Strona logowania użytkownika
- POST /login - Logowanie użytkownika
- GET /logout - Wylogowanie użytkownika

# Technologie

- Node.js
- Express.js
- EJS
- bcrypt
- express-session
- Mongodb

# Autorzy 
Szymon Gościniewicz