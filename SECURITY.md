# Security Policy

## Supported Versions

We currently support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of Mahidol Event Hub seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please do NOT report security vulnerabilities through public GitHub issues.

Instead, please send an email to [security@mahidol-event-hub.com] (replace with actual email). You should receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include

Please include the requested information listed below (as much as you can provide) to help us better understand the nature and scope of the possible issue:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### Response Process

1. **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 24 hours.

2. **Assessment**: We will assess the vulnerability and determine its impact and severity.

3. **Fix Development**: We will develop a fix for the vulnerability.

4. **Testing**: We will test the fix to ensure it resolves the issue without introducing new problems.

5. **Release**: We will release the fix and notify users through our standard communication channels.

6. **Public Disclosure**: After the fix is released and users have had time to update, we will publicly disclose the vulnerability details.

### Bug Bounty

Currently, we do not offer a monetary reward for security vulnerabilities. However, we will:

- Acknowledge your contribution in our security advisories (if desired)
- Keep you informed about the progress of fixing the issue
- Credit you in our release notes (if desired)

## Security Best Practices for Users

### For Developers
- Keep dependencies up to date
- Use environment variables for sensitive configuration
- Validate all user inputs
- Use HTTPS in production
- Implement proper authentication and authorization
- Regular security audits of code

### For Administrators
- Keep the system updated with latest security patches
- Use strong passwords and enable 2FA where possible
- Monitor logs for suspicious activities
- Backup data regularly
- Restrict access to sensitive areas

## Security Features

Current security measures implemented:

- Input validation and sanitization
- CORS protection
- Helmet.js for security headers
- Rate limiting (planned)
- SQL injection protection (when database is added)
- XSS protection

## Security Updates

Security updates will be released as soon as possible after a vulnerability is confirmed and fixed. Users will be notified through:

- GitHub releases
- Security advisories
- README updates
- Email notifications (if subscribed)

## Contact

For any security-related questions or concerns, please contact:
- Email: [security@mahidol-event-hub.com] (replace with actual email)
- GitHub: Create a private security advisory

Thank you for helping keep Mahidol Event Hub secure!
