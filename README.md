# Refurbished Apple products scraper

Get an email notification when new products (matching customizable filters) are published to the refurbished store.

## How it works

This Node.js script scrapes the content of Apple refurbished store pages using [jsdom](https://github.com/jsdom/jsdom) and sends emails using [Mailgun](https://mailgun.com).

It keeps an history of already notified products in a plain text file, so it won't bother you with repetitive emails.

⚠️ There isn't any official Apple refurbished product APIs, so **this script can stop working at any time**.

## How to use

Install [Node.js](https://nodejs.org/) on your system, [create a free Mailgun account](https://signup.mailgun.com/new/signup), set-up a sending domain (that's not very quick) and get an API key.

The script must be run passing a JSON configuration file as the only argument:

```sh
node scraper config.json
```

You can find some configuration examples in the [conf-examples](./conf-examples) folder.

The script is meant to be run from schedulers like [cron](https://crontab.guru/).

### Configuration options

```json
{
  "mailgun": {
    "apiKey": "your-secret-mailgun-api-key",
    "domain": "your.domain.dev",
    "baseUrl": "https://api.mailgun.net"
  },
  "email": {
    "from": "scraper@your.domain.dev",
    "to": "email@your.domain.dev",
    "subject": "New refurbished Mac available!"
  },
  "scraper": {
    "baseUrl": "https://www.apple.com/it",
    "path": "/shop/refurbished/mac",
    "filters": {
      "refurbClearModel": "imac",
      "dimensionScreensize": "24inch",
      "dimensionCapacity": "256gb",
      "tsMemorySize": "8gb"
    }
  }
}
```

To find available the product filters, you should open the refurbished store page in your browser, open the JavaScript console, type `window.REFURB_GRID_BOOTSTRAP.dictionaries.dimensions` and press `enter`.
