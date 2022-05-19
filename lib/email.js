const got = require('got');
const conf = require('./conf');

function renderHtml(products) {
  return `
    <ul>
    ${
      products.map((product) => `
        <li>
          <a href="${conf.scraper.baseUrl}${product.productDetailsUrl}">${product.title}</a><br/>
          ${
            product.filters?.dimensions?.dimensionRelYear ?
            `Year: <strong>${product.filters.dimensions.dimensionRelYear}</strong><br/>` :
            ''
          }
          Color: <strong>${product.filters?.dimensions?.dimensionColor}</strong><br/>
          ${
            product.filters?.dimensions?.tsMemorySize ?
            `RAM: <strong>${product.filters.dimensions.tsMemorySize}</strong><br/>` :
            ''
          }
          Storage: <strong>${product.filters?.dimensions?.dimensionCapacity}</strong><br/>
          Price:
          <strong>${product.price?.currentPrice?.amount}</strong>
          <em>${product.price?.previousPrice?.previousPrice}</em>
        </li>
      `).join('')
    }
    </ul>
  `;
}

async function send(products) {
  const authToken = Buffer.from(`api:${conf.mailgun.apiKey}`).toString('base64')

  return got.post(`${conf.mailgun.baseUrl}/v3/${conf.mailgun.domain}/messages`, {
    form: {
      from: conf.email.from,
      to: conf.email.to,
      subject: conf.email.subject,
      html: renderHtml(products),
    },
    headers: {
      Authorization: `Basic ${authToken}`,
    }
  });
}

module.exports = {
  send
}