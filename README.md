malhar-angular-table
========
A table component built with angular that is catered to real-time data. [View live demo](http://datatorrent.github.io/malhar-angular-table/).

Feature List
------------
- column-specific filtering
- column sorting
- stacked ordering
- column resizing
- column re-ordering
- localStorage state persistance
- pagination

Getting Started
---------------

First, include mlhr-table.js and mlhr-table.css in your project. Then, in your markup, instantiate table instances with an `<mlhr-table>` tag:

```HTML
<mlhr-table options="options" table-class="table" columns="columns" rows="rows"></mlhr-table>
```

Attributes
----------
| attribute | type | required | description |
|-----------|------|---------|-------------|
| `options`   | object | no  | An object containing various options for the table. See *Options Object* below for details|
| `columns` | Array | yes | An array of column definition objects. See *Column Definitions* below. |
| `rows`    | Array | yes | An array of data to be displayed. See the note on maintaining $$hashKeys in order to allow for more performant data updates |
| `table-class` | String | no | A string of classes to be attached to the actual `<table>` element that gets created |


Options Object
--------------
The options object should be available on the parent scope of the `<mlhr-table>` element. It is optional (defaults are used) and has the following keys:

| key | type | default | description |
|-----|------|---------|-------------|
| row_limit | number | 30 | Max number of rows to display at any one time.
| pagingScheme | String | 'scroll' | Scheme for navigating lists that extend beyond `row_limit`. Available values: "scroll", "page".
| sort_classes | Array | `[ 'glyphicon glyphicon-sort', 'glyphicon glyphicon-chevron-up', 'glyphicon glyphicon-chevron-down' ]` | If a column has a `sort` function specified, the column header will contain a `<span>` element with a css class of `sorting-icon`. This `sort_classes` array contains three strings that will be appended to the `<span>` className, one for each state of a sorted column: [classes\_for\_no\_sort, classes\_for\_ascending\_sort, classes\_for\_descending\_sort].
| storage | Object | undefined | If defined, this requires the presence of `storage_key`. This object should follow a subset of the API for `localStorage`; specifically having the methods `setItem`, `getItem`, and `removeItem`. It will use `storage_key` as the key to set. The most common use-case for this is simply to pass `localStorage` to this option. |
| storage_key | String | undefined | Used as the key to store and retrieve items from `storage`, if it is specified. |
| initial_sorts | Object[] | [] | Array of objects defining initial sorting order. Sort order is stackable. Keys on objects should be `id` to specify the column and `dir` to specify direction ("+" or "-") |



Column Definitions
-----------------
The columns should be an array of objects, where each object must have (or can have) the following properties:

| key | type | required | default value | description |
|-----|------|----------|---------------|-------------|
| id | string | no | '' | Description. |
| key | string | no | '' | Description. |
| label | string | no | '' | Description. |
| sort | string | no | '' | Description. |
| filter | string | no | '' | Description. |
| format | string | no | '' | Description. |
| trustFormat | boolean | no | false | If true, will trust that the format function returns html |
| width | string\|number | no | 'auto' | width of column, can include units, e.g. '30px' |
| lock_width | boolean | no | false | If true, column will not be resizable |



Browser Support
---------------
IE 9+
Firefox 4+
Safari 5+
Chrome 5+
