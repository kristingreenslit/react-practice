// Stopped at "Fetching From the Server" Section 

var data = [
   {id: 1, author: "Pete Hunt", text: "This is one comment"},
   {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];


var Comment = React.createClass({
   rawMarkup: function() {  // function to render html tags as HTML 
      var rawMarkup = marked(this.props.children.toString(), {sanitize: true}); 
      return { __html: rawMarkup};  {/* 'sanitize: true' escapes the rendering of any HTML tags (marked library used to convert markdown text to pure HTML) */}
   },

   render: function() {
      return (
         <div className="comment">
            <h2 className="commentAuthor">   {/*data passed in from a parent component is available as a PROPERTY on the child component using THIS.PROPS */}
               {this.props.author} 
            </h2>
            <span dangerouslySetInnerHTML={this.rawMarkup()} />   {/* relies on security of marked library */}
         </div>
      );
   }
});


var CommentBox = React.createClass({
   render: function() {
      return (
         <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.props.data} />
            <CommentForm />
         </div>
      );
   }
});


var CommentList = React.createClass({
   render: function() {
      var commentNodes = this.props.data.map(function(comment) {
         return (
            <Comment author={comment.author} key={comment.id}>
               {comment.text}
            </Comment>
         );
      });
      return (
         <div className="commentList">
            {commentNodes}
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


ReactDOM.render(
   <CommentBox data={data} />,
   document.getElementById('content')
);


// Error resolved by reordering components:
// http://www.wengkien.com/2015/10/30/warning-react-createelement-type-should-not-be-null-undefined-boolean-or-number-it-should-be-a-string-for-dom-elements-or-a-reactclass-for-composite-components/  //







