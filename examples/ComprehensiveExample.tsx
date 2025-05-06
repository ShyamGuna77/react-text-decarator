import React, { useState } from "react";
import { TextNotation, TextNotationGroup, useTextDecorator } from "../src";

const ComprehensiveExample = () => {
  const [showGroup, setShowGroup] = useState(false);
  const [showIndividual, setShowIndividual] = useState(false);

  // Example of using the hook directly
  const {
    ref: customRef,
    show: showCustom,
    hide: hideCustom,
  } = useTextDecorator({
    type: "box",
    color: "#ff6b6b",
    animationDuration: 1500,
    iterations: 3,
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">React Text Decorator Examples</h1>

      {/* Basic Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Basic Annotations</h2>
        <div className="space-y-4">
          <TextNotation type="underline" show={true} color="#ff6b6b">
            This text has a red underline
          </TextNotation>
          <br />
          <TextNotation type="box" show={true} color="#4ecdc4">
            This text is boxed in teal
          </TextNotation>
          <br />
          <TextNotation type="circle" show={true} color="#45b7d1">
            This text is circled in blue
          </TextNotation>
        </div>
      </section>

      {/* Interactive Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Interactive Examples</h2>
        <div className="space-y-4">
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
              onClick={() => setShowIndividual(!showIndividual)}
            >
              Toggle Highlight
            </button>
            <TextNotation
              type="highlight"
              show={showIndividual}
              color="#ffd93d"
              animationDuration={1000}
            >
              Click the button to toggle this highlight
            </TextNotation>
          </div>

          <div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-4"
              onClick={() => {
                showCustom();
                setTimeout(hideCustom, 2000);
              }}
            >
              Show Custom Box
            </button>
            <span ref={customRef}>
              This text has a custom box animation using the hook
            </span>
          </div>
        </div>
      </section>

      {/* Hover Effects */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Hover Effects</h2>
        <div className="space-y-4">
          <TextNotation
            type="strike-through"
            hover={true}
            color="#ff6b6b"
            animationDuration={500}
          >
            Hover over this text to see a strike-through effect
          </TextNotation>
          <br />
          <TextNotation
            type="crossed-off"
            hover={true}
            color="#4ecdc4"
            animationDuration={500}
          >
            Hover over this text to see a crossed-off effect
          </TextNotation>
        </div>
      </section>

      {/* Group Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Group Animation</h2>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowGroup(!showGroup)}
        >
          Toggle Group
        </button>
        <TextNotationGroup show={showGroup}>
          <div className="space-y-4">
            <TextNotation
              type="bracket"
              brackets="left"
              color="#ff6b6b"
              animationDuration={800}
            >
              This is the first item in the group
            </TextNotation>
            <br />
            <TextNotation
              type="bracket"
              brackets="right"
              color="#4ecdc4"
              animationDuration={800}
            >
              This is the second item in the group
            </TextNotation>
            <br />
            <TextNotation
              type="bracket"
              brackets="top"
              color="#45b7d1"
              animationDuration={800}
            >
              This is the third item in the group
            </TextNotation>
          </div>
        </TextNotationGroup>
      </section>

      {/* Custom Styling */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Custom Styling</h2>
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
      </section>

      {/* Multiline Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Multiline Example</h2>
        <TextNotation
          type="box"
          show={true}
          color="#ff6b6b"
          multiline={true}
          style={{ maxWidth: "300px" }}
        >
          This is a multiline text that will be boxed separately for each line.
          The box will adjust to the content of each line individually. This
          demonstrates the multiline feature of the text decorator.
        </TextNotation>
      </section>
    </div>
  );
};

export default ComprehensiveExample;
