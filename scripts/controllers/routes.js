//page.js controllers here

page('/', homeController.reveal);
page('/about', aboutController.reveal);
page('/info', infoController.reveal);
page('/city-comparison', cityController.reveal);
page('/zillow', MortgageData.fetchZillow);
page('/rental', RentalData.fetchStates);
page();

