# react-text-decorator

A React 19 wrapper for the `rough-notation` library with full Next.js 15 compatibility.

---

## Features

- ⚛️ **React 19 & Next.js 15 Compatible**: Built specifically for the latest versions.
- 🔄 **Server-Side Rendering Support**: Works seamlessly with Next.js.
- 🎯 **TypeScript Support**: Full TypeScript definitions included.
- 🎨 **Multiple Annotation Types**: Underline, highlight, box, circle, brackets, strike-through.
- ✅ **Easy to Use**: Simple component API with sensible defaults.
- 🖱️ **Hover Support**: Optional annotation on hover.
- 🔄 **Custom Hook**: Use `useTextNotation` for full control.

---

## Installation

Install the package using your preferred package manager:

```bash
npm install react-text-decorator
# or
yarn add react-text-decorator
# or
pnpm add react-text-decorator
```

---

## Basic Usage

Here’s an example of how to use the `TextNotation` component:

```jsx
import { TextNotation } from 'react-text-decorator';

function MyComponent() {
    return (
        <TextNotation type="underline" show={true} color="red">
            This text will be underlined in red!
        </TextNotation>
    );
}
```

---

## Annotation Types

The following annotation types are supported:

- **underline**: Underline annotation.
- **box**: Box around the element.
- **circle**: Circle around the element.
- **highlight**: Highlight the element with a background.
- **strike-through**: Strike-through the element.
- **crossed-off**: Cross off the element.
- **brackets**: Brackets around the element.

---

## Component API

### `TextNotation` Component

The `TextNotation` component provides a flexible API for annotations:

```tsx
<TextNotation
    type="underline" // Required: The type of annotation
    show={true} // Optional: Whether to show the annotation
    color="#ff6b6b" // Optional: Annotation color
    strokeWidth={2} // Optional: Stroke width
    iterations={2} // Optional: Animation iterations
    animationDuration={800} // Optional: Animation duration in ms
    animationDelay={0} // Optional: Animation delay in ms
    padding={5} // Optional: Padding between element and annotation
    multiline={true} // Optional: Annotate each line separately
    brackets={"left" | "right" | "top" | "bottom"} // Optional: Bracket pair for bracket annotation
    hover={false} // Optional: Show annotation on hover
    className="my-annotation" // Optional: Custom CSS class
    style={{ fontWeight: 'bold' }} // Optional: Inline styles
>
    Your annotated content
</TextNotation>
```

### Props

| Prop               | Type               | Default       | Description                                      |
|--------------------|--------------------|---------------|--------------------------------------------------|
| `type`             | `NotationType`    | –             | The type of annotation to show (required).      |
| `show`             | `boolean`         | `false`       | Whether to show the annotation.                 |
| `color`            | `string`          | `'#000000'`   | The color of the annotation.                    |
| `strokeWidth`      | `number`          | `1`           | The width of the annotation stroke.             |
| `iterations`       | `number`          | `2`           | The number of iterations for the animation.     |
| `animationDuration`| `number`          | `800`         | Animation duration in milliseconds.             |
| `padding`          | `number`          | `5`           | Padding between the element and annotation.     |
| `multiline`        | `boolean`         | `true`        | Annotate each line separately.                  |
| `brackets`         | `"left" | "right" | "top" | "bottom"` | `"left"` | Bracket pair for bracket annotation.            |
| `hover`            | `boolean`         | `false`       | Show annotation on hover.                       |
| `className`        | `string`          | `''`          | Custom CSS class name. ---Fixing This---                         |
| `style`            | `CSSProperties`   | `{}`          | Inline styles.                                  |

---

## Custom Hook

For more control, use the `useTextNotation` hook:

```tsx
import { useTextNotation } from 'react-text-decorator';

function MyComponent() {
    const { ref, annotation, show, hide } = useTextNotation({
        type: 'highlight',
        color: 'yellow',
        animationDuration: 1500,
    });

    return (
        <div>
            <span ref={ref}>This text can be highlighted programmatically</span>
            <button onClick={show}>Show</button>
            <button onClick={hide}>Hide</button>
        </div>
    );
}
```

---

## Server-Side Rendering (SSR)

The library is designed to work seamlessly with Next.js SSR:

```tsx
// pages/index.tsx
import { useState } from 'react';
import { TextNotation } from 'react-text-decorator';

export default function Home() {
    const [show, setShow] = useState(false);

    return (
        <div>
            <TextNotation type="highlight" show={show} color="yellow">
                This will only animate client-side!
            </TextNotation>
            <button onClick={() => setShow(!show)}>
                Toggle Annotation
            </button>
        </div>
    );
}
```

---

Enhance your React and Next.js projects with `react-text-decorator` for beautiful and interactive text annotations!