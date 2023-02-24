## Cypress api testing automation by Leonardo Kartabil
<br>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>


#### en-Us: In this project I gather some of my cypress api test automation knowledge acquired in the last years studying the tool

#### pt-Br: Neste projeto reúno alguns dos meus conhecimentos sobre automação de testes de api com Cypress adquiridos nos último anos de estudo na ferramenta.

## Installation

Clone the project to your computer
```bash
git clone https://github.com/LeoKartabil/cypress-api.git
```

Open the project folder and use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install the project.

```bash
npm i install
```

To run the automation in **graphic mode** run:
``` 
npm run cy:open:prod
```

To run the automation in **headless mode** run:
``` 
npm run cy:run:prod
```
After run this last command you can check the **report** folder which was created at the root of the project and open the **index.html**

## Structure

```
  cypress/
     config =>Files for differents environments and its base urls, variables and configs.
  fixtures/
     schemas =>Schemas for contract validation grouped by their http verbs and feature.
  e2e/
     serverest => Specs for the 'serverest.dev' testing.
  support/
     clear.js => File used to clean all the report folder before run the tests.
     commands.js => File used to gather global commands.
     serverest
          *.commands.js => Files used to gather commands for a specific spec or feature.
  reports/
     screenshots => Folder where be placed failed and sucessed evidences
     index.html => Generate after the firts 'run' - A html report with screenshots embeededs. 
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Feel free to send me a message in [LinkedIn](https://www.linkedin.com/in/leo-kartabil/)

## License

[MIT](https://choosealicense.com/licenses/mit/)