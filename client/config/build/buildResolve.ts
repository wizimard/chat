import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export default function buildResolver({ paths }: BuildOptions): Configuration['resolve']
{
    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': paths.src
        }
    }
}