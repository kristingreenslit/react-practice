var Comment = React.createClass({
   rawMarkup: function() {  // function to render html tags as HTML 
      var rawMarkup = marked(this.props.children.toString(), {sanitize: true}); 
      return { __html: rawMarkup};  {/*'sanitize: true' escapes the rendering of any HTML tags (marked library used to convert markdown text to pure HTML)*/}
   },
   render: function() {
      return (
         <div className="comment">
            <h2 className="commentAuthor">   {/*data passed in from a parent component is available as a PROPERTY on the child component using THIS.PROPS*/}
               {this.props.author} 
            </h2>
            <span dangerouslySetInnerHTML={this.rawMarkup()} />   {/*relies on security of marked library*/}
         </div>
      );
   }
});


var CommentBox = React.createClass({
   loadCommentsFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({data: data});
      }.bind(this),
        error: function(xhr, status, err) {
         console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
   handleCommentSubmit: function(comment) {
      var comments = this.state.data;
      comment.id = Date.now();  {/*set an id on the comment using Date.now(), to be replaced by id generated from the server*/}
      var newComments = comments.concat([comment]);
      this.setState({data: newComments});
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: function(data) {
          this.setState({data: data});
      }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
   getInitialState: function() {
      return {data: []};
  },
   componentDidMount: function() {
      this.loadCommentsFromServer();
      setInterval(this.loadCommentsFromServer, this.props.pollInterval);
   },
   render: function() {
      return (
         <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.state.data} />
            <CommentForm onCommentSubmit={this.handleCommentSubmit} />
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
   getInitialState: function() {
      return {author: '', text: ''};
   },
   handleAuthorChange: function(e) {
      this.setState({author: e.target.value});
   },
   handleTextChange: function(e) {
      this.setState({text: e.target.value});
   },
  handleSubmit: function(e) {
      e.preventDefault();
      var author = this.state.author.trim();
      var text = this.state.text.trim();
      if (!text || !author) {
      return;
    }
      this.props.onCommentSubmit({author: author, text: text});
      this.setState({author: '', text: ''});
  },
   render: function() {
      return (
         <form className="commentForm" onSubmit={this.handleSubmit}>
            <input
             type="text"
             placeholder="Your name"
             value={this.state.author}
             onChange={this.handleAuthorChange}
            />
            <input
             type="text"
             placeholder="Say something..."
             value={this.state.text}
             onChange={this.handleTextChange}
            />
            <input type="submit" value="Post" />
         </form>
      );
   }
});


ReactDOM.render(
   <CommentBox url="/api/comments" pollInterval={2000} />,
   document.getElementById('content')
);

// Error resolved by reordering components:
// http://www.wengkien.com/2015/10/30/warning-react-createelement-type-should-not-be-null-undefined-boolean-or-number-it-should-be-a-string-for-dom-elements-or-a-reactclass-for-composite-components/  //







