import React from 'react';
import './ButtonGroup.sass';

function empty() {
	return null;
}

export function Button({ children, value, onClick = empty, groupPosition = null, selected = false }) {
	let classNames = ['button'];

	if (selected) {
		classNames.push('_selected');
	}

	switch (groupPosition) {
		case 'first': classNames.push('_first-in-group'); break;
		case 'middle': classNames.push('_middle-in-group'); break;
		case 'last': classNames.push('_last-in-group'); break;
	}

	return (
		<button className={ classNames.join(' ') } onClick={ e => onClick(value) }>
			{ children }
		</button>
	);
}

export function ButtonGroup({ children, selected, onSelect = empty }) {
	const mappedChildren = React.Children.map(children, (Button, i) => {
		let groupPosition;

		if (i === 0) {
			groupPosition = 'first';
		} else if (i === children.length - 1) {
			groupPosition = 'last';
		} else {
			groupPosition = 'middle';
		}

		return React.cloneElement(Button, {
			selected: selected === Button.props.value,
			onClick: onSelect,
			groupPosition
		});
	});
	return (
		<div className="button-group">
			{ mappedChildren }
		</div>
	);
}
