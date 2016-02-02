var CommentBox = React.createClass({displayName: 'CommentBox',
	render function() {
		return (
			React.createElement('div', {ClassName: "commentBox"},
				"Hello, world! I am a CommentBox."
			)
		);
	}
});
ReactDOM.render(
	React.createElement(CommentBox, null),
	document.getElementByID('content')
);