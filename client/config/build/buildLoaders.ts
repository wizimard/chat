import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default function buildLoaders({ isDev }: BuildOptions): ModuleOptions['rules']
{
    const svgLoader = {
        test: /\.svg$/i,
        use: [{
            loader: '@svgr/webpack',
            options: { icon: true }
        }],
    };

    const fileLoader = {
        test: /\.(png|jpe?g)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const styleLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
                    }
                }
            },
            'sass-loader',
        ]
    };

    const esbuildLoader = {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
            target: 'es2015'
        }
    }

    return [
        fileLoader,
        styleLoader,
        esbuildLoader,
        svgLoader
    ];
}