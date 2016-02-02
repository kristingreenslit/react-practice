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
         Hello world! I sm s CommentList.
         </div>
      );
   }
});

var CommentForm = React.createClass({
   render function() {
      return (
         <div className="commentForm">
         Hello, world! I am a CommentForm.
         </div>
      );
   }
});








