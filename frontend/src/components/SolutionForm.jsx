import { useState } from "react";

const SolutionForm = () => {
    
    const [solution, setSolution] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSolutionSubmit = async (e) => {
        e.preventDefault();
        if (!solution.trim()) return;
    
        try {
            setSubmitting(true);
            await axios.post(`/api/issues/${id}/solution`, {
            solution: solution.trim(),
            });
    
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
            className="w-full min-h-[120px] p-4 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your solution here..."
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
        ></textarea>

        <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition disabled:opacity-50"
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