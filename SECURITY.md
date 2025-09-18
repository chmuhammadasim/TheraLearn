# SECURITY POLICY

Thank you for caring about the security of TheraLearn. We take security seriously and appreciate every report and contribution that helps keep users safe.

---

## ✅ Supported Versions

| Version | Supported Since | Status |
|---------|------------------|--------|
| `main` / current release | March 2025 | **Active** — security fixes will be applied |
| `v1.0.0` | September 2025 | **Maintenance** — receiving only critical security fixes |

Please ensure you are using a supported version; older, unsupported versions may have vulnerabilities that will no longer be patched.

---

## 🛡 Reporting a Vulnerability

If you discover a security issue, please report it responsibly so we can fix it promptly.

**Steps for reporting:**

1. Send an email to **muhammadasimchattha@mail.com** *(replace with your security contact)*  
2. Include:
   - A clear description of the vulnerability (what you did, what happens, and expected behavior)  
   - Steps to reproduce (if possible, proof-of-concept code or screenshots)  
   - Your environment (e.g. browser version, OS, backend version, node version etc.)  
   - Impact assessment (how severe is it in your view)  

3. Do not post the vulnerability on any public forum until a patch has been released and deployed.

4. We aim to acknowledge receipt within **48 hours**, and to issue a fix within **2 weeks** for critical issues (or sooner, where feasible).

---

## 🔐 Security Practices in TheraLearn

Here are the security measures already implemented (or planned) in TheraLearn:

- **Authentication & Authorization**  
  - JWT tokens with expiration for session security  
  - Role-based access control (User / Psychologist / Superadmin)  

- **Password security**  
  - Passwords are hashed using bcrypt (or equivalent strong hash)  

- **Rate limiting**  
  - Endpoints that could be abused (login, password reset, etc.) are rate limited to mitigate brute-force attacks  

- **Input validation & sanitization**  
  - Validate and sanitize all user input (forms, games, blog content)  
  - Prevent injection attacks (NoSQL injection, XSS, etc.)  

- **Security headers & HTTPS**  
  - Use Helmet (or equivalent) to set secure HTTP headers  
  - Enforce HTTPS in production  

- **CORS policy**  
  - Limit to approved origins for front-end clients  

- **Dependency management**  
  - Keep dependencies up to date  
  - Monitor for known vulnerabilities (e.g. via npm audit, GitHub Dependabot)  

- **Data protection**  
  - Sensitive data (passwords, tokens) is encrypted at rest / appropriately hashed  
  - Environment secrets are not committed to source, managed via `.env`, and for production stored securely  

---

## 🛠 What to Do If You Are Affected

If you discover you are using a vulnerable version or your deployment is affected:

- Upgrade to a patched version as soon as available  
- Rotate any compromised secrets (JWT keys, database credentials, email credentials, etc.)  
- Audit logs to identify potential misuse  

---

## 📆 Security Release Process & Timeline

| Severity | Definition | Response Time | Patch Release Time |
|----------|-------------|----------------|----------------------|
| **Critical** | Code execution, data leak, severe auth flaws | Acknowledgment in **24h** | Patch within **72h** |
| **High** | Privilege escalation, major auth problems | Acknowledgment in **48h** | Patch within **1 week** |
| **Medium** | Minor issues with lower impact (e.g. UI vulnerabilities, info disclosure) | Acknowledgment in **72h** | Patch in next scheduled release or sooner if possible |
| **Low** | Cosmetic or unlikely exploit paths | Acknowledgment in **5 business days** | To be prioritized in roadmap / next release |

---

## 🔍 How We Handle Security Reviews

- All pull requests must pass automated tests, including security checks  
- We use static analysis / linting to detect common vulnerabilities  
- We (or contributors) will peer review security-relevant changes (authentication, file uploads, data masking etc.)

---

## 🎯 Disclosure

We follow **coordinated disclosure**, meaning:

- You report issues privately via email  
- We work on a fix, test it thoroughly  
- Once the fix is ready, we publish a public advisory / release notes  
- If you wish to be credited, let us know; we’ll include your name (if you agree)  

---

## 📞 Contact & Acknowledgments

- Security Contact: **muhammadasimchattha@gmail.com**   
- For general questions or reports, you may also open an issue labeled `security` or mailing list as applicable  

Thanks to everyone helping with TheraLearn’s security 👍

---

## 🧪 Disclaimer

This is not legal advice. Use as guidance. You may want to consult a legal professional when defining contracts or liability in your jurisdiction.

