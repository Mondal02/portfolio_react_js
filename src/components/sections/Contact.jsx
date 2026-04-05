import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FiSend,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiAlertCircle,
  FiLinkedin,
} from "react-icons/fi";
import Button from "../ui/Button";
import AnimatedWrapper from "../ui/AnimatedWrapper";
import SectionHeading from "../ui/SectionHeading";

const contactInfo = [
  {
    icon: FiMail,
    label: "Email",
    value: "mondalm946@gmail.com",
    href: "mailto:mondalm946@gmail.com",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "07688082653",
    href: "tel:07688082653",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    value: "Moumita_LinkedIn",
    href: "https://linkedin.com/in/Moumita_LinkedIn",
  },
];

const initialFormState = { name: "", email: "", subject: "", message: "" };

function validateForm(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email";
  }
  if (!data.subject.trim()) errors.subject = "Subject is required";
  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }
  return errors;
}

function FormField({ label, id, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-dark-300 mb-1.5"
      >
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500 flex items-center gap-1"
        >
          <FiAlertCircle className="w-3 h-3" /> {error}
        </motion.p>
      )}
    </div>
  );
}

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const validationErrors = validateForm(formData);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus("sending");

      try {
        await emailjs.sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
          formRef.current,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
        );
        setStatus("sent");
        setFormData(initialFormState);
        setTimeout(() => setStatus("idle"), 5000);
      } catch {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    },
    [formData]
  );

  const inputClasses =
    "w-full px-4 py-2.5 rounded-sm bg-dark-800/60 border border-dark-700 text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-mono text-sm";

  return (
    <section
      id="contact"
      className="py-20 bg-dark-900 dark:bg-dark-950 relative overflow-hidden"
    >
      <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Contact"
          subtitle="Let's build something great together"
          dark
        />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          <AnimatedWrapper animation="fadeRight">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-dark-400 leading-relaxed">
                  I&apos;m open to new opportunities — whether it&apos;s a
                  full-time role, contract work, or an interesting collaboration.
                  Let&apos;s build something great together.
                </p>
                <p className="text-dark-400 leading-relaxed">
                  Reach out via email or connect on LinkedIn. I typically respond
                  within 24 hours.
                </p>
              </div>

              <div className="space-y-3">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === "LinkedIn" ? "_blank" : undefined}
                    rel={item.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 p-4 bg-white/[0.04] border border-white/[0.08] transition-all duration-300 hover:bg-primary-500/10 hover:border-primary-500/30 hover:translate-x-1 relative overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary-500 to-accent-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                    <item.icon className="w-5 h-5 text-accent-400 flex-shrink-0" />
                    <div>
                      <span className="block text-[0.65rem] font-mono text-dark-500 uppercase tracking-widest mb-0.5">
                        {item.label}
                      </span>
                      <span className="text-sm font-mono text-dark-200">
                        {item.value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper animation="fadeLeft" delay={0.2}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-dark-800/40 border border-dark-700/50 p-6 md:p-8 space-y-5"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Name" id="name" error={errors.name}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClasses}
                  />
                </FormField>
                <FormField label="Email" id="email" error={errors.email}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClasses}
                  />
                </FormField>
              </div>

              <FormField label="Subject" id="subject" error={errors.subject}>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={inputClasses}
                />
              </FormField>

              <FormField label="Message" id="message" error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className={`${inputClasses} resize-none`}
                />
              </FormField>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : status === "sent" ? (
                  <>
                    <FiCheckCircle /> Message Sent!
                  </>
                ) : (
                  <>
                    <FiSend /> Send Message
                  </>
                )}
              </Button>

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500 text-center"
                >
                  Something went wrong. Please try again or email me directly.
                </motion.p>
              )}
            </form>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
}
