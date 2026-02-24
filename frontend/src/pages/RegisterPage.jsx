import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (form.password.length < 6) return setError('Password must be at least 6 characters.');
        setLoading(true);
        try {
            await register(form.name, form.email, form.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4"
            style={{ background: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)' }}>
            <div className="w-full max-w-md animate-fade-in">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="text-5xl mb-3">⚡</div>
                        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                            Create Account
                        </h1>
                        <p className="text-white/50 text-sm mt-1">Start tracking your DSA journey today.</p>
                    </div>

                    {error && (
                        <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm text-center animate-fade-in">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                            { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
                            { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@example.com' },
                            { label: 'Password', name: 'password', type: 'password', placeholder: 'Min. 6 characters' },
                        ].map(({ label, name, type, placeholder }) => (
                            <div key={name}>
                                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                                    {label}
                                </label>
                                <input
                                    type={type} name={name} value={form[name]} onChange={handleChange}
                                    placeholder={placeholder} required
                                    className="w-full px-4 py-3 rounded-xl bg-white/7 border border-white/10 text-black placeholder-white/30 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/25 transition-all"
                                />
                            </div>
                        ))}
                        <button
                            type="submit" disabled={loading}
                            className="w-full mt-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/30 flex items-center justify-center gap-2"
                        >
                            {loading ? <span className="spinner w-5 h-5" /> : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-white/40 text-sm mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
