const withTM = require("next-transpile-modules")(["@sh/components"]);

module.exports = withTM({
  reactStrictMode: true,
});
