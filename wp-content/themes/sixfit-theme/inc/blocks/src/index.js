// assets/js/blocks.js
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload } = wp.blockEditor;
const { Button } = wp.components;
import { useBlockProps } from '@wordpress/block-editor';

// registerBlockType('namespace/block-name', {
//     title: '',
//     icon: '',
//     category: '',

//     edit(){

//     },

//     save(){

//     }
// });

// hero
registerBlockType('sixfit/hero', {
    title: 'custom-hero',
    icon: 'star-filled',
    category: 'sixfit',
    attributes: {
        content: {
            type: 'string',
            source: 'html',
            selector: 'p'
        },
    },
    supports: {
        color: {
            background: true,
            text: true,
        }
    },

    edit({attributes, setAttributes}){
        const blockProps = useBlockProps();

        return (

            <div {...blockProps}>
                <RichText
                    tagName="p"
                    value={attributes.content}
                    onChangeComplete={(content) => setAttributes({content})}
                    placeholder="Placeholder"
                />
            </div>
        );
    },

    save({attributes}){
        const blockProps = useBlockProps.save();

        return(
            <div {...blockProps}>
                <RichText.Content tagName="p" value={attributes.content} />
            </div>
        );
    }
});