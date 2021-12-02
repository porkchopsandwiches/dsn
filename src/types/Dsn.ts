export type Dsn<HostType extends string = string> = {
	protocol: string;
	username?: string;
	password?: string;
	host: HostType;
	port?: number;
	path: string;
	query?: URLSearchParams;
};
