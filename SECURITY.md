# 🛡️ Security Policy - PlacementAI

Security and data privacy are paramount for **PlacementAI**. We appreciate your help in keeping our platform safe.

---

## 🔒 Supported Versions

| Version | Supported |
| :--- | :--- |
| `0.1.x` (Current Main) | ✅ Yes |
| `< 0.1.0` | ❌ No |

---

## 🚨 Reporting Vulnerabilities

If you discover a security vulnerability within PlacementAI, please report it privately:

- **Email**: Send vulnerability details to `security@placementai.dev` (or open a confidential issue).
- **Response Time**: You will receive an initial response within 24 hours.
- **Fix Timeline**: Critical security vulnerabilities are patched and deployed within 48 hours.

Please **do not** report security vulnerabilities via public GitHub issues.

---

## 🛡️ Security Best Practices Enforced

1. **Environment Variables**: API keys (`GEMINI_API_KEY`), database credentials (`MONGODB_URI`), and JWT secrets (`JWT_SECRET`) are never committed to version control.
2. **Password Storage**: User passwords are encrypted with `bcryptjs` using 10 salt rounds before database insertion.
3. **Buffer Management**: Uploaded resume documents (`.pdf`, `.docx`) are processed entirely in memory buffers and never written to permanent disk storage.
4. **Injection Prevention**: Input data sanitization and Mongoose parameterized queries protect against NoSQL injection.
