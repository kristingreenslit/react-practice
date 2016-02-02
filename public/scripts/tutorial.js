var CommentBox = React.createClass({
   render: function() {
      return (
         <div className="commentBox">
            <h1>Comments</h1>
            <CommentList />
            <CommentForm />
         </div>
      );
   }
});
ReactDom.render(
   <CommentBox />,
   document.getElementById('content')
);



// var CommentBox = React.createClass({displayName: 'CommentBox',
//    render function() {
//       return (
//          React.createElement('div', {ClassName: "commentBox"},
//             "Hello, world! I am a CommentBox."
//          )
//       );
//    }
// });
// ReactDOM.render(
//    React.createElement(CommentBox, null),
//    document.getElementByID('content')
// );

var CommentList = React.createClass({
   render: function() {
      return (
         <div className="commentList">
         Hello world! I am a CommentList.
         </div>
      );
   }
});

var CommentForm = React.createClass({
   render: function() {
      return (
         <div className="commentForm">
         Hello, world! I am a CommentForm.
         </div>
      );
   }
});

var Comment = React.createClass({
   render: function() {
      return (
         <div className="comment">
            <h2 className="CommentAuthor">
               {this.props.author} // access named attributes passed to component as keys //
            </h2>
            {this.props.children} // access nested elements //
         </div>
      );
   }
});







