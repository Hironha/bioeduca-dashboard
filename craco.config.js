const CracoAlias = require('craco-alias');
const CracoLessPlugin = require('craco-less');

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							'@primary-color': '#539229',
							'@success-color': '#1a73e8',
							'@warning-color': '#ffbd2e',
							'@error-color': '#ff5f56',
							'@font-size-base': '16px',
							// '@heading-color': rgba(0, 0, 0, 0.85),
							// '@text-color': rgba(0, 0, 0, 0.65),
							// '@text-color-secondary': rgba(0, 0, 0, 0.45),
							// '@disabled-color': rgba(0, 0, 0, 0.25),
							'@border-radius-base': '5px',
							// '@border-color-base': #d9d9d9,
							// '@box-shadow-base': 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
							//   0 9px 28px 8px rgba(0, 0, 0, 0.05),
						},
						javascriptEnabled: true,
					},
				},
			},
		},
		{
			plugin: CracoAlias,
			options: {
				source: 'tsconfig',
				// baseUrl SHOULD be specified
				// plugin does not take it from tsconfig
				baseUrl: './src',
				/* tsConfigPath should point to the file where "baseUrl" and "paths" 
				 are specified*/
				tsConfigPath: './tsconfig.paths.json',
			},
		},
	],
};
