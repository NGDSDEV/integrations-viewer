import { keysQA } from "./qa";
import { keysProduction } from "./production";

const keys = { ...(process.env.MODE === "development" ? keysQA : keysProduction) };

export default keys;
