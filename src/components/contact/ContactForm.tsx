'use client';

import { useState, useCallback } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { shake, durations, easeOut } from '@/lib/motion';
import { SubjectPills } from './SubjectPills';
import { FileDropzone } from './FileDropzone';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', subject: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [files, setFiles] = useState<File[]>([]);

  const validateField = useCallback((field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email';
        break;
      case 'subject':
        if (!value.trim()) return 'Please select a subject';
        break;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 500) return 'Message must be under 500 characters';
        break;
    }
    return undefined;
  }, []);

  const handleBlur = useCallback((field: keyof FormData) => {
    setTouched(prev => new Set(prev).add(field));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  }, [formData, validateField]);

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error on edit if field was touched
    if (touched.has(field)) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  }, [touched, validateField]);

  const validateAll = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let valid = true;
    for (const field of ['name', 'email', 'subject', 'message'] as const) {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        valid = false;
      }
    }
    setErrors(newErrors);
    setTouched(new Set(['name', 'email', 'subject', 'message']));
    return valid;
  }, [formData, validateField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setSubmitState('loading');

    // Simulate API call: 1.2s delay, 10% random failure
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (Math.random() < 0.1) {
      setSubmitState('error');
      return;
    }

    setSubmitState('success');
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFiles([]);
      setTouched(new Set());
      setSubmitState('idle');
    }, 3000);
  };

  const hasError = (field: keyof FormData) => touched.has(field) && errors[field];

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Name */}
      <m.div
        variants={shouldReduceMotion ? undefined : shake}
        animate={hasError('name') ? 'visible' : 'hidden'}
      >
        <label htmlFor="contact-name" className="block text-sm font-medium text-ink mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          className={`w-full px-4 py-3 rounded-2xl border bg-card text-ink text-sm outline-none transition-colors ${
            hasError('name') ? 'border-red-500' : 'border-line focus:border-primary'
          }`}
          placeholder="John Doe"
          disabled={submitState === 'loading'}
        />
        <AnimatePresence>
          {hasError('name') && (
            <m.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.name}
            </m.p>
          )}
        </AnimatePresence>
      </m.div>

      {/* Email */}
      <m.div
        variants={shouldReduceMotion ? undefined : shake}
        animate={hasError('email') ? 'visible' : 'hidden'}
      >
        <label htmlFor="contact-email" className="block text-sm font-medium text-ink mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className={`w-full px-4 py-3 rounded-2xl border bg-card text-ink text-sm outline-none transition-colors ${
            hasError('email') ? 'border-red-500' : 'border-line focus:border-primary'
          }`}
          placeholder="john@example.com"
          disabled={submitState === 'loading'}
        />
        <AnimatePresence>
          {hasError('email') && (
            <m.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.email}
            </m.p>
          )}
        </AnimatePresence>
      </m.div>

      {/* Subject Pills */}
      <div>
        <label className="block text-sm font-medium text-ink mb-2">
          Subject <span className="text-red-500">*</span>
        </label>
        <SubjectPills
          selected={formData.subject}
          onChange={(val) => handleChange('subject', val)}
        />
        <AnimatePresence>
          {hasError('subject') && (
            <m.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.subject}
            </m.p>
          )}
        </AnimatePresence>
      </div>

      {/* Message */}
      <m.div
        variants={shouldReduceMotion ? undefined : shake}
        animate={hasError('message') ? 'visible' : 'hidden'}
      >
        <label htmlFor="contact-message" className="block text-sm font-medium text-ink mb-2">
          Message <span className="text-red-500">*</span>
          <span className="text-muted font-normal ml-2">({formData.message.length}/500)</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          className={`w-full px-4 py-3 rounded-2xl border bg-card text-ink text-sm outline-none transition-colors resize-none ${
            hasError('message') ? 'border-red-500' : 'border-line focus:border-primary'
          }`}
          placeholder="Tell us how we can help..."
          maxLength={500}
          disabled={submitState === 'loading'}
        />
        <AnimatePresence>
          {hasError('message') && (
            <m.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.message}
            </m.p>
          )}
        </AnimatePresence>
      </m.div>

      {/* File Dropzone */}
      <FileDropzone files={files} onChange={setFiles} />

      {/* Submit Button */}
      <div className="pt-2">
        <m.button
          type="submit"
          disabled={submitState === 'loading' || submitState === 'success'}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
            submitState === 'success'
              ? 'bg-green-600 text-white'
              : submitState === 'error'
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-primary text-white hover:bg-primary-hover'
          } disabled:opacity-60 disabled:cursor-not-allowed`}
          whileHover={shouldReduceMotion || submitState === 'loading' ? {} : { scale: 1.02 }}
          whileTap={shouldReduceMotion || submitState === 'loading' ? {} : { scale: 0.98 }}
        >
          {submitState === 'idle' && 'Send Message'}
          {submitState === 'loading' && (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          )}
          {submitState === 'success' && '✓ Message Sent!'}
          {submitState === 'error' && 'Failed — Try Again'}
        </m.button>

        {submitState === 'error' && (
          <p className="text-red-500 text-xs mt-2">
            Something went wrong. Your message was not lost — please try again.
          </p>
        )}
      </div>
    </form>
  );
}
