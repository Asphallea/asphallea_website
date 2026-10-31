import { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUseCase?: string;
}

const FORMSPREE_ENDPOINT = import.meta.env?.VITE_WAITLIST_API || 'https://formspree.io/f/xljjwzln';

export function DemoRequestModal({ isOpen, onClose, initialUseCase = '' }: DemoRequestModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    useCase: initialUseCase,
    context: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialUseCase && !formData.useCase) {
      setFormData((prev) => ({ ...prev, useCase: initialUseCase }));
    }
  }, [initialUseCase]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim() || !formData.useCase.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      // 1. Store lead in localStorage securely
      const existingLeads = JSON.parse(localStorage.getItem('asphallea_demo_requests') || '[]');
      const newLead = {
        ...formData,
        id: `lead_${Date.now()}`,
        submittedAt: new Date().toISOString(),
      };
      existingLeads.push(newLead);
      localStorage.setItem('asphallea_demo_requests', JSON.stringify(existingLeads));

      // 2. Dispatch to Formspree endpoint with JSON AJAX
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          useCase: formData.useCase,
          context: formData.context,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        if (data && data.errors && Array.isArray(data.errors)) {
          const msg = data.errors.map((e: any) => `${e.field ? e.field + ': ' : ''}${e.message}`).join(', ');
          throw new Error(msg || 'Form validation error. Please check your inputs.');
        } else if (data && data.error) {
          throw new Error(data.error);
        }
        throw new Error('Form service temporarily unavailable. Please try again or reach out directly.');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Unable to submit request. Your input was preserved; please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setError(null);
    setFormData({
      name: '',
      email: '',
      company: '',
      useCase: '',
      context: '',
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
    >
      <div className="relative w-full max-w-lg code-window rounded-xl border border-white/15 p-6 md:p-8 shadow-2xl bg-[#161B20] text-on-surface">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 text-on-surface-variant hover:text-white p-1 rounded-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 id="demo-modal-title" className="font-headline-md text-xl text-on-background font-semibold">
              Technical Demo Requested
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm">
              Thank you, {formData.name}. We have received your details for{' '}
              <span className="text-white font-medium">{formData.company}</span>. An engineer on our team will review your agent use case and follow up with a calendar invitation.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded btn-primary font-mono-eyebrow text-xs uppercase font-bold tracking-wider"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs font-mono-eyebrow bronze-text uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                COMMERCIAL EVALUATION
              </div>
              <h3 id="demo-modal-title" className="font-headline-md text-xl text-on-background font-bold">
                Book a technical demo &amp; evaluation
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Discuss your agent architecture, review real containment boundaries, and evaluate Asphallea for your engineering team.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 p-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-200 text-xs"
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="demo-name" className="text-xs font-mono-eyebrow text-on-surface-variant">
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="demo-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Chen"
                    className="bg-surface-container-high/80 border border-white/10 rounded px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="demo-company" className="text-xs font-mono-eyebrow text-on-surface-variant">
                    Company <span className="text-primary">*</span>
                  </label>
                  <input
                    id="demo-company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="bg-surface-container-high/80 border border-white/10 rounded px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="demo-email" className="text-xs font-mono-eyebrow text-on-surface-variant">
                  Work or Contact Email <span className="text-primary">*</span>
                </label>
                <input
                  id="demo-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@acme.com or alex.personal@gmail.com"
                  className="bg-surface-container-high/80 border border-white/10 rounded px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                />
                <span className="text-[10px] text-on-surface-variant/70">
                  Early teams and independent builders are welcome to use personal addresses.
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="demo-usecase" className="text-xs font-mono-eyebrow text-on-surface-variant">
                  Agent use case or current deployment <span className="text-primary">*</span>
                </label>
                <input
                  id="demo-usecase"
                  name="useCase"
                  type="text"
                  required
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  placeholder="e.g. Coding agent CLI, MCP data analysis, internal customer support agent"
                  className="bg-surface-container-high/80 border border-white/10 rounded px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="demo-context" className="text-xs font-mono-eyebrow text-on-surface-variant">
                  Additional context <span className="text-on-surface-variant/60">(Optional)</span>
                </label>
                <textarea
                  id="demo-context"
                  name="context"
                  rows={2}
                  value={formData.context}
                  onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                  placeholder="Specific tool surfaces (MCP, LangChain, custom subprocesses), security concerns, or target timeline."
                  className="bg-surface-container-high/80 border border-white/10 rounded px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-on-surface-variant/70">
                  Direct evaluation with the core engineering team.
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded btn-primary font-mono-eyebrow text-xs uppercase font-bold tracking-wider flex items-center gap-2 hover:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
