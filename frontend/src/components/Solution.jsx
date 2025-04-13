import React, { useState } from 'react';

const Solution = ({issueId}) => {
    const [solution, setSolution] = useState({
        content: "Fix the database query by adding an index. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatu",
        created_by: "admin@examplkoe.com",
        created_at: "2025-04-07T11:22:33.123Z"
      });
     
  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Solution</h1>
    <p className="text-gray-800 mb-3">
        {solution.content}
    </p>

    <div className="flex justify-between text-xs text-gray-500">
        <span><strong>By:</strong> {solution.created_by}</span>
        <span className="italic">{new Date(solution.created_at).toLocaleString()}</span>
    </div>
    </div>);
};

export default Solution;
