# Projekt TypeScript Angular 
Av Anne-Lii Hansen
anha2324@student.miun.se

Detta är ett typeScript projekt skapat med Angular och [Angular CLI](https://github.com/angular/angular-cli) version 17.3.5. Webbplatsen är för ett fiktivt universitet där man kan söka och filtrera på alla deras kurser som läses ut med HttpClient från en json-fil. Det går även att sortera kurserna på kurskod, kursnamn, ämne och poäng.Till varje kurs finns möjlighet att lägga till kursen till ett eget ramschema. Det går också att ta bort kurser från ramschemat. På sidan för ramschemat visas antal valda kurser samt den sammanlagda poängen för alla de kurserna. En paginering har lagts till på sidan för alla kurser för att enklare få en översikt.

## Installation
Klona projektet från GitHub-repot:
`git clone https://github.com/Anne-Lii/ts_projekt.git`.
gå in i mappen och installera projektet med npm `npm install`
`ng serve --open` för att öppna i webbläsaren eller klistra in  `http://localhost:4200/`. 

## Teknik
Angular
HTML/CSS
TypeScript