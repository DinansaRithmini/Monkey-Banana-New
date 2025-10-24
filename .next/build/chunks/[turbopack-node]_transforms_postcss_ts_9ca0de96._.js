module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/monkey-banana/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "build/chunks/ab5c8_ff0f1ca7._.js",
  "build/chunks/[root-of-the-server]__f4a13537._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/monkey-banana/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];