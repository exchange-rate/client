import React from 'react';
import './ButtonGroup.sass';

function empty() {
	return null;
}

export function Button({ children, value, onClick = empty, selected = false }) {
	return (
		<button className={ 'button ' + (selected ? '_selected' : '') } onClick={ e => onClick(value) }>
			{ children }
		</button>
	);
}

export function ButtonGroup({ children, selected, onSelect = empty }) {
	const mappedChildren = React.Children.map(children, Button => {
		return React.cloneElement(Button, {
			selected: selected === Button.props.value,
			onClick: onSelect
		});
	});
	return (
		<div className="button-group">
			{ mappedChildren }
		</div>
	);
}
