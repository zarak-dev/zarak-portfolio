'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import { PROFILE } from '@/data/profile';
import { EASE, fadeRight, fadeUp, stagger, VIEWPORT } from '@/lib/animations';
import { AnimatePresence, motion } from 'framer-motion';

const DETAILS = [
  {
    icon: Mail,
    label: 'Work Email',
    value: PROFILE.workEmail,
    href: `mailto:${PROFILE.workEmail}`,
    isEmail: true,
  },
  {
    icon: Mail,
    label: 'Personal Email',
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    isEmail: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: PROFILE.phone,
    href: PROFILE.phoneHref,
    isEmail: false,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: PROFILE.location,
    href: 'https://www.google.com/maps/search/?api=1&query=Islamabad%2C+Pakistan',
    isEmail: false,
    external: true,
  },
];

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', handle: '/in/zarak-k-757937385', href: PROFILE.linkedin },
  { icon: Github, label: 'GitHub', handle: '/zarak-dev', href: PROFILE.github },
];

const FIELD_CLASS =
  'w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-[15px] text-ink transition-colors placeholder:text-ink-faint focus:border-brand focus:bg-surface focus:outline-none';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailClick = (e: React.MouseEvent, emailAddr: string) => {
    const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      e.preventDefault();
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddr)}`, '_blank');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Try sending via API endpoint first
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (res.ok) {
        setStatus('Message sent successfully! Zarak will get back to you shortly.');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setLoading(false);
        return;
      }
    } catch {
      // API fallback
    }

    // Direct fallback to mailto
    const mailSubject = encodeURIComponent(subject || `Portfolio inquiry from ${name}`);
    const mailBody = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${mailSubject}&body=${mailBody}`;
    setStatus(`Opening email client — you can also reach Zarak directly at ${PROFILE.email}`);
    setLoading(false);
  };

  return (
    <section id="contact" className="bg-surface-2 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s engineer something exceptional."
          description="Open to frontend architecture roles, high-scale React systems, and engineering collaborations. Usually replies within a day."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <motion.div
              className="space-y-3"
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={stagger(0.09)}
            >
              {DETAILS.map((detail) => (
                <motion.a
                  key={detail.label}
                  variants={fadeRight}
                  whileHover={{ x: 4 }}
                  href={detail.href}
                  target={detail.external ? '_blank' : undefined}
                  rel={detail.external ? 'noopener noreferrer' : undefined}
                  onClick={detail.isEmail ? (e) => handleEmailClick(e, detail.value) : undefined}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-brand-line hover:bg-brand-soft/30 cursor-pointer"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <detail.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                        {detail.label}
                      </span>
                      <span className="mt-0.5 block break-words text-[15px] font-semibold text-ink transition-colors group-hover:text-brand">
                        {detail.value}
                      </span>
                    </span>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                    aria-hidden="true"
                  />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className="mt-3 grid gap-3 sm:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={stagger(0.1, 0.15)}
            >
              {SOCIALS.map((social) => (
                <motion.a
                  key={social.label}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-brand-line hover:bg-brand-soft/30 cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <social.icon className="h-5 w-5 text-brand" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-semibold text-ink">{social.label}</span>
                      <span className="block font-mono text-[11px] text-ink-faint">
                        {social.handle}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                    aria-hidden="true"
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col justify-between h-full rounded-2xl border border-line bg-surface p-5 sm:p-7"
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={stagger(0.07, 0.1)}
            >
              <div className="flex flex-col gap-3.5 sm:gap-4 flex-1">
                <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
                  <motion.div variants={fadeUp}>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-[13px] font-semibold text-ink-soft"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your name"
                      className={FIELD_CLASS}
                    />
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-[13px] font-semibold text-ink-soft"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@company.com"
                      className={FIELD_CLASS}
                    />
                  </motion.div>
                </div>

                <motion.div variants={fadeUp}>
                  <label
                    htmlFor="contact-subject"
                    className="mb-1.5 block text-[13px] font-semibold text-ink-soft"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="Role, project or technical inquiry"
                    className={FIELD_CLASS}
                  />
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col flex-1">
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-[13px] font-semibold text-ink-soft"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={3}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Tell me a little about what you’re building or what you need."
                    className={`${FIELD_CLASS} flex-1 min-h-[90px] resize-y`}
                  />
                </motion.div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-1">
                <motion.button
                  variants={fadeUp}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand disabled:opacity-50 sm:w-auto dark:bg-surface-2 dark:text-ink dark:border dark:border-line hover:dark:border-brand hover:dark:text-white cursor-pointer"
                >
                  {loading ? 'Sending...' : 'Send message'}
                  <Send className="h-4 w-4" aria-hidden="true" />
                </motion.button>

                <AnimatePresence>
                  {status ? (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="text-[13px] font-medium text-brand"
                    >
                      {status}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
