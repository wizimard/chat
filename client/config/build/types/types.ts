import { Configuration as WebpackConfiguration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export type Configuration = WebpackConfiguration & DevServerConfiguration;

export type BuildMode = 'production' | 'development';

export interface BuildPaths {
    entry: string;
    public: string;
    output: string;
    src: string;
}

export interface BuildOptions {
    mode: BuildMode;
    isDev: boolean;
    isProd: boolean;
    paths: BuildPaths;
    port: number;
}