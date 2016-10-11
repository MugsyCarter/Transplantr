//page.js controllers here

page('/', homeController.reveal);
page('/about', aboutController.reveal);
page('/city-data', dataController.reveal);
page('/city-comparison', graphsController.reveal);

page();
