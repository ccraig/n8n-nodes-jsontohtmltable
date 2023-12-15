import { IExecuteFunctions } from 'n8n-core';

import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

//import { OptionsWithUri } from 'request';

export class JsonToHtmlTable implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'JsonToHtmlTable',
		name: 'jsonToHtmlTable',
		icon: 'file:jsonToHtmlTable.svg',
		group: ['transform'],
		version: 1,
		description: 'Convert JSON to an HTML Table',
		defaults: {
			name: 'JsonToHtmlTable',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [],
	};
	// The execute method will go here
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		var html = '<table border="1">';
		var headerSet = false;

		for (const item of items) {
			if (!headerSet) {
				html += '<tr>';
				for (let name of Object.keys(item.json)) {
					html += '<th>' + name + '</th>';
				}
				html += '</tr>';
				headerSet = true;
			}

			html += '<tr>';
			for (let name of Object.values(item.json)) {
				html += '<td>' + name + '</td>';
			}
			html += '</tr>';
		}

		html += '</table>';

		return [this.helpers.returnJsonArray({ table: html })];
	}
}
