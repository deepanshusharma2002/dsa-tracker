import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../styles/problems.css';

const DIFFICULTY_CONFIG = {
    Easy: { class: 'badge-easy', label: 'Easy' },
    Medium: { class: 'badge-medium', label: 'Medium' },
    Hard: { class: 'badge-hard', label: 'Hard' },
};

const ProblemRow = ({ problem, isCompleted, onToggle }) => {
    const [toggling, setToggling] = useState(false);
    const diff = DIFFICULTY_CONFIG[problem.difficulty] || DIFFICULTY_CONFIG.Medium;

    const handleToggle = async () => {
        if (toggling) return;
        setToggling(true);
        await onToggle(problem._id, !isCompleted);
        setToggling(false);
    };

    return (
        <div className={`problem-row ${isCompleted ? 'completed' : ''}`}>
            <div className="problem-check">
                <input
                    type="checkbox"
                    id={`prob-${problem._id}`}
                    checked={isCompleted}
                    onChange={handleToggle}
                    disabled={toggling}
                />
                <label htmlFor={`prob-${problem._id}`} className="custom-checkbox"></label>
            </div>

            <div className="problem-info">
                <h4 className={isCompleted ? 'strikethrough' : ''}>{problem.title}</h4>
                {problem.description && (
                    <p className="problem-desc">{problem.description}</p>
                )}
            </div>

            <div className="problem-meta">
                <span className={`diff-badge ${diff.class}`}>{diff.label}</span>
            </div>

            <div className="problem-links">
                {problem.youtubeLink && (
                    <a
                        href={problem.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-btn youtube"
                        title="Watch on YouTube"
                    >
                        ▶ Video
                    </a>
                )}
                {problem.codingLink && (
                    <a
                        href={problem.codingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-btn code"
                        title="Practice on LeetCode/Codeforces"
                    >
                        {'</>'}  Practice
                    </a>
                )}
                {problem.articleLink && (
                    <a
                        href={problem.articleLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-btn article"
                        title="Read Article"
                    >
                        📄 Article
                    </a>
                )}
            </div>
        </div>
    );
};

const TopicProblemsPage = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();

    const [topic, setTopic] = useState(null);
    const [problems, setProblems] = useState([]);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [problemsRes, progressRes] = await Promise.all([
                    api.get(`/problems/topic/${topicId}`),
                    api.get('/progress'),
                ]);
                setProblems(problemsRes.data);
                setProgress(progressRes.data.progress.map((id) => id.toString()));

                if (problemsRes.data.length > 0) {
                    const topicsRes = await api.get('/problems/topics');
                    const found = topicsRes.data.find((t) => t._id === topicId);
                    setTopic(found || { title: 'Topic' });
                }
            } catch (err) {
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [topicId]);

    const handleToggle = useCallback(async (problemId, markDone) => {
        try {
            if (markDone) {
                await api.post(`/progress/complete/${problemId}`);
                setProgress((prev) => [...prev, problemId]);
            } else {
                await api.delete(`/progress/complete/${problemId}`);
                setProgress((prev) => prev.filter((id) => id !== problemId));
            }
        } catch (err) {
            console.error('Toggle error:', err);
        }
    }, []);

    const filteredProblems = problems.filter((p) => {
        if (filter === 'All') return true;
        if (filter === 'Completed') return progress.includes(p._id);
        if (filter === 'Pending') return !progress.includes(p._id);
        return p.difficulty === filter;
    });

    const completedCount = problems.filter((p) => progress.includes(p._id)).length;

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="problems-page">
            <div className="problems-header">
                <button className="back-btn" onClick={() => navigate('/dashboard')}>
                    ← Back
                </button>
                <div className="topic-title-wrap">
                    <h1>{topic?.title}</h1>
                    <span className="topic-count">
                        {completedCount} / {problems.length} Solved
                    </span>
                </div>
                <div className="topic-progress-wrap">
                    <div className="topic-progress-bar-full">
                        <div
                            className="topic-progress-fill-full"
                            style={{
                                width: `${problems.length ? (completedCount / problems.length) * 100 : 0}%`,
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="filter-tabs">
                {['All', 'Completed', 'Pending', 'Easy', 'Medium', 'Hard'].map((f) => (
                    <button
                        key={f}
                        className={`filter-tab ${filter === f ? 'active' : ''} ${f === 'Easy' ? 'tab-easy' : f === 'Medium' ? 'tab-medium' : f === 'Hard' ? 'tab-hard' : ''
                            }`}
                        onClick={() => setFilter(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="problems-list">
                {filteredProblems.length === 0 ? (
                    <div className="empty-state">No problems match your filter.</div>
                ) : (
                    filteredProblems.map((problem) => (
                        <ProblemRow
                            key={problem._id}
                            problem={problem}
                            isCompleted={progress.includes(problem._id)}
                            onToggle={handleToggle}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TopicProblemsPage;
