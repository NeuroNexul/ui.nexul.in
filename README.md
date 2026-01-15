# Nexul UI

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**A collection of complex, reusable React components built on top of Shadcn UI**

[Documentation](https://ui.nexul.in) · [Components](#components) · [Getting Started](#getting-started)

</div>

---

## ✨ What is Nexul UI?

Nexul UI is **not** another custom component library to showcase design skills. Instead, it's a curated collection of **complex and reusable components** that solve real UX challenges—components that are often difficult and time-consuming to build from scratch.

### Key Features

- 🎨 **Built on Shadcn UI** — Leverages Shadcn's design system and distribution model
- 📦 **Copy-paste Components** — All code lives in your project for full customization
- 🔧 **Minimal Styling** — Functional and accessible by default, style with Tailwind or your preferred method
- ⚡ **React 19 & Next.js 16** — Built with the latest React and Next.js features
- 📝 **TypeScript First** — Full type safety out of the box
- 🌐 **RSC Compatible** — Supports React Server Components

## 📚 Components

### Layout Components

| Component | Description |
|-----------|-------------|
| **Masonry Row Grid** | A responsive masonry layout with justified or naive algorithms for optimal item placement |

### Art & Visual Components

| Component | Description |
|-----------|-------------|
| **SVG Particles** | Interactive particle system that renders SVG paths with mouse-driven scatter/spill effects |

### Base UI Components

Built on Radix UI primitives with Shadcn styling:

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A project using React 18+ and Tailwind CSS
- Shadcn UI configured in your project

### Installation

Nexul UI uses the Shadcn CLI for component installation. Add the Nexul registry to your `components.json`:

```json
{
  "registries": {
    "@nexul": "https://ui.nexul.in/r/{name}.json"
  }
}
```

Then install components using:

```bash
npx shadcn@latest add @nexul/masonry-row
npx shadcn@latest add @nexul/svg-particles
```

## 🛠️ Development

### Clone and Install

```bash
git clone https://github.com/NeuroNexul/ui.nexul.in.git
cd ui.nexul.in
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Build Registry

```bash
npm run registry:build
```

## 📁 Project Structure

```
ui.nexul.in/
├── app/                   # Next.js App Router pages
│   ├── docs/              # Documentation pages
│   └── api/               # API routes
├── components/
│   ├── ui/                # Base UI components
│   ├── mdx/               # MDX-specific components
│   └── extras/            # Additional utilities
├── content/docs/          # MDX documentation content
├── registry/              # Component registry source
│   ├── art/               # Visual/artistic components
│   └── layouts/           # Layout components
├── lib/                   # Utility functions
└── public/r/              # Built registry JSON files
```

## 🧰 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router & Turbopack
- **UI Primitives:** [Radix UI](https://www.radix-ui.com/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Documentation:** [Fumadocs](https://fumadocs.vercel.app/)
- **Component System:** [Shadcn UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Code Highlighting:** [Shiki](https://shiki.style/)

## ⚠️ Disclaimer

> Nexul UI is a **personal project** and is not meant to be actively maintained or widely used. It serves as a collection of components for personal applications.
>
> You can use it without any restrictions, but please be aware that it may not receive regular updates or support. Feel free to [contact me](https://www.nexul.in) if you encounter any issues.
>
> — [Arif Sardar](https://www.nexul.in)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by [NeuroNexul](https://www.nexul.in)

</div>
