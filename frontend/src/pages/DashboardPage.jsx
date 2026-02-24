import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const DiffBadge = ({ difficulty }) => {
    const cls = difficulty === 'Easy' ? 'badge-easy'
        : difficulty === 'Hard' ? 'badge-hard'
            : 'badge-medium';
    return <span className={cls}>{difficulty}</span>;
};

const ProblemRow = ({ problem, isCompleted, onToggle }) => {
    const [busy, setBusy] = useState(false);

    const handleToggle = async () => {
        if (busy) return;
        setBusy(true);
        await onToggle(problem._id, !isCompleted);
        setBusy(false);
    };

    return (
        <div className={`flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-3 px-4 py-3
        border-b border-white/5 last:border-0 transition-colors duration-200
        ${isCompleted ? 'bg-emerald-500/5' : 'hover:bg-white/[0.03]'}`}>

            <button
                onClick={handleToggle} disabled={busy}
                className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 transition-all duration-200 flex items-center justify-center
          ${isCompleted
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-white/25 bg-white/5 hover:border-emerald-400'
                    } ${busy ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
                title={isCompleted ? 'Mark incomplete' : 'Mark complete'}
            >
                {isCompleted && (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </button>

            <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium transition-all duration-200 ${isCompleted ? 'line-through text-white/35' : 'text-white/90'
                    }`}>
                    {problem.title}
                </p>
                {problem.description && (
                    <p className="text-xs text-white/35 mt-0.5 truncate">{problem.description}</p>
                )}
            </div>

            <DiffBadge difficulty={problem.difficulty} />

            <div className="flex items-center gap-1.5 flex-wrap">
                {problem.youtubeLink && (
                    <a href={problem.youtubeLink} target="_blank" rel="noopener noreferrer" className="link-yt">
                        ▶ Video
                    </a>
                )}
                {problem.codingLink && (
                    <a href={problem.codingLink} target="_blank" rel="noopener noreferrer" className="link-code">
                        {'</>'} Practice
                    </a>
                )}
                {problem.articleLink && (
                    <a href={problem.articleLink} target="_blank" rel="noopener noreferrer" className="link-article">
                        📄 Article
                    </a>
                )}
            </div>
        </div>
    );
};

const TopicCard = ({ topic, progress, onToggle }) => {
    const [open, setOpen] = useState(false);
    const completed = topic.problems.filter(p => progress.includes(p._id)).length;
    const total = topic.problems.length;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    const allDone = pct === 100;

    return (
        <div className={`glass rounded-xl overflow-hidden transition-shadow duration-300 ${open ? 'shadow-lg shadow-violet-500/10' : ''}`}>
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors duration-150 text-left"
            >
                <span className={`text-white/40 transition-transform duration-300 flex-shrink-0 ${open ? 'rotate-90' : ''}`}>
                    ▶
                </span>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-white">{topic.title}</h3>
                        {allDone && <span className="text-xs">✅</span>}
                    </div>
                    <p className="text-xs text-white/40 mt-0.5 truncate hidden sm:block">{topic.description}</p>
                </div>

                <div className="flex-shrink-0 text-right min-w-[90px]">
                    <p className="text-xs font-semibold text-white/60">
                        <span className={allDone ? 'text-emerald-400' : 'text-violet-400'}>{completed}</span>
                        <span className="text-white/30"> / {total}</span>
                    </p>
                    <div className="progress-track mt-1.5 w-20 ml-auto">
                        <div className="progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-[10px] text-white/30 mt-0.5">{pct}%</p>
                </div>
            </button>

            {open && (
                <div className="border-t border-white/5 animate-slide-down">
                    {topic.problems.map(problem => (
                        <ProblemRow
                            key={problem._id}
                            problem={problem}
                            isCompleted={progress.includes(problem._id)}
                            onToggle={onToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [topicsRes, progressRes] = await Promise.all([
                    api.get('/problems/all'),
                    api.get('/progress'),
                ]);
                setTopics(topicsRes.data);
                setProgress(progressRes.data.progress.map(id => id.toString()));
            } catch (err) {
                console.error('Dashboard fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleToggle = useCallback(async (problemId, markDone) => {
        try {
            if (markDone) {
                await api.post(`/progress/complete/${problemId}`);
                setProgress(prev => [...prev, problemId]);
            } else {
                await api.delete(`/progress/complete/${problemId}`);
                setProgress(prev => prev.filter(id => id !== problemId));
            }
        } catch (err) {
            console.error('Toggle error:', err);
        }
    }, []);

    const totalProblems = topics.reduce((s, t) => s + t.problems.length, 0);
    const totalCompleted = topics.reduce(
        (s, t) => s + t.problems.filter(p => progress.includes(p._id)).length, 0
    );
    const overallPct = totalProblems ? Math.round((totalCompleted / totalProblems) * 100) : 0;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0d0d1a]">
                <div className="spinner" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0d0d1a] text-slate-200">

            <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5
          bg-white/[0.03] border-b border-white/[0.06] backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                    <span className="text-2xl">⚡</span>
                    <span className="font-bold text-base text-white hidden sm:block">DSA Tracker</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-white/50 hidden sm:block">👤 {user?.name}</span>
                    <button
                        onClick={() => { logout(); navigate('/login'); }}
                        className="px-3 py-1.5 rounded-lg text-sm font-semibold text-red-400 border border-red-500/25 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="px-6 py-10 text-center"
                style={{ background: 'linear-gradient(160deg,#1a1040 0%,#0d0d1a 80%)' }}>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Welcome back, {user?.name?.split(' ')[0]}! 🚀
                </h1>
                <p className="text-white/45 text-sm mt-1 mb-6">Keep pushing — every solved problem counts.</p>

                <div className="max-w-sm mx-auto glass rounded-2xl px-6 py-5">
                    <div className="flex items-baseline justify-center gap-1 mb-3">
                        <span className="text-5xl font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                            {totalCompleted}
                        </span>
                        <span className="text-2xl text-white/30 font-light"> / {totalProblems}</span>
                        <span className="text-sm text-white/40 ml-2">solved</span>
                    </div>
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${overallPct}%` }} />
                    </div>
                    <p className="text-white/35 text-xs mt-2">{overallPct}% overall complete</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 pb-16">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4 px-1">
                    Topics — click to expand
                </h2>
                <div className="flex flex-col gap-3">
                    {topics.map(topic => (
                        <TopicCard
                            key={topic._id}
                            topic={topic}
                            progress={progress}
                            onToggle={handleToggle}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
