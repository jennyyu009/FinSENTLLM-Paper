## 🎯 Features

- **6 Professional Slides**: Title, Agenda, 3 Content slides, and Conclusion
- **Blue Gradient Theme**: Elegant blue color scheme with gradients
- **Interactive Navigation**:
  - Keyboard controls (← → keys, spacebar, number keys 1-6)
  - Click navigation buttons
  - Slide indicators
- **Responsive Design**: Works perfectly on desktop and mobile
- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Smooth Transitions**: Professional slide transitions and animations

## 📋 Slide Structure

1. **Title Slide**: Main presentation title with subtitle and date
2. **Agenda**: Overview of presentation topics in a grid layout
3. **Key Points & Analysis**: Primary objectives and analysis
4. **Supporting Data**: Research findings and metrics
5. **Strategic Recommendations**: Action items and goals
6. **Conclusion**: Thank you slide with contact information

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

### Build for Production

```bash
npm run build
npm start
```

## ⌨️ Navigation Controls

- **← / →** : Navigate between slides
- **Spacebar** : Next slide
- **1-6** : Jump directly to specific slide
- **Click navigation dots** : Jump to any slide
- **Click arrow buttons** : Previous/Next slide

## 🎨 Customization

### Changing Content

Edit the `slides` array in `app/presentation.tsx`:

```typescript
const slides = [
  {
    id: 1,
    type: "title",
    title: "Your Custom Title",
    subtitle: "Your Subtitle",
    content: "Additional information",
  },
  // ... more slides
];
```

### Styling and Colors

The blue theme colors are defined in `tailwind.config.js`:

```javascript
colors: {
  'blue-primary': '#1e40af',
  'blue-secondary': '#3b82f6',
  'blue-light': '#dbeafe',
  'blue-dark': '#1e3a8a',
  'blue-accent': '#60a5fa',
}
```

Custom slide styles are in `app/globals.css` using Tailwind's `@apply` directive.

## 📁 Project Structure

```
FinSentLLM-PPT/
├── app/
│   ├── globals.css          # Global styles and slide themes
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Main page
│   └── presentation.tsx     # Main presentation component
├── public/                  # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management and effects
- **CSS Gradients** - Beautiful blue gradient backgrounds

## 📱 Responsive Design

The presentation is fully responsive and works great on:

- **Desktop**: Full-screen presentation mode
- **Tablet**: Touch-friendly navigation
- **Mobile**: Optimized layout and controls

## 🎉 Perfect For

- Business presentations
- Project proposals
- Educational content
- Portfolio showcases
- Conference talks
- Client pitches

## 📝 License

This project is open source and available under the MIT License.

---

**Ready to present!** 🎯 Use keyboard arrows or click controls to navigate through your beautiful blue-themed presentation.
