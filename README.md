# @porkchopsandwich/dsn

DSN URI string parsing and stringifying.

## Install

```sh
npm install @porkchopsandwich/dsn
```

## Usage

```js
import { parse, stringify } from "@porkchopsandwich/dsn";

// Parse a DSN URI into elements
const parsed = parse("mysqli://user:p&ssw!rd@hostname:1234/path/to/entity?extra=1");
// -> { protocol: "mysqli", username: "user", "password": "p&ssw!rd", host: "hostname", port: 1234, path: "path/to/entity", query: URLSearchParams }

// Compile a DSN object into a URI string
const dsnUriString = stringify({
    protocol: "arbitrary",
    host: "unprotected.host",
    path: "path/to/dsn/entity"
});
// -> "arbitrary://unprotected.host/path/to/dsn/entity"

```

### `parse(dsnString: string): Dsn | undefined`

`parse()` takes a `string`, and returns either a `Dsn` object (see below), or undefined if it does not look like a DSN URI.

The Dsn string *must* contain a **protocol**, **host** and **path**. It *may* contain a **username**, **password**, **port** and/or **query**.

### `stringify(dsn: Dsn): string`

`stringify()` takes a `Dsn` object (see below) and returns a `string`.

The Dsn object *must* contain a **protocol** `string`, **host** `string` and **path** `string`. It *may* contain a **username** `string`, **password** `string`, **port** `number` and/or **query** `URLSearchParams`.

### `Dsn` object
Dsn objects are returned by `parse()` and taken by `stringify()`. They have the following form:

| Field      | Type              | Notes    |
|------------|-------------------|----------|
| `protocol` | `string`          | Required |
| `host`     | `string`          | Required |
| `path`     | `string`          | Required |
| `username` | `string`          | Optional |
| `password` | `string`          | Optional |
| `host`     | `number`          | Optional |
| `query`    | `URLSearchParams` | Optional |
