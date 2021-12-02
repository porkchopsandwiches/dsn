# @porkchopsandwiches/dsn

DSN string parsing and stringifying.

## Install

```sh
npm install @porkchopsandwiches/dsn
```

## Usage

```js
import { parse, stringify } from "@porkchopsandwiches/dsn";

const parsed = parse("mysqli://user:p&ssw!rd@hostname:1234/path/to/entity?extra=1");
// -> { protocol: "mysqli", username: "user", "password": "p&ssw!rd", host: "hostname", port: 1234, path: "path/to/entity", query: URLSearchParams }

const dsnString = stringify({
    protocol: "arbitrary",
    host: "unprotected.host",
    path: "path/to/dsn/entity"
});
// -> "arbitrary://unprotected.host/path/to/dsn/entity"

```

### `parse(dsnString: string): Dsn | undefined`

`parse()` takes a `string`, and returns either a `Dsn` object (see below), or undefined if it does not look like a Dsn.

The Dsn string *must* contain a **protocol**, **host** and **path**. It *may* contain a **username**, **password**, **port** and/or **query**.

### `stringify(dsn: Dsn): string`

`stringify()` takes a `Dsn` object (see below) and returns a `string`.

The Dsn object *must* contain a **protocol** `string`, **host** `string` and **path** `string`. It *may* contain a **username** `string`, **password** `string`, **port** `number` and/or **query** `URLSearchParams`.

### Dsn object
Dsn objects are returned by `parse()` and taken by `stringify()`.

| Field      | Type              | Notes    |
| ---------- | ----------------- | -------- |
| `protocol` | `string`          | Required |
| `host`     | `string`          | Required |
| `path`     | `string`          | Required |
| `username` | `string`          | Optional |
| `password` | `string`          | Optional |
| `host`     | `number`          | Optional |
| `query`    | `URLSearchParams` | Optional |
