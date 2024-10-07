import React, { useState, useEffect } from 'react';
import { getComments, addComment } from '../API-Services/Api';

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments(videoId);
      setComments(data);
    };

    fetchComments();
  }, [videoId]);

  const handleAddComment = async () => {
    if (commentText.trim()) {
      await addComment(videoId, commentText);
      setCommentText('');
      const updatedComments = await getComments(videoId);
      setComments(updatedComments);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <div className="add-comment">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Submit</button>
      </div>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p>{comment.text}</p>
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
