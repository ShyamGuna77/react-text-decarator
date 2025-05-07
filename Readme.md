# React Text Decorator

A powerful React wrapper for the `rough-notation` library that provides beautiful hand-drawn annotations for your text. Built with React 19 and Next.js 15 compatibility in mind.

## Features

- 🎨 **Multiple Annotation Types**: Underline, box, circle, highlight, strike-through, crossed-off, and brackets
- 🔄 **Group Animations**: Coordinate multiple annotations with ordered sequences
- 🖱️ **Hover Effects**: Show annotations on hover
- 🎯 **Customizable**: Control colors, animations, and styling
- ⚛️ **React 19 & Next.js 15 Compatible**: Built for the latest versions
- 📦 **TypeScript Support**: Full type definitions included
- 🎭 **Multiple Brackets**: Support for single or multiple bracket positions
- 📝 **Multiline Support**: Annotate each line separately
- 🎮 **Custom Hook**: Use `useTextDecorator` for programmatic control

## Installation

```bash
npm install react-text-decorator
# or
yarn add react-text-decorator
# or
pnpm add react-text-decorator
```

## 🔗 Demo & Source Code

🎯 **Live Demo**:  
Explore all annotation styles and features here:  
👉 [Demo](https://react-text-decorator.vercel.app/)

🧩 **Source Code**:  
You can view and clone the demo project from:  
👉 [GitHub - Source code](https://github.com/ShyamGuna77/decorator-demo)

This demo showcases all core functionalities of `react-text-decorator`, including annotation types, group animations, hover effects, and programmatic control using hooks.

## Basic Usage

```tsx
import { TextNotation } from 'react-text-decorator';

function MyComponent() {
  return (
    <TextNotation type="highlight" show={true} color="#ffd93d">
      This text will be highlighted in yellow!
    </TextNotation>
  );
}
```

## Annotation Types

### Basic Annotations

```tsx
// Underline
<TextNotation type="underline" show={true} color="#ff6b6b">
  This text has a red underline
</TextNotation>

// Box
<TextNotation type="box" show={true} color="#4ecdc4">
  This text is boxed in teal
</TextNotation>

// Circle
<TextNotation type="circle" show={true} color="#45b7d1">
  This text is circled in blue
</TextNotation>

// Highlight
<TextNotation type="highlight" show={true} color="#ffd93d">
  This text is highlighted in yellow
</TextNotation>

// Strike-through
<TextNotation type="strike-through" show={true} color="#ff6b6b">
  This text has a strike-through
</TextNotation>

// Crossed-off
<TextNotation type="crossed-off" show={true} color="#4ecdc4">
  This text is crossed off
</TextNotation>
```

### Multiple Brackets

```tsx
// Single bracket
<TextNotation type="bracket" brackets="left" show={true}>
  This text has a left bracket
</TextNotation>

// Multiple brackets
<TextNotation 
  type="bracket" 
  brackets={["left", "right"]} 
  show={true}
>
  This text has brackets on both sides
</TextNotation>

// All sides
<TextNotation 
  type="bracket" 
  brackets={["left", "right", "top", "bottom"]} 
  show={true}
>
  This text has brackets on all sides
</TextNotation>
```

## Group Animations

```tsx
import { TextNotation, TextNotationGroup } from 'react-text-decorator';

function GroupExample() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(!show)}>
        Toggle Group
      </button>
      
      <TextNotationGroup show={show}>
        <TextNotation
          type="highlight"
          color="#ffd93d"
          order={1}
          animationDuration={500}
        >
          First highlight appears
        </TextNotation>
        
        <TextNotation
          type="box"
          color="#4ecdc4"
          order={2}
          animationDuration={500}
        >
          Then this box appears
        </TextNotation>
        
        <TextNotation
          type="circle"
          color="#ff6b6b"
          order={3}
          animationDuration={500}
        >
          Finally, this circle appears
        </TextNotation>
      </TextNotationGroup>
    </div>
  );
}
```

## Hover Effects

```tsx
<TextNotation 
  type="strike-through" 
  hover={true} 
  color="#ff6b6b"
  animationDuration={500}
>
  Hover over this text to see a strike-through effect
</TextNotation>
```

## Custom Hook

```tsx
import { useTextDecorator } from 'react-text-decorator';

function HookExample() {
  const { ref, show, hide } = useTextDecorator({
    type: 'box',
    color: '#ff6b6b',
    animationDuration: 1500,
    iterations: 3,
  });

  return (
    <div>
      <button onClick={show}>Show</button>
      <button onClick={hide}>Hide</button>
      <span ref={ref}>
        This text can be annotated programmatically
      </span>
    </div>
  );
}
```

## Multiline Support

```tsx
<TextNotation
  type="box"
  show={true}
  color="#ff6b6b"
  multiline={true}
  style={{ maxWidth: "300px" }}
>
  This is a multiline text that will be boxed separately for each line.
  The box will adjust to the content of each line individually.
  This demonstrates the multiline feature of the text decorator.
</TextNotation>
```

## Custom Styling

```tsx
<TextNotation
  type="highlight"
  show={true}
  color="#ffd93d"
  style={{
    fontSize: "1.5rem",
    fontWeight: "bold",
    padding: "0.5rem",
  }}
  className="custom-annotation"
>
  This text has custom styling and a highlight
</TextNotation>
```

## Props

### TextNotation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `NotationType` | `'highlight'` | Type of annotation |
| `show` | `boolean` | `false` | Whether to show the annotation |
| `color` | `string` | `'#000000'` | Color of the annotation |
| `strokeWidth` | `number` | `1` | Width of the stroke |
| `iterations` | `number` | `2` | Number of animation iterations |
| `animationDuration` | `number` | `800` | Duration of animation in ms |
| `animationDelay` | `number` | `0` | Delay before animation starts |
| `padding` | `number` | `3` | Padding around the text |
| `multiline` | `boolean` | `true` | Annotate each line separately |
| `brackets` | `BracketPosition \| BracketPosition[]` | - | Bracket position(s) |
| `order` | `number` | - | Order in group animation |
| `hover` | `boolean` | `false` | Show on hover |
| `className` | `string` | `''` | Custom CSS class |
| `style` | `CSSProperties` | `{}` | Inline styles |

### TextNotationGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `show` | `boolean` | `false` | Whether to show all annotations |
| `children` | `ReactNode` | - | Child components |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [ShyamGuna77](https://github.com/ShyamGuna77)