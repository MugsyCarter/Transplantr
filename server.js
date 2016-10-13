// Let's build a server!
var express = require('express'),
  requestProxy = require('express-request-proxy'),
  port = process.env.PORT || 3000,
  zillowKey = 'X1-ZWz19jgzlx0vm3_avwne'
  censusKey = '7a3aa9d2f7fafb092b5957d10b65c477719c4c4f',
  app = express();

function proxyZillow(request, response) {
  console.log('Routing Zillow request for', request.params[0]);
  (requestProxy({
    method: 'GET',
    dataType: 'xml',
    url:'http://www.zillow.com/webservice/GetRegionChildren.htm',
    query: {
      'zws-id': zillowKey,
      state: request.params.state,
      county: request.params.county
    }
  }))(request, response);
}

function proxyCensus(request, response) {
  console.log('Routing Census request for', request.params);
  (requestProxy({
    method: 'GET',
    url:'http://api.census.gov/data/timeseries/poverty/saipe',
    query: {
      'get': 'NAME,SAEMHI_PT,SAEPOVRTALL_PT',
      'for': 'county:*',
      'in': 'state:' + request.params.state,
      time: '2012',
      key: censusKey
    }
  }))(request, response);
}

app.get('/zillow/:state/:county', proxyZillow);

app.get('/census/:state', proxyCensus);

// The serve-all has to be below the specific requests or it overrides them
app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
