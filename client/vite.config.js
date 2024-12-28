import { sync } from "glob";

export default {
    root: "./src",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input: sync("./src/**/*.html".replace(/\\/g, "/")),
        }
    }

}
