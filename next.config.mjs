import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:quizCode",
        destination: "/",
        permanent: false,
        has: [
          {
            type: "query",
            key: "quizCode",
            value: "(?!^.{8}$).*",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://thankful-tree-0c8d80b03.5.azurestaticapps.net/:path*",
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
