process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// allow to use links to typescript files in stack trace
// instead of linking generated javascript files
import "source-map-support/register";
