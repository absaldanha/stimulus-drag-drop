import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
// import { version } from "./package.json" assert { type: "json" }

// const banner = `/*!\nStimulus-Drag-Drop ${version}\n*/`

export default [
  {
    input: "src/index.ts",
    external: ["@hotwired/stimulus"],
    output: [
      {
        name: "Stimulus-Drag-Drop",
        file: "dist/stimulus-drag-drop-umd.js",
        format: "umd",
        globals: { "@hotwired/stimulus": "Stimulus" }
      },
      {
        file: "dist/stimulus-drag-drop-esm.js",
        format: "es",
        globals: { "@hotwired/stimulus": "Stimulus" }
      }
    ],
    plugins: [
      resolve(),
      typescript()
    ],
    watch: {
      include: "src/**"
    }
  }
]
