'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check, Send, ArrowUpRight, Sparkles, Building2, Loader2, AlertCircle } from 'lucide-react';
import { IDENTITY } from '@/data/identity';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(key);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSentMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSentMessage(
          data.needsActivation
            ? "Form activation required — check zarak.dev@gmail.com inbox."
            : "Email sent successfully!"
        );
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.error || 'Failed to send message.');
      }
    } catch (err: unknown) {
      // Fallback directly to mailto
      const mailtoSubject = encodeURIComponent(form.subject || `Inquiry from ${form.name}`);
      const mailtoBody = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
      window.location.href = `mailto:${IDENTITY.contacts.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
      setSentMessage("Email client opened.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-28 md:py-36 px-4 sm:px-6 lg:px-12 border-b border-border/70 relative z-10"
    >
      <div className="container mx-auto">
        {/* Section Lead */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>// 08 — Direct Communication Channels</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight">
            Let&apos;s build something worth opening twice.
          </h2>
          <p className="font-sans text-muted-foreground text-base sm:text-lg mt-4 leading-relaxed">
            Whether discussing modern frontend architecture, Next.js engineering, or full-time opportunities, my inbox is open.
          </p>
        </motion.div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          {/* Left Column: Direct Links & Copy Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Primary Email */}
            <div className="p-5 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md shadow-xs glow-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-accent" /> Primary Email
                </span>
                <button
                  onClick={() => copyToClipboard(IDENTITY.contacts.email, 'primary')}
                  className="p-1 rounded text-muted-foreground hover:text-accent font-mono text-xs flex items-center gap-1 transition-colors"
                  aria-label="Copy primary email"
                >
                  {copiedEmail === 'primary' ? (
                    <Check className="w-3.5 h-3.5 text-accent" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span className="text-[10px]">{copiedEmail === 'primary' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <a
                href={`mailto:${IDENTITY.contacts.email}`}
                className="font-mono text-sm sm:text-base text-foreground font-semibold hover:text-accent transition-colors block truncate"
              >
                {IDENTITY.contacts.email}
              </a>
            </div>

            {/* Professional Smart Forum Email */}
            <div className="p-5 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md shadow-xs glow-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Work / Professional Email
                </span>
                <button
                  onClick={() => copyToClipboard(IDENTITY.contacts.workEmail, 'work')}
                  className="p-1 rounded text-muted-foreground hover:text-accent font-mono text-xs flex items-center gap-1 transition-colors"
                  aria-label="Copy professional email"
                >
                  {copiedEmail === 'work' ? (
                    <Check className="w-3.5 h-3.5 text-accent" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span className="text-[10px]">{copiedEmail === 'work' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <a
                href={`mailto:${IDENTITY.contacts.workEmail}`}
                className="font-mono text-sm sm:text-base text-foreground font-semibold hover:text-accent transition-colors block truncate"
              >
                {IDENTITY.contacts.workEmail}
              </a>
            </div>

            {/* Social Cards: LinkedIn & GitHub */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={IDENTITY.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-border/80 bg-card/70 hover:border-accent/60 transition-all font-mono text-xs flex flex-col justify-between gap-3 group"
              >
                <div className="flex items-center justify-between text-muted-foreground group-hover:text-foreground">
                  <Github className="w-5 h-5 text-accent" />
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-foreground block">GitHub</span>
                  <span className="text-[10px] text-muted-foreground">@{IDENTITY.contacts.githubUsername}</span>
                </div>
              </a>

              <a
                href={IDENTITY.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-border/80 bg-card/70 hover:border-accent/60 transition-all font-mono text-xs flex flex-col justify-between gap-3 group"
              >
                <div className="flex items-center justify-between text-muted-foreground group-hover:text-foreground">
                  <Linkedin className="w-5 h-5 text-cyan-400" />
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-foreground block">LinkedIn</span>
                  <span className="text-[10px] text-muted-foreground">Connect Profile</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Dispatcher Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-border/90 bg-card/80 backdrop-blur-xl shadow-xl glow-border">
            <h3 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
              <Send className="w-4 h-4 text-accent" />
              Send Message
            </h3>

            <AnimatePresence>
              {sentMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-5 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-start gap-3 shadow-md"
                >
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-emerald-400">{sentMessage}</p>
                  </div>
                </motion.div>
              )}

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-5 p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 font-mono text-xs flex items-start gap-3 shadow-md"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-rose-400 mb-0.5">Delivery Issue</p>
                    <p className="text-[11px] text-rose-300/90 leading-relaxed">{errorMessage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSend} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-muted-foreground">sender_name</label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full h-11 px-3.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-hidden focus:border-accent disabled:opacity-60 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-muted-foreground">sender_email</label>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full h-11 px-3.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-hidden focus:border-accent disabled:opacity-60 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-muted-foreground">subject</label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Frontend Engineering Opportunity"
                  className="w-full h-11 px-3.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-hidden focus:border-accent disabled:opacity-60 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-muted-foreground">message</label>
                <textarea
                  required
                  rows={4}
                  disabled={isSubmitting}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the role, project scope, or technical challenges..."
                  className="w-full p-3.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-hidden focus:border-accent resize-none font-sans text-sm disabled:opacity-60 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-mono text-xs font-semibold hover:bg-accent/90 disabled:opacity-60 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>$ transmitting_payload...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>$ dispatch_message()</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
