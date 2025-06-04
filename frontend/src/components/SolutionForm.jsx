import { useState } from "react";

const SolutionForm = ({issueId}) => {
    
    const [solution, setSolution] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSolutionSubmit = async (e) => {
        // e.preventDefault();
        // if (!solution.trim()) return;
        try { 
            setSubmitting(true);
            const description = solution;
            const res = await fetch(`/api/solution/${issueId}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({description})
            });
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            setSubmitMessage('✅ Solution submitted successfully.');
            setSolution('');
        } catch (err) {
            console.error(err);
            setSubmitMessage('❌ Failed to submit solution.');
        } finally {
            setSubmitting(false);
        }
    };
     
    return(
        <div className="max-w-3xl mx-auto p-6 md:p-8 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Provide a Solution</h2>

        <form onSubmit={handleSolutionSubmit} className="space-y-4">
        <textarea
            className="w-full min-h-[140px] p-4 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your solution here..."
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
        ></textarea>

        <button
            type="submit"
            className="rounded-3xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  text-purple-200 px-5 py-3 transform hover:scale-105 disabled:opacity-50"
            disabled={submitting}
        >
            {submitting ? 'Submitting...' : 'Submit Solution'}
        </button>

        {submitMessage && (
            <div className="text-sm mt-2 text-gray-600 italic">{submitMessage}</div>
        )}
        </form>
    </div>
    )
}

export default SolutionForm;    