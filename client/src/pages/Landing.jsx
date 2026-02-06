import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import {
    ArrowRight, CheckCircle, BarChart3, Calendar, Users,
    MessageSquare, Mail, Zap, Shield, Sparkles, Star,
    FolderOpen, ChevronRight, Layers, Clock, Target,
    ArrowUpRight, Play, CircleDot, TrendingUp, Bell
} from "lucide-react";

const Landing = () => {
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && user) navigate("/dashboard");
    }, [isLoaded, user]);

    return (
        <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
            {/* ─── NAVBAR ─── */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-zinc-950/60 backdrop-blur-2xl">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                            <Layers className="size-4 text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">Projex</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
                        <a href="#stats" className="hover:text-white transition-colors">Stats</a>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link to="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
                            Log in
                        </Link>
                        <Link to="/dashboard" className="text-sm px-4 py-2 rounded-lg bg-white text-zinc-900 font-medium hover:bg-zinc-200 transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* ─── HERO ─── */}
            <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6">
                {/* Animated background blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-blob" />
                    <div className="absolute top-1/3 -right-32 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] animate-blob" style={{ animationDelay: "2s" }} />
                    <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] animate-blob" style={{ animationDelay: "4s" }} />
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

                <div className="relative max-w-7xl mx-auto">
                    {/* Badge */}
                    <div className="flex justify-center mb-8 animate-fade-in-up">
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur text-sm text-zinc-300">
                            <Sparkles className="size-3.5 text-amber-400" />
                            <span>Now with AI-powered analytics</span>
                            <ChevronRight className="size-3 text-zinc-500" />
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-center text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        The Project Management
                        <span className="block mt-2 bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
                            Your Team Deserves
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-center text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        Streamline workflows, track tasks, and collaborate seamlessly.
                        From planning to delivery, everything in one beautiful workspace.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                        <Link to="/dashboard" className="group flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-sm shadow-[0_0_32px_rgba(59,130,246,0.4)] hover:shadow-[0_0_48px_rgba(59,130,246,0.6)] transition-all hover:scale-105 active:scale-95">
                            Start for Free
                            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#features" className="group flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur text-zinc-300 font-medium text-sm hover:bg-white/10 hover:border-white/20 transition-all">
                            <Play className="size-4" />
                            See How It Works
                        </a>
                    </div>

                    {/* ── APP PREVIEW MOCKUP ── */}
                    <div className="relative mt-20 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                        {/* Glow behind mockup */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-violet-500/5 to-transparent blur-3xl scale-110 pointer-events-none" />

                        <div className="relative mx-auto max-w-5xl rounded-2xl border border-white/10 bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
                            {/* Browser chrome */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-zinc-900/50">
                                <div className="flex gap-1.5">
                                    <div className="size-3 rounded-full bg-red-500/80" />
                                    <div className="size-3 rounded-full bg-yellow-500/80" />
                                    <div className="size-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="px-4 py-1 rounded-md bg-zinc-800 text-xs text-zinc-500 flex items-center gap-2">
                                        <Shield className="size-3" />
                                        projex.app/dashboard
                                    </div>
                                </div>
                            </div>

                            {/* App content */}
                            <div className="flex h-[420px] md:h-[480px]">
                                {/* Mini sidebar */}
                                <div className="hidden sm:flex flex-col w-56 border-r border-white/5 bg-zinc-900/60 p-4">
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="size-7 rounded-md bg-gradient-to-br from-blue-500 to-violet-600" />
                                        <div>
                                            <div className="text-xs font-semibold text-white">Corp Workspace</div>
                                            <div className="text-[10px] text-zinc-500">2 workspaces</div>
                                        </div>
                                    </div>
                                    {[
                                        { icon: "🏠", label: "Dashboard", active: true },
                                        { icon: "📁", label: "Projects", active: false },
                                        { icon: "👥", label: "Team", active: false },
                                        { icon: "⚙️", label: "Settings", active: false },
                                    ].map((item) => (
                                        <div key={item.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs mb-1 ${item.active ? "bg-white/10 text-white" : "text-zinc-500"}`}>
                                            <span className="text-sm">{item.icon}</span>
                                            {item.label}
                                        </div>
                                    ))}

                                    <div className="mt-6 px-3">
                                        <div className="text-[10px] uppercase text-zinc-600 tracking-wider mb-2">Projects</div>
                                        {["LaunchPad CRM", "Brand Identity", "K8s Migration"].map((name) => (
                                            <div key={name} className="flex items-center gap-2 py-1.5 text-xs text-zinc-500">
                                                <div className="size-1.5 rounded-full bg-blue-500" />
                                                <span className="truncate">{name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Main content */}
                                <div className="flex-1 p-6 overflow-hidden">
                                    {/* Top bar */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <div className="text-sm font-semibold text-white">Welcome back, Alex</div>
                                            <div className="text-xs text-zinc-500">Here's what's happening today</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="size-7 rounded-md bg-zinc-800 flex items-center justify-center">
                                                <Bell className="size-3 text-zinc-500" />
                                            </div>
                                            <div className="size-7 rounded-full bg-gradient-to-br from-blue-400 to-violet-500" />
                                        </div>
                                    </div>

                                    {/* Stat cards */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                                        {[
                                            { label: "Total Projects", value: "12", color: "text-blue-400", bg: "bg-blue-500/10" },
                                            { label: "Completed", value: "5", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                                            { label: "My Tasks", value: "8", color: "text-violet-400", bg: "bg-violet-500/10" },
                                            { label: "Overdue", value: "2", color: "text-amber-400", bg: "bg-amber-500/10" },
                                        ].map((stat) => (
                                            <div key={stat.label} className="p-3 rounded-lg border border-white/5 bg-zinc-800/50">
                                                <div className="text-[10px] text-zinc-500 mb-1">{stat.label}</div>
                                                <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Project list preview */}
                                    <div className="rounded-lg border border-white/5 bg-zinc-800/30 overflow-hidden">
                                        <div className="px-4 py-2.5 border-b border-white/5 text-xs text-zinc-400">
                                            Project Overview
                                        </div>
                                        {[
                                            { name: "LaunchPad CRM", status: "Active", progress: 65, color: "bg-emerald-500" },
                                            { name: "Brand Identity", status: "Planning", progress: 25, color: "bg-zinc-500" },
                                            { name: "K8s Migration", status: "Active", progress: 40, color: "bg-emerald-500" },
                                        ].map((proj) => (
                                            <div key={proj.name} className="px-4 py-3 border-b border-white/5 last:border-0 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="text-xs font-medium text-zinc-300">{proj.name}</div>
                                                    <div className={`text-[10px] px-1.5 py-0.5 rounded ${proj.color === "bg-emerald-500" ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-700 text-zinc-400"}`}>
                                                        {proj.status}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-24 h-1.5 rounded-full bg-zinc-800">
                                                        <div className={`h-full rounded-full bg-blue-500`} style={{ width: `${proj.progress}%` }} />
                                                    </div>
                                                    <span className="text-[10px] text-zinc-500 w-8">{proj.progress}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reflection gradient */}
                        <div className="absolute -bottom-20 inset-x-0 h-32 bg-gradient-to-b from-zinc-950/0 to-zinc-950 pointer-events-none" />
                    </div>
                </div>
            </section>

            {/* ─── TRUSTED BY ─── */}
            <section className="relative py-16 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-xs uppercase tracking-[0.2em] text-zinc-600 mb-8">
                        Trusted by teams at innovative companies
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                        {[
                            { name: "Vercel", icon: "▲" },
                            { name: "Stripe", icon: "◈" },
                            { name: "Linear", icon: "◇" },
                            { name: "Notion", icon: "◻" },
                            { name: "Figma", icon: "◎" },
                            { name: "Slack", icon: "◆" },
                        ].map((company) => (
                            <div key={company.name} className="flex items-center gap-2 text-zinc-600 hover:text-zinc-400 transition-colors">
                                <span className="text-lg">{company.icon}</span>
                                <span className="text-sm font-medium tracking-wide">{company.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FEATURES BENTO GRID ─── */}
            <section id="features" className="relative py-24 md:py-32 px-6">
                <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 mb-6">
                            <Zap className="size-3 text-amber-400" />
                            Features
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                            Everything you need to
                            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent"> ship faster</span>
                        </h2>
                        <p className="text-zinc-400 max-w-xl mx-auto">
                            Powerful tools designed to help your team plan, track, and deliver projects without the chaos.
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {/* Feature 1 - Large card spanning 2 cols */}
                        <div className="md:col-span-2 group relative rounded-2xl border border-white/10 bg-zinc-900/50 hover:bg-zinc-900/80 p-8 transition-all duration-300 hover:border-blue-500/30 overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />
                            <div className="relative">
                                <div className="size-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
                                    <FolderOpen className="size-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Smart Task Management</h3>
                                <p className="text-zinc-400 max-w-md mb-6">
                                    Create, assign, and track tasks with priorities, types, statuses, and deadlines.
                                    Filter by assignee, type, or priority. Bulk operations included.
                                </p>
                                {/* Mini task preview */}
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { label: "To Do", count: 5, color: "border-zinc-600" },
                                        { label: "In Progress", count: 3, color: "border-amber-500" },
                                        { label: "Done", count: 8, color: "border-emerald-500" },
                                    ].map((col) => (
                                        <div key={col.label} className={`rounded-lg border-t-2 ${col.color} bg-zinc-800/50 p-3`}>
                                            <div className="text-xs text-zinc-400 mb-1">{col.label}</div>
                                            <div className="text-lg font-bold">{col.count}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="group relative rounded-2xl border border-white/10 bg-zinc-900/50 hover:bg-zinc-900/80 p-8 transition-all duration-300 hover:border-violet-500/30 overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl group-hover:bg-violet-500/10 transition-colors" />
                            <div className="relative">
                                <div className="size-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5">
                                    <Users className="size-6 text-violet-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
                                <p className="text-zinc-400 text-sm">
                                    Invite members to workspaces and projects. Assign roles, set team leads, and manage access control.
                                </p>
                                <div className="flex -space-x-2 mt-6">
                                    {["bg-blue-500", "bg-violet-500", "bg-emerald-500", "bg-amber-500"].map((bg, i) => (
                                        <div key={i} className={`size-8 rounded-full ${bg} border-2 border-zinc-900 flex items-center justify-center text-[10px] font-bold`}>
                                            {["A", "J", "O", "+2"][i]}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="group relative rounded-2xl border border-white/10 bg-zinc-900/50 hover:bg-zinc-900/80 p-8 transition-all duration-300 hover:border-emerald-500/30 overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
                            <div className="relative">
                                <div className="size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                                    <BarChart3 className="size-6 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
                                <p className="text-zinc-400 text-sm">
                                    Bar charts, pie charts, and priority breakdowns. Track completion rates and team performance at a glance.
                                </p>
                                {/* Mini chart */}
                                <div className="flex items-end gap-1.5 mt-6 h-16">
                                    {[40, 65, 30, 80, 55, 90, 45, 70].map((h, i) => (
                                        <div key={i} className="flex-1 bg-emerald-500/20 rounded-t" style={{ height: `${h}%` }}>
                                            <div className="w-full bg-emerald-500 rounded-t h-full opacity-60" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className="group relative rounded-2xl border border-white/10 bg-zinc-900/50 hover:bg-zinc-900/80 p-8 transition-all duration-300 hover:border-cyan-500/30 overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors" />
                            <div className="relative">
                                <div className="size-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                                    <Calendar className="size-6 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Calendar View</h3>
                                <p className="text-zinc-400 text-sm">
                                    Visualize deadlines on a monthly calendar. Spot overdue tasks, plan sprints, and never miss a deadline.
                                </p>
                                {/* Mini calendar */}
                                <div className="grid grid-cols-7 gap-1 mt-6">
                                    {Array.from({ length: 14 }, (_, i) => (
                                        <div key={i} className={`aspect-square rounded text-[8px] flex items-center justify-center ${i === 4 ? "bg-blue-500 text-white" : i === 9 ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-zinc-800/50 text-zinc-600"}`}>
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Feature 5 - Large card spanning 2 cols */}
                        <div className="md:col-span-2 group relative rounded-2xl border border-white/10 bg-zinc-900/50 hover:bg-zinc-900/80 p-8 transition-all duration-300 hover:border-amber-500/30 overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors" />
                            <div className="relative flex flex-col md:flex-row gap-8">
                                <div className="flex-1">
                                    <div className="size-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5">
                                        <MessageSquare className="size-6 text-amber-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Task Discussions & Notifications</h3>
                                    <p className="text-zinc-400 max-w-md">
                                        Comment on tasks in real-time. Get email notifications when assigned a task and reminders on due dates. Stay aligned without leaving the platform.
                                    </p>
                                </div>
                                {/* Mini chat preview */}
                                <div className="flex-1 space-y-3 max-w-xs">
                                    <div className="flex gap-2">
                                        <div className="size-6 rounded-full bg-blue-500 flex-shrink-0" />
                                        <div className="bg-zinc-800 rounded-lg rounded-tl-none px-3 py-2 text-xs text-zinc-300">
                                            Dashboard UI is ready for review
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <div className="bg-blue-600/20 border border-blue-500/20 rounded-lg rounded-tr-none px-3 py-2 text-xs text-blue-300">
                                            Looks great! Let's ship it 🚀
                                        </div>
                                        <div className="size-6 rounded-full bg-violet-500 flex-shrink-0" />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="size-6 rounded-full bg-emerald-500 flex-shrink-0" />
                                        <div className="bg-zinc-800 rounded-lg rounded-tl-none px-3 py-2 text-xs text-zinc-300">
                                            <Mail className="size-3 text-amber-400 inline mr-1" />
                                            Email notification sent to assignee
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── STATS ─── */}
            <section id="stats" className="relative py-24 px-6">
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-blue-950/10 to-zinc-950 pointer-events-none" />

                <div className="relative max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { value: "10K+", label: "Tasks Managed", icon: CheckCircle, color: "text-emerald-400" },
                            { value: "2,500+", label: "Active Teams", icon: Users, color: "text-blue-400" },
                            { value: "99.9%", label: "Uptime", icon: TrendingUp, color: "text-violet-400" },
                            { value: "4.9/5", label: "User Rating", icon: Star, color: "text-amber-400" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center group">
                                <stat.icon className={`size-6 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-zinc-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section id="how-it-works" className="relative py-24 md:py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 mb-6">
                            <Target className="size-3 text-blue-400" />
                            How it Works
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                            Up and running in
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> minutes</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                step: "01",
                                icon: Layers,
                                title: "Create Your Workspace",
                                description: "Sign up and create your team's workspace in seconds. Invite members and set up roles.",
                                color: "blue",
                            },
                            {
                                step: "02",
                                icon: FolderOpen,
                                title: "Plan Your Projects",
                                description: "Create projects, set priorities, assign team leads, add members, and define timelines.",
                                color: "violet",
                            },
                            {
                                step: "03",
                                icon: TrendingUp,
                                title: "Track & Deliver",
                                description: "Monitor progress with analytics, manage tasks on calendars, collaborate with comments.",
                                color: "emerald",
                            },
                        ].map((item, i) => (
                            <div key={item.step} className="relative group">
                                {/* Connector line */}
                                {i < 2 && (
                                    <div className="hidden md:block absolute top-12 -right-3 w-6 border-t border-dashed border-zinc-700" />
                                )}
                                <div className="rounded-2xl border border-white/10 bg-zinc-900/50 hover:bg-zinc-900/80 p-8 h-full transition-all duration-300 hover:border-white/20">
                                    <div className={`text-5xl font-black bg-gradient-to-b from-${item.color}-500/20 to-transparent bg-clip-text text-transparent mb-4`}>
                                        {item.step}
                                    </div>
                                    <div className={`size-10 rounded-lg bg-${item.color}-500/10 border border-${item.color}-500/20 flex items-center justify-center mb-4`}>
                                        <item.icon className={`size-5 text-${item.color}-400`} />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TESTIMONIALS ─── */}
            <section className="relative py-24 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                            Loved by
                            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"> teams everywhere</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                quote: "Projex completely transformed how our engineering team tracks sprints. The analytics alone saved us hours every week.",
                                name: "Sarah Chen",
                                role: "Engineering Lead",
                                avatar: "S",
                                bg: "bg-blue-500",
                            },
                            {
                                quote: "The calendar view and email notifications keep everyone on track. We haven't missed a deadline since switching to Projex.",
                                name: "Marcus Johnson",
                                role: "Product Manager",
                                avatar: "M",
                                bg: "bg-violet-500",
                            },
                            {
                                quote: "Clean UI, powerful features, and the Clerk integration makes onboarding new team members effortless. Best PM tool we've used.",
                                name: "Aisha Patel",
                                role: "Design Director",
                                avatar: "A",
                                bg: "bg-emerald-500",
                            },
                        ].map((testimonial) => (
                            <div key={testimonial.name} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 hover:border-white/20 transition-all">
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="size-4 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-sm text-zinc-300 leading-relaxed mb-6">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className={`size-9 rounded-full ${testimonial.bg} flex items-center justify-center text-sm font-bold text-white`}>
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">{testimonial.name}</div>
                                        <div className="text-xs text-zinc-500">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section className="relative py-24 md:py-32 px-6">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[128px]" />
                </div>

                <div className="relative max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 mb-8">
                        <CircleDot className="size-3 text-emerald-400 animate-pulse" />
                        Free to get started
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        Ready to transform your
                        <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
                            team's workflow?
                        </span>
                    </h2>

                    <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
                        Join thousands of teams shipping better products with Projex. No credit card required.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/dashboard" className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold shadow-[0_0_32px_rgba(59,130,246,0.4)] hover:shadow-[0_0_48px_rgba(59,130,246,0.6)] transition-all hover:scale-105 active:scale-95">
                            Get Started for Free
                            <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>

                    <p className="text-xs text-zinc-600 mt-6">
                        No credit card required · Free forever for small teams
                    </p>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="border-t border-white/5 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="size-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                                    <Layers className="size-4 text-white" />
                                </div>
                                <span className="text-lg font-bold">Projex</span>
                            </div>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                The modern project management platform built for teams that ship.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold mb-4 text-zinc-300">Product</h4>
                            <div className="space-y-2">
                                {["Features", "Pricing", "Changelog", "Docs"].map((link) => (
                                    <a key={link} href="#" className="block text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{link}</a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold mb-4 text-zinc-300">Company</h4>
                            <div className="space-y-2">
                                {["About", "Blog", "Careers", "Contact"].map((link) => (
                                    <a key={link} href="#" className="block text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{link}</a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold mb-4 text-zinc-300">Legal</h4>
                            <div className="space-y-2">
                                {["Privacy", "Terms", "Security"].map((link) => (
                                    <a key={link} href="#" className="block text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{link}</a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
                        <p className="text-xs text-zinc-600">
                            &copy; {new Date().getFullYear()} Projex. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 mt-4 md:mt-0">
                            {["Twitter", "GitHub", "Discord"].map((social) => (
                                <a key={social} href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">{social}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
