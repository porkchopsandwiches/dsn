import test from "ava";
import { parse } from "../src/dsn/parse.js";

const sampleProtocol = "protocol";
const sampleUsername = "u5er-n*me";
const samplePassword = "p&55w0rd";
const samplePath = "path/to/entity.extension";
const sampleHost = "host";
const samplePort = 7986;
const sampleQuery = "var1=Hello&var2=World+of+Dsn+%26+Stuff";

const buildTestDsnString = (includeUsername = false, includePassword = false, includePort = false, includeQuery = false): string => {
	let authentication = "";
	if (includeUsername) {
		authentication = sampleUsername;
		if (includePassword) {
			authentication += `:${samplePassword}`;
		}

		authentication += "@";
	}

	let port = "";
	if (includePort) {
		port = `:${samplePort}`;
	}

	let query = "";
	if (includeQuery) {
		query = `?${sampleQuery}`;
	}

	return `${sampleProtocol}://${authentication}${sampleHost}${port}/${samplePath}${query}`;
};

test("Parse minimal Dsn", (t) => {
	const parsed = parse(buildTestDsnString());
	t.not(parsed, undefined);
	t.is(parsed?.protocol, sampleProtocol);
	t.is(parsed?.host, sampleHost);
	t.is(parsed?.path, samplePath);
});

test("Parse with username", (t) => {
	const parsed = parse(buildTestDsnString(true));
	t.not(parsed, undefined);
	t.is(parsed?.protocol, sampleProtocol);
	t.is(parsed?.host, sampleHost);
	t.is(parsed?.path, samplePath);
	t.is(parsed?.username, sampleUsername);
});

test("Parse with username and password", (t) => {
	const parsed = parse(buildTestDsnString(true, true));
	t.not(parsed, undefined);
	t.is(parsed?.protocol, sampleProtocol);
	t.is(parsed?.host, sampleHost);
	t.is(parsed?.path, samplePath);
	t.is(parsed?.username, sampleUsername);
	t.is(parsed?.password, samplePassword);
});

test("Parse with port", (t) => {
	const parsed = parse(buildTestDsnString(false, false, true));
	t.not(parsed, undefined);
	t.is(parsed?.protocol, sampleProtocol);
	t.is(parsed?.host, sampleHost);
	t.is(parsed?.path, samplePath);
	t.is(parsed?.port, samplePort);
});

test("Parse with query string", (t) => {
	const parsed = parse(buildTestDsnString(false, false, false, true));
	t.not(parsed, undefined);
	t.is(parsed?.protocol, sampleProtocol);
	t.is(parsed?.host, sampleHost);
	t.is(parsed?.path, samplePath);
	t.not(parsed?.query, undefined);
	t.true(parsed?.query?.has("var1"));
	t.true(parsed?.query?.has("var2"));
	t.is(parsed?.query?.get("var2"), "World of Dsn & Stuff");
});
