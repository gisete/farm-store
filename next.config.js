/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	webpack: (config) => {
		config.resolve.fallback = {
			fs: false,
			child_process: false,
			net: false,
			tls: false,
		};

		return config;
	},
};

module.exports = nextConfig;
