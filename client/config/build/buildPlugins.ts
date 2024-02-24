import HTMLWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration, BuildOptions } from "./types/types";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ProgressPlugin } from 'webpack';

export default function buildPlugins({ isProd, paths }: BuildOptions): Configuration['plugins']
{
    const plugins: Configuration['plugins'] = [
        new HTMLWebpackPlugin({ template: path.resolve(paths.public, 'index.html'), favicon: path.resolve(paths.public, 'favicon.ico') }),
        new ProgressPlugin()
    ];

    if (isProd)
    {
        plugins.push(
            new MiniCssExtractPlugin()
        );
    }

    return plugins;
}