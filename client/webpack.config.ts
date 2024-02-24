import { BuildMode, BuildOptions, Configuration } from "./config/build/types/types";
import path from 'path';
import buildWebpack from "./config/build/buildWebpack";

interface EnvVariables {
    mode: BuildMode;
    port: number;
}

export default function(env: EnvVariables): Configuration
{
    const mode = env.mode ?? 'development';

    const paths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        public: path.resolve(__dirname, 'public'),
        output: path.resolve(__dirname, 'build'),
        src: path.resolve(__dirname, 'src')
    };

    const options: BuildOptions = {
        mode,
        isDev: mode === 'development',
        isProd: mode === 'production',
        paths,
        port: env.port ?? 8004
    } 
    const config: Configuration = buildWebpack(options);

    return config;
}