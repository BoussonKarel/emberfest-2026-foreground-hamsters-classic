const BroccoliPlugin = require('broccoli-plugin').default;

const path = require('path');
const fs = require('fs');
const esbuild = require('esbuild');

const SCRIPT_EXTENSIONS = new Set(['.ts', '.js']);
const tsconfig = path.join(__dirname, '..', 'tsconfig.json');

class BuildChromeScripts extends BroccoliPlugin {
  build() {
    for (const inputPath of this.inputPaths) {
      for (const file of fs.readdirSync(inputPath)) {
        const { name, ext } = path.parse(file);
        if (!SCRIPT_EXTENSIONS.has(ext)) continue;

        esbuild.buildSync({
          entryPoints: [path.join(inputPath, file)],
          outfile: path.join(this.outputPath, `${name}.js`),
          bundle: true,
          format: 'esm',
          minify: true,
          tsconfig,
        });
      }
    }
  }
}

module.exports.BuildChromeScripts = BuildChromeScripts;
