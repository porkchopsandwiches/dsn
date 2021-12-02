import is from "@sindresorhus/is";
import type { Dsn } from "../types/Dsn";

/**
 * Takes a Dsn object and returns a string representation of it.
 *
 * @param {Dsn} dsn	 The Dsn object to convert.
 *
 * @returns {string}	The Dsn string.
 *
 * @throws {TypeError}  If an invalid Dsn object is passed, or if any of the properties are of an invalid type, a TypeError is thrown.
 */
export const stringify = (dsn: Dsn): string => {
	if (typeof dsn !== "object") {
		throw new TypeError("Dsn must be an object.");
	}

	const { protocol, host, username, password, port, path, query } = dsn;

	if (!is.string(protocol)) {
		throw new TypeError("Protocol must a string.");
	}

	if (!is.string(host)) {
		throw new TypeError("Host must a string.");
	}

	if (!is.string(path)) {
		throw new TypeError("Path must a string.");
	}

	const elements = [`${protocol}://`];

	if (username !== undefined) {
		if (!is.string("username")) {
			throw new TypeError("Username must be a string.");
		}

		if (password === undefined) {
			elements.push(`${username}@`);
		} else {
			if (!is.string("password")) {
				throw new TypeError("Password must be a string.");
			}

			elements.push(`${username}:${password}@`);
		}
	}

	elements.push(host);

	if (port !== undefined) {
		if (!is.safeInteger(port)) {
			throw new TypeError("Port must be a safe integer.");
		}

		elements.push(`:${port}`);
	}

	elements.push(`/${path}`);

	if (query !== undefined) {
		if (!(query instanceof URLSearchParams)) {
			throw new TypeError("Query must be an instance of URLSearchParams.");
		}

		elements.push(`?${query.toString()}`);
	}

	return elements.join("");
};
