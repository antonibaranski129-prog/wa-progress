# WA Progress Tracker — Vercel Edition

Gotowa wersja do publikacji jako normalna strona WWW.

## Co działa
- wpisywanie imienia i nazwiska,
- wpisywanie World Athletics ID,
- wybór zawodnika,
- pobranie profilu i historii wyników,
- wybór konkurencji,
- wykres Season Best rok po roku,
- wykres wszystkich startów,
- PB w pobranych danych,
- ostatni SB,
- progres od pierwszego sezonu,
- tabela wyników,
- eksport CSV.

## Najłatwiejsza publikacja bez Terminala

### 1. GitHub
1. Wejdź na github.com i zaloguj się.
2. Utwórz nowe repozytorium, np. `wa-progress`.
3. Kliknij `uploading an existing file`.
4. Rozpakuj ZIP na komputerze.
5. Prześlij zawartość folderu `wa_progress_vercel`, razem z folderem `api`.
6. Zatwierdź pliki.

### 2. Vercel
1. Wejdź na vercel.com i zaloguj się.
2. Kliknij `Add New` → `Project`.
3. Wybierz repozytorium `wa-progress`.
4. Framework Preset pozostaw jako `Other`.
5. Kliknij `Deploy`.

Po publikacji dostaniesz link w stylu:
`https://wa-progress.vercel.app`

Od tego momentu niczego nie uruchamiasz lokalnie. Wchodzisz na link, wpisujesz nazwisko lub WA ID i korzystasz.

## Struktura
- `index.html` — frontend
- `api/search.js` — wyszukiwanie zawodników
- `api/athlete.js` — profil + historia wyników
- `vercel.json` — konfiguracja Vercel

## Źródło danych
Aplikacja korzysta z publicznego, nieoficjalnego proxy danych World Athletics.
Projekt nie jest oficjalnym produktem World Athletics.
