import { BuildOptions, Configuration } from "./types/types";
import buildLoaders from "./buildLoaders";
import buildResolve from "./buildResolve";
import buildPlugins from "./buildPlugins";
import { buildDevServer } from "./buildDevServer";
import { EsbuildPlugin } from 'esbuild-loader';

export default function buildWebpack(options: BuildOptions): Configuration
{
    return {
        mode: options.mode,
        entry: options.paths.entry,
        output: {
            path: options.paths.output,
            filename: '[name].[contenthash].js',
            clean: true
        },
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolve(options),
        plugins: buildPlugins(options),
        devServer: buildDevServer(options),
        devtool: 'inline-source-map',
        optimization: {
            minimizer: [
                new EsbuildPlugin({
                    target: 'es2015',
                    css: true
                })
            ]
        }
    }
}