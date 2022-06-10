import { atom } from "jotai";
import { createFlagsProxy } from "./utils";

export const ffcFlagsAtom = atom(createFlagsProxy());