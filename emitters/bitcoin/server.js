var request = require('request-promise');

publishPriceFromHuobi().catch(function(err) {
  console.error(err.stack);
});

setInterval(function() {
  publishPriceFromHuobi().catch(function(err) {
    console.error(err.stack);
  });
}, 600 * 1000);

function publishPriceFromHuobi() {
  return request('http://api.huobi.com/staticmarket/ticker_btc_json.js', {json: true}).then(function(result) {
    return publishEvent({
      source: 'huobi',
      currency: 'CNY',
      bid: result.ticker.sell,
      ack: result.ticker.buy
    }, ['bitcoin', 'bot']).then(function(event) {
      console.log('publishPriceFromHuobi: publish', event.id);
    });
  });
}

function publishEvent(payload, tags) {
  return request('https://stream.pub/api/events', {
    method: 'POST',
    json: true,
    body: {
      payload: payload,
      tags: tags
    }
  });
}
