To get started first run:
```
npm install
```
Create a .env file in the root directory following the .env.example example and then run the command:
```
npx prisma migrate dev --name init
```
This command will create the database that is in the .env file. The prisma provider is setted to mysql, you can change it in the schema.prisma file.
After this, run this for transpile typescript to javascript:
```
npm run build
```
And finally run this to make the application listen a port:
```
npm start
```
If you want you can also run directly the typescript files without having to transpile the code with the command:
```
npm run devStart
```
