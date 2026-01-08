import React from 'react';
import type { CommentType } from '../../hooks/useComments';
import { timeAgo } from '../../utils/dateUtils';

interface CommentCardProps{
    comment: CommentType
}

const Comment: React.FC<CommentCardProps> = (props) => {
    const {comment} = props;
    return (
        <div key={comment.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {comment.user.name.charAt(0).toUpperCase()}
            </div>
            <div>
                <span className="font-semibold text-gray-900 block leading-none">{comment.user.name}</span>
                <span className="text-xs text-gray-500">{timeAgo(comment.created_at)}</span>
            </div>
            </div>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap pl-10">{comment.content}</p>
        </div>
    );
};

export default Comment;