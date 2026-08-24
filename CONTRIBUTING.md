# 🤝 Contributing to PlacementAI

Thank you for your interest in contributing to **PlacementAI**! We welcome contributions from developers of all skill levels.

---

## 📜 Code of Conduct

- **Respect**: Maintain a polite, welcoming environment for everyone.
- **Constructive Feedback**: Offer encouraging and actionable feedback during code reviews.
- **Focus**: Keep discussions relevant to improving placement preparation features.

---

## 🌿 Git Branch & PR Workflow

1. **Fork the Repository**: Create your own copy of the repository on GitHub.
2. **Clone Locally**:
   ```bash
   git clone https://github.com/MonuGurjar/AI-Placement-Preparation-Platform.git
   cd AI-Placement-Preparation-Platform
   ```
3. **Create a Feature Branch**:
   ```bash
   # For new features
   git checkout -b feat/your-feature-name

   # For bug fixes
   git checkout -b fix/issue-description

   # For documentation updates
   git checkout -b docs/update-readme
   ```
4. **Commit Message Format**:
   Follow conventional commits:
   - `feat: add PDF resume preview modal`
   - `fix: resolve React 19 hydration warning on dashboard`
   - `docs: update API endpoints table`
5. **Verify Build**:
   Before submitting your PR, ensure the project builds with 0 errors:
   ```bash
   npm run build
   ```
6. **Submit Pull Request**: Push your branch to GitHub and submit a Pull Request against the `main` branch.

---

## 🎨 Code Style Guidelines

- **TypeScript**: Use strict typing and avoid explicit `any` types.
- **React Components**: Keep components functional and modular.
- **Styling**: Utilize CSS variables defined in `src/app/globals.css` for consistent dark glassmorphism styling.
- **Imports**: Group imports logically (React -> Framework/Libraries -> Internal Components -> Styles).
