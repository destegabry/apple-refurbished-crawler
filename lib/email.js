const conf = require('./conf');

function renderHtml(products) {
  return `
    <ul>
    ${
      products.map((product) => `
        <li>
          <a href="${product.productDetailsUrl}">${product.title}</a><br/>
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
  const data = new FormData();
  data.append("from", conf.email.from);
  data.append("to", conf.email.to);
  data.append("subject", conf.email.subject);
  data.append("html", renderHtml(products));

  const response = await fetch(`${conf.mailgun.baseUrl}/v3/${conf.mailgun.domain}/messages`, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: `Basic ${authToken}`,
    }
  });

  if (response.status === 200) {
    return response.json();
  }
  if (response.status === 400) {
    const error =  await response.json();
    throw new Error(error.message);
  }
  throw new Error(response.statusText);
}

module.exports = {
  send
}