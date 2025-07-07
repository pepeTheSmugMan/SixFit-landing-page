const { registerBlockType } = wp.blocks;

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
        return wp.element.createElement(
            'div', {}, 
            wp.element.createElement('h1', {}, 'Test')
        )
    },

    save() {}
})