/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				port: "",
				pathname: "/v0/b/farm-store-0101.appspot.com/o/**",
			},
		],
	},
	typescript: {
		ignoreBuildErrors: true,
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
