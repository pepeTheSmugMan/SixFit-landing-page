const { registerBlockType } = wp.blocks;
const elm = wp.element.createElement;

registerBlockType('sixfit/custom-cta', {
    // built-in attributes
    title: 'Action-abc',
    description: 'desc',
    icon: 'format-image',
    category: 'layout',

    //custom attributes
    attributes: {},

    //custom functions

    //built-in functions
    edit() {
        return elm(
            'div', 
            { classname: 'sixfit-cta-block'}, 
            elm('h1', {}, 'Test')
        )
    },

    save() {}
})