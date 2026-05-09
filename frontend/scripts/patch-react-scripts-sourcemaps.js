const fs = require("fs");
const path = require("path");

const configPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "react-scripts",
  "config",
  "webpack.config.js"
);

if (!fs.existsSync(configPath)) {
  process.exit(0);
}

let config = fs.readFileSync(configPath, "utf8");
const originalConfig = config;

const devSourceMapValue = "isEnvDevelopment && shouldUseSourceMap";

config = config.replace(
  /sourceMap: isEnvProduction \? shouldUseSourceMap : isEnvDevelopment,/g,
  `sourceMap: isEnvProduction ? shouldUseSourceMap : ${devSourceMapValue},`
);

config = config.replace(
  /sourceMap: isEnvProduction\s*\?\s*shouldUseSourceMap\s*:\s*isEnvDevelopment,/g,
  `sourceMap: isEnvProduction ? shouldUseSourceMap : ${devSourceMapValue},`
);

config = config.replace(
  ": isEnvDevelopment && 'cheap-module-source-map'",
  ": isEnvDevelopment && shouldUseSourceMap && 'cheap-module-source-map'"
);

config = config.replace(
  "sourceMap: true,",
  "sourceMap: shouldUseSourceMap,"
);

if (config !== originalConfig) {
  fs.writeFileSync(configPath, config);
}
