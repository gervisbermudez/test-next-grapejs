import GrapesJS, { Editor as EditorType } from "grapesjs";
import { Children, useEffect, useState } from "react";

export default function Editor({ children }: any) {
    const [editor, setEditor] = useState<GrapesJS.Editor>();
    const [editorPanelManager, setEditorPanelManager] = useState<any>();
    const [isInitEditor, setIsInitEditor] = useState(false);



    useEffect(() => {
        if (!isInitEditor) {
            const editorInstance = GrapesJS.init({
                container: "#gjs",
                // Disable the storage manager for the moment
                storageManager: false,
                fromElement: true,
                height: "calc(100vh - 40px)",
                panels: {
                    defaults: [
                        {
                            id: "layers",
                            el: ".panel__right",
                            // Make the panel resizable
                            resizable: {
                                maxDim: 350,
                                minDim: 200,
                                tc: 0, // Top handler
                                cl: 1, // Left handler
                                cr: 0, // Right handler
                                bc: 0, // Bottom handler
                                // Being a flex child we need to change `flex-basis` property
                                // instead of the `width` (default)
                                keyWidth: "flex-basis",
                            },
                        },
                        {
                            id: "panel-switcher",
                            el: ".panel__switcher",
                            buttons: [
                                {
                                    id: "show-properties",
                                    active: true,
                                    label: "Properties",
                                    command: "show-properties",
                                    // Once activated disable the possibility to turn it off
                                    togglable: false,
                                },
                                {
                                    id: "show-layers",
                                    active: true,
                                    label: "Layers",
                                    command: "show-layers",
                                    // Once activated disable the possibility to turn it off
                                    togglable: false,
                                },
                                {
                                    id: "show-style",
                                    active: true,
                                    label: "Styles",
                                    command: "show-styles",
                                    togglable: false,
                                },
                            ],
                        },
                    ],
                },
                layerManager: {
                    appendTo: ".layers-container",
                },
                selectorManager: {
                    appendTo: ".styles-container",
                },
                blockManager: {
                    appendTo: "#blocks",
                    blocks: [
                        {
                            id: "listado",
                            label: "Listado",
                            content: '<div>Listado</div>',
                            // @ts-expect-error
                            category: 'Basic',
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
                        {
                            id: "image",
                            label: "Image",
                            // Select the component once it's dropped
                            select: true,
                            // You can pass components as a JSON instead of a simple HTML string,
                            // in this case we also use a defined component type `image`
                            content: { type: "image" },
                            // This triggers `active` event on dropped components and the `image`
                            // reacts by opening the AssetManager
                            activate: true,
                        },
                    ],
                },
                styleManager: {
                    appendTo: ".styles-container",
                    sectors: [
                        {
                            name: 'My sector',
                            properties: ['new-prop'],
                        },
                        {
                            name: "Dimension",
                            open: false,
                            // Use built-in properties
                            buildProps: ["width", "min-height", "padding"],
                            // Use `properties` to define/override single property
                            properties: [
                                {
                                    // Type of the input,
                                    // options: integer | radio | select | color | slider | file | composite | stack
                                    type: "integer",
                                    name: "The width", // Label for the property
                                    property: "width", // CSS property (if buildProps contains it will be extended)
                                    units: ["px", "%"], // Units, available only for 'integer' types
                                    defaults: "auto", // Default value
                                    min: 0, // Min value, available only for 'integer' types
                                },
                            ],
                        },
                        {
                            name: "Extra",
                            open: false,
                            buildProps: ["background-color", "box-shadow", "custom-prop"],
                            properties: [
                                {
                                    id: "custom-prop",
                                    name: "Custom Label",
                                    property: "font-size",
                                    type: "select",
                                    defaults: "32px",
                                    // List of options, available only for 'select' and 'radio'  types
                                    options: [
                                        { value: "12px", name: "Tiny" },
                                        { value: "18px", name: "Medium" },
                                        { value: "32px", name: "Big" },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            });
            editorInstance.Panels.addPanel({
                id: "properties-panel",
                el: ".properties-panel-container",
            });
            editorInstance.Panels.addPanel({
                id: "panel-top",
                el: ".panel__top",
            });
            editorInstance.Panels.addPanel({
                id: "basic-actions",
                el: ".panel__basic-actions",
                buttons: [
                    {
                        id: "visibility",
                        active: true, // active by default
                        className: "btn-toggle-borders",
                        label: "<u>B</u>",
                        command: "sw-visibility", // Built-in command
                    },
                    {
                        id: "export",
                        className: "btn-open-export",
                        label: "Exp",
                        command: "export-template",
                        context: "export-template", // For grouping context of buttons from the same panel
                    },
                    {
                        id: "show-json",
                        className: "btn-show-json",
                        label: "JSON",
                        context: "show-json",
                        command(editor) {
                            editor.Modal.setTitle("Components JSON")
                                .setContent(
                                    `<textarea style="width:100%; height: 250px;">
                          ${JSON.stringify(editor.getComponents())}
                        </textarea>`
                                )
                                .open();
                        },
                    },
                ],
            });
            
            // @ts-expect-error
            editorInstance.DomComponents.addType('my-input-type', {
                // Make the editor understand when to bind `my-input-type`
                isComponent: el => el.tagName === 'INPUT',
              
                // Model definition
                model: {
                  // Default properties
                  defaults: {
                    tagName: 'input',
                    draggable: 'form, form *', // Can be dropped only inside `form` elements
                    droppable: false, // Can't drop other elements inside
                    attributes: { // Default attributes
                      type: 'text',
                      name: 'default-name',
                      placeholder: 'Insert text here',
                    },
                    traits: [
                      'name',
                      'placeholder',
                      { type: 'checkbox', name: 'required' },
                    ],
                  }
                }
              });

            // @ts-expect-error
            const getRowEl = () => editorInstance.getContainer().closest('.editor-row');
            const getLayersEl = (e) => e.querySelector('.layers-container');
            const getStyleEl = (e) => e.querySelector('.styles-container');
            const chageDisplayPropertiesPanelContainer = (display = 'block') => {
                console.log(display);
                // @ts-expect-error
                const lmEl = editorInstance.getContainer().closest('.editor-row').querySelector('.properties-panel-container');
                lmEl.style.display = display;
            }

            editorInstance.on('component:selected', (e) => {
                console.log(e);
                
                console.log('component:selected');
            })

            // Define commands
            editorInstance.Commands.add('show-properties', {
                run: () => {
                    chageDisplayPropertiesPanelContainer();
                },
                stop: () => {
                    chageDisplayPropertiesPanelContainer('none');
                },
            });
            editorInstance.Commands.add('show-layers', {
                run: () => {
                    const lmEl = getLayersEl(getRowEl());
                    lmEl.style.display = '';
                    chageDisplayPropertiesPanelContainer('none');
                },
                stop: () => {
                    const lmEl = getLayersEl(getRowEl());
                    lmEl.style.display = 'none';
                },
            });
            editorInstance.Commands.add('show-styles', {
                run: () => {
                    const smEl = getStyleEl(getRowEl());
                    smEl.style.display = '';
                    chageDisplayPropertiesPanelContainer('none');
                },
                stop: () => {
                    const smEl = getStyleEl(getRowEl());
                    smEl.style.display = 'none';
                },
            });
            setEditor(editorInstance);
            setEditorPanelManager(editorInstance.Panels);
            setIsInitEditor(true);
        }
    }, []);

    console.log({ editor });

    return (
        <div className="editor-main-container">
            <div className="panel__top">
                <div className="panel__basic-actions" />
                <div className="panel__switcher"></div>
            </div>
            <div id="blocks"></div>
            <div className="editor-row">
                <div className="editor-canvas">
                    <div id="gjs"></div>
                </div>
                <div className="panel__right">
                    <div className="properties-panel-container">
                        <span>Panel de Propiedades</span>
                    </div>
                    <div className="layers-container"></div>
                    <div className="styles-container"></div>
                </div>
            </div>
        </div>
    );
}
