// Let's build a server!
var express = require('express'),
  requestProxy = require('express-request-proxy'),
  port = process.env.PORT || 3000,
  zillowKey = 'X1-ZWz19jfw5ars3v_1oefy',
  app = express();


function proxyZillow(request, response) {
  console.log('Routing Zillow request for', request.params[0]);
  (requestProxy({
    method: 'GET',
    dataType: 'xml',
    url:'http://www.zillow.com/webservice/GetRegionChildren.htm',
    query: {
      'zws-id': zillowKey,
      state: 'wa',
      city: 'seattle',
      childtype: 'neighborhood'
    }
  }))(request, response);
};

app.get('/zillow/*', proxyZillow);

// The serve-all has to be below the specific requests or it overrides them
app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
