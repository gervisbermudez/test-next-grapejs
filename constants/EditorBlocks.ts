const EditorBlocks = [
  {
    id: "listado",
    label: "Listado",
    content: {
      type: "my-first-block",
    },
    category: "Basic",
  },
  {
    id: "section", // id is mandatory
    label: "<b>Section</b>", // You can use HTML/SVG inside labels
    attributes: { class: "gjs-block-section" },
    content: `<section>
                  <h1>This is a simple title</h1>
                  <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
                </section>`,
  },
  {
    id: "text",
    label: "Text",
    content: '<div data-gjs-type="text">Insert your text here</div>',
  },
];

export default EditorBlocks;
