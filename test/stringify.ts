import test from "ava";
import { stringify } from "../src/dsn/stringify.js";
import type { Dsn } from "../src/types/Dsn.js";

const sampleProtocol = "protocol";
const sampleUsername = "u5er-n*me";
const samplePassword = "p&55w0rd";
const samplePath = "path/to/entity.extension";
const sampleHost = "host";
const samplePort = 7986;
const sampleQuery = "var1=Hello&var2=World+of+Dsn+%26+Stuff";

const buildTestDsn = (includeUsername = false, includePassword = false, includePort = false, includeQuery = false): Dsn => {
	const dsn: Dsn = {
		protocol: sampleProtocol,
		host: sampleHost,
		path: samplePath,
	};

	if (includeUsername) {
		dsn.username = sampleUsername;
		if (includePassword) {
			dsn.password = samplePassword;
		}
	}

	if (includePort) {
		dsn.port = samplePort;
	}

	if (includeQuery) {
		dsn.query = new URLSearchParams(sampleQuery);
	}

	return dsn;
};

test("Stringify minimal Dsn", (t) => {
	const dsnString = stringify(buildTestDsn());
	t.is(dsnString, `${sampleProtocol}://${sampleHost}/${samplePath}`);
});

test("Stringify with username", (t) => {
	const dsnString = stringify(buildTestDsn(true));
	t.is(dsnString, `${sampleProtocol}://${sampleUsername}@${sampleHost}/${samplePath}`);
});

test("Stringify with username and password", (t) => {
	const dsnString = stringify(buildTestDsn(true, true));
	t.is(dsnString, `${sampleProtocol}://${sampleUsername}:${samplePassword}@${sampleHost}/${samplePath}`);
});

test("Stringify with port", (t) => {
	const dsnString = stringify(buildTestDsn(false, false, true));
	t.is(dsnString, `${sampleProtocol}://${sampleHost}:${samplePort}/${samplePath}`);
});

test("Stringify with query", (t) => {
	const dsnString = stringify(buildTestDsn(false, false, false, true));
	t.is(dsnString, `${sampleProtocol}://${sampleHost}/${samplePath}?${sampleQuery}`);
});
