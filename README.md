# lotivis-datatext [![Node.js CI Build](https://github.com/lotivis/lotivis-datatext/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/lotivis/lotivis-datatext/actions/workflows/node.js.yml)

The lotivis.js datatext chart.

## Installing

If you use npm, `npm install lotivis-datatext`. You can also download the [latest realease on GitHub](https://github.com/lukasdanckwerth/lotivis-datatext/releases/latest). For using in browsers, you can load the UMD bundle from an npm-based CDN such as jsDelivr.

```html
<script src="https://cdn.jsdelivr.net/..."></script>
<script>

let datatextChart = lotivis.datatext();

</script>

```

## API Reference

### Content formats

```js
datatext.text(lotivis.datatextCSV);
```

#### lotivis.[datatextJSON](./src/datatext.js)
Formats a JSON the data view object of the datatext.

#### lotivis.[datatextJSONData](./src/datatext.js)
Formats a JSON of the data.

#### lotivis.[datatextCSV](./src/datatext.js)
Formats the data as CSV.

### Datatext

#### datatext.[id](./src/datatext.js)()
Returns the datatext's id.

#### datatext.[height](./src/datatext.js)(_)
Gets or sets the maximum height of the datatext.

#### datatext.[marginLeft](./src/datatext.js)(_)
Gets or sets the left margin of the datatext.

#### datatext.[marginTop](./src/datatext.js)(_)
Gets or sets the top margin of the datatext.

#### datatext.[marginRight](./src/datatext.js)(_)
Gets or sets the right margin of the datatext.

#### datatext.[marginBottom](./src/datatext.js)(_)
Gets or sets the bottom margin of the datatext.

#### datatext.[backgroundColor](./src/datatext.js)(_)
Gets or sets the background color of the datatext.

#### datatext.[enabled](./src/datatext.js)(_)
Gets or sets whether the datatext is enabled.

#### datatext.[title](./src/datatext.js)(_)
Gets or sets the title of the datatext.

#### datatext.[text](./src/datatext.js)(_)


#### datatext.[dataController](./src/datatext.js)(_)
Gets or sets the data controller of the data text.

## Development

```bash
# build module
yarn build

# develop module
yarn build:watch
```