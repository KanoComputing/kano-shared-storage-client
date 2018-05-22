export default () => {
    return {
		name: 'flat-resolve',

		resolveId (importee, importer) {
            if (typeof importer === 'undefined') {
                return null;
            }

            if (importee === '../cross-storage/dist/client.min.js') {
                return './bower_components/cross-storage/dist/client.min.js';
            }
            return null;
        }
	};
}