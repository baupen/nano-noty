declare module 'noty' {
	export = Noty;
}

declare class Noty {
	constructor(options?: Noty.Options);

	/**
	 * Show a NOTY
	 */
	show: () => void;

	/**
	 * Close a NOTY
	 */
	close: () => void;

	/**
	 * Notification text updater. Important: .noty_body class is required for setText API method
	 */
	setText: (text: string, overrideConstructorOption?: true) => void;

	/**
	 * Notification type updater
	 */
	setType: (type: Noty.Type, overrideConstructorOption?: true) => void;

	/**
	 * false (clears timeout) or integer (clears timer, starts for given value)
	 */
	setTimeout: (option: false | number) => void; //

	/**
	 * Clears the timeout
	 */
	stop: () => void;

	/**
	 * Restarts the timeout
	 */
	resume: () => void;

	/**
	 * Without queue name: Closes all notifications
	 * With queue name: Closes all notifications for the named queue
	 */
	static closeAll: () => void;

	/**
	 * Without queue name: Sets the maxVisible notification count for global queue
	 * With parameter: Sets the maxVisible notification count for the named queue
	 */
	static setMaxVisible: (max: number) => void;

	/**
	 * Change default values for new instances of NOTY
	 */
	static overrideDefaults: (obj: { [i: string]: any }) => Noty;
}

declare namespace Noty {
	type Type = 'alert' | 'success' | 'warning' | 'error' | 'info' | 'information';
	type Layout = 'top' | 'topLeft' | 'topCenter' | 'topRight' | 'center' | 'centerLeft' | 'centerRight' | 'bottom' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';

	interface Options {
		type?: Noty.Type;
		layout?: Noty.Layout;
		theme?: string;
		text?: string;
		timeout?: false | number;
		progressBar?: boolean;
		animation?: {
			open?: string | null,
			close?: string | null
		};
		id?: false | string;
		first?: boolean;
		container?: false | string;
	}
}
