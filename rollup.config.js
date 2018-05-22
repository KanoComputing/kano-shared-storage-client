import flatResolve from './rollup/flat-resolve.js';

export default [{
    input: 'kano-shared-storage-client.js',
    output: {
        file: 'dist/kano-shared-storage-client.js',
        format: 'umd',
        name: 'Kano.KanoSharedStorageClient',
    },
    plugins: [flatResolve()],
}];
