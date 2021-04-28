import { isEngine, isSafari, Plugin } from '@aomao/engine';
import { CollapseItemProps } from '../collapse/item';
import ToolbarComponent from './component';

type Config = Array<{
	title: React.ReactNode;
	items: Array<Omit<CollapseItemProps, 'engine'> | string>;
}>;
export type Options = {
	config: Config;
};

const defaultConfig: Config = [
	{
		title: '常用',
		items: ['image-uploader', 'codeblock'],
	},
];

class ToolbarPlugin extends Plugin<Options> {
	static get pluginName() {
		return 'toolbar';
	}

	init() {
		super.init();
		this.editor.on('keydown:slash', event => this.onSlash(event));
	}

	onSlash(event: KeyboardEvent) {
		if (!isEngine(this.editor)) return;
		const { change, history } = this.editor;
		let range = change.getRange();
		const block = this.editor.block.closest(range.startNode);
		const text = block.text().trim();
		if (text === '/' && isSafari) {
			block.empty();
		}

		if (
			'' === text ||
			('/' === text && isSafari) ||
			event.ctrlKey ||
			event.metaKey
		) {
			range = change.getRange();
			if (range.collapsed) {
				event.preventDefault();
				history.startCache();
				const data = this.options.config || defaultConfig;
				const card = this.editor.card.insert(
					ToolbarComponent.cardName,
					{
						data,
					},
				);
				this.editor.card.activate(card.root);
				range = change.getRange();
				history.destroyCache();
				//选中关键词输入节点
				const keyword = card.find('.data-toolbar-component-keyword');
				range.select(keyword, true);
				range.collapse(false);
				change.select(range);
			}
		}
	}

	execute(...args: any): void {
		throw new Error('Method not implemented.');
	}
}
export { ToolbarComponent };
export default ToolbarPlugin;