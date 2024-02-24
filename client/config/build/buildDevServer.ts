import { BuildOptions, Configuration } from "./types/types";

export function buildDevServer({ port }: BuildOptions): Configuration['devServer']
{
    return {
        port,
        historyApiFallback: true
    }
}