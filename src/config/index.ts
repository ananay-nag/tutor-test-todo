import local from "@config/env/local";
import dev from "@config/env/dev";
/**
 * Expose
 */
export const CONFIG = { local, dev }[process.env.NODE_ENV || "local"];
