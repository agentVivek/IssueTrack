import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useGetComments, useSendComment } from '../../hooks/useComments';
import Comment from './Comment.tsx';

const Comments = (props: {id: number}) => {
	const {id} = props;
  const [commentText, setCommentText] = useState('');
  const {comments, loading, refetch} = useGetComments(id);
	const {sendComment, sending} = useSendComment();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
		const result = await sendComment(id, commentText);
		if(result){
			refetch();
		}
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <h3 className="text-xl font-bold text-gray-900">
        Comments <span className="text-gray-500 text-lg font-normal">({comments.length})</span>
      </h3>
      {/* Comment List / Empty State */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          // Empty State 
          <div className="bg-gray-100 rounded-xl p-12 flex flex-col items-center justify-center text-center border border-gray-100">
            <MessageSquare className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">
              No comments yet. Be the first to start the discussion.
            </p>
          </div>
        ) : (
          // List of Comments
          comments.map((comment)=>{
            return <Comment comment={comment}/>
          })
        )}
      </div>

      {/* Input Area */}
      <div className="space-y-3">
				<textarea
					rows={3}
					placeholder="Share your thoughts about this issue..."
					className="w-full p-4 border border-gray-200 rounded-lg focus:border-indigo-500 transition-all resize-none text-sm"
					value={commentText}
					onChange={(e) => setCommentText(e.target.value)}
				/>
				<div className="flex justify-between items-center text-xs text-gray-400">
					<span>{commentText.length}/1000 characters</span>
					<button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors active:scale-90"
					disabled={!commentText.trim() || sending}
					>
						{sending ? 'Posting...' : 'Add Comment'}
					</button>
				</div>
			</div>
    </div>
  );
};

export default Comments;