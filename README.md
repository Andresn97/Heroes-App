# Heroes App

## Dev

1. Clone the proyect
2. In the terminal execute: ```npm install```
3. Init the backend server: ```npm run backend```
4. Create in /app/environments a file: enviroments.ts with the url base of the backend, in my case: 
```
export const environments = {
  baseUrl: 'https://localhost:3000'
}
```
5. Run app: ```npm start``` or ```ng serve -o```