import { Dsn } from "../types/Dsn";

// Inspired by https://github.com/fonini/dsn-parser/blob/master/index.js
// protocol://(username:(password?)@?)host(:port?)/path(?query?)
const parsePattern = /^(?:(?<protocol>[^:/?#.]+):)?(?:\/\/(?:(?<authentication>[^/?#]*)@)?(?<host>[\w\d\-\u0100-\uFFFF.%]*)(?::(?<port>\d+))?)?\/(?<path>[^?#]+)?(?:\?(?<query>[^#]*))?$/i;

// Keys that we hope to match
type MatchGroupKeys = "protocol" | "authentication" | "host" | "port" | "path" | "query";

// Describes the shape of the Regexp match group
type MatchGroup = {
	[key in MatchGroupKeys]: string | undefined;
};

/**
 * Parse a DSN string into elements. Returns undefined if it doesn't look like a DSN.
 *
 * @param {string} dsnString		The string to parse.
 *
 * @returns {Dsn | undefined}	   An object describing the elements of the DSN, or undefined.
 */
export const parse = <HostType extends string = string>(dsnString: string): Dsn<HostType> | undefined => {
	const match = parsePattern.exec(dsnString);

	// No match, it doesn't look like a DSN
	if (!match) {
		return;
	}

	// Extract the matches from the groups
	const { protocol, authentication, host, port: portString, path, query: queryString } = match.groups as MatchGroup;

	// Bail early if the 'must see' items are not present
	if (protocol === undefined || host === undefined || path === undefined) {
		return undefined;
	}

	// Break down the username and password
	const [username, password] = authentication === undefined ? [undefined, undefined] : authentication.split(":");

	// Parse the port as an integer
	const port = portString === undefined ? undefined : Number.parseInt(portString, 10);

	// Parse the query string
	const query = queryString === undefined ? undefined : new URLSearchParams(queryString);

	return {
		protocol,
		username,
		password,
		host: host as HostType,
		port,
		path,
		query,
	};
};
