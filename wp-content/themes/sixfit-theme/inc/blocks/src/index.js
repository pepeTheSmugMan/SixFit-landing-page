// assets/js/blocks.js
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InspectorControls, URLInputButton, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, TextControl } = wp.components;
import { useState } from '@wordpress/element';

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
        title: {
            type: 'string',
            source: 'html',
            selector: 'h2',
        },
        content: {
            type: 'string',
            source: 'html',
            selector: 'p'
        },
        mediaURL: {
            type: 'string',
            default: '',
        },
        mediaID: {
            type: 'number',
        },
        buttonText: {
            type: 'string',
            source: 'html',
            selector: 'a.button',
        },
        buttonURL: {
            type: 'string',
        }
    },
    supports: {
        color: {
            background: true,
            text: true,
        }
    },

    edit({attributes, setAttributes}){
        const blockProps = useBlockProps({className: 'sixfit-hero-wrapper'});
        const { title, content, mediaURL, buttonText, buttonURL } = attributes;

        return (
            <>

            <InspectorControls>
                <PanelBody title="Button Settings" initialOpen={true}>
                    <p><strong>Button URL:</strong></p>
                    <URLInputButton
                        url={buttonURL}
                        onChange={(url) => setAttributes({ buttonURL: url })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <MediaUpload
                    onSelect={(media) => setAttributes({ mediaURL: media.url, mediaID: media.id })}
                    allowedTypes={['image']}
                    render={({ open }) => (
                        <Button onClick={open} variant="secondary">
                            {mediaURL ? 'Change Image' : 'Upload Image'}
                        </Button>
                    )}
                />

                <div className="sixfit-hero-separator"></div> {/*visual separator*/}

                <div className="sixfit-hero-content-wrapper">
                    <RichText
                        tagName="h2"
                        value={title}
                        onChange={(title) => setAttributes({title})}
                        placeholder="add a title..."
                    />
                    <RichText
                        tagName="p"
                        value={content}
                        onChange={(content) => setAttributes({content})}
                        placeholder="add a description..."
                    />

                    <div className="sixfit-hero-button">
                    <RichText
                        tagName="a"
                        className="sixfit-hero-btn"
                        value={buttonText}
                        onChange={(buttonText) => setAttributes({buttonText})}
                        placeholder="Download"
                        allowedFormats={[]} // prevent bold/italic inside button text
                    />
                    </div>
                </div>
            </div>
        </>
        );
    },

    save({attributes}){
        const blockProps = useBlockProps.save({className: 'sixfit-hero-wrapper'});
        const { title, content, mediaURL, buttonText, buttonURL } = attributes;

        return(
            <div {...blockProps}>
                {mediaURL && <img src={mediaURL} alt="sixfit-hero-img"/>}
                <div className="sixfit-hero-separator"></div>
                <div className="sixfit-hero-content-wrapper">
                    <RichText.Content tagName="h2" value={title} />
                    <RichText.Content tagName="p" value={content} />
                    <div className="sixfit-hero-button">
                        {buttonURL && (
                            <a href={buttonURL} className="button">
                                {buttonText}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    }
});



registerBlockType('sixfit/footer-info-block', {
    title: 'Footer info block',
    icon: 'info',
    category: 'layout',
    attributes: {
        title: {
            type: 'string',
            source: 'html',
            selector: 'h3',
        },
        links: {
            type: 'array',
            default: [],
        },
    },

    edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps();
        const { title, links = [] } = attributes;

        const updateLink = (index, field, value) => {
            const newLinks = [...links];
            newLinks[index] = {
                ...newLinks[index],
                [field]: value,
            };
            setAttributes({ links: newLinks });
        };

        const addLink = () => {
            setAttributes({
                links: [...links, { text: '', url: '' }],
            });
        };

        const removeLink = (index) => {
            const newLinks = [...links];
            newLinks.splice(index, 1);
            setAttributes({ links: newLinks });
        };

        return (
            <div {...blockProps} className="footer-info-block">
                <RichText
                    tagName="h3"
                    placeholder="Add title..."
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                />

                {links.map((link, index) => (
                    <div key={index} style={{ marginBottom: '1rem' }}>
                        <TextControl
                            label="Link Text"
                            value={link.text}
                            onChange={(value) => updateLink(index, 'text', value)}
                        />
                        <TextControl
                            label="Link URL"
                            value={link.url}
                            onChange={(value) => updateLink(index, 'url', value)}
                        />
                        <Button
                            isDestructive
                            onClick={() => removeLink(index)}
                            style={{ marginTop: '0.5rem' }}
                        >
                            Remove
                        </Button>
                    </div>
                ))}

                <Button
                    variant="primary"
                    onClick={addLink}
                    style={{ marginTop: '1rem' }}
                >
                    + Add Link
                </Button>
            </div>
        );
    },

    save({ attributes }) {
        const blockProps = useBlockProps.save();
        const { title, links = [] } = attributes;

        return (
            <>
                <RichText.Content tagName="h3" value={title} />
                {links.map((link, index) => (
                    <a key={index} href={link.url}>
                        {link.text}
                    </a>
                ))}
            </>
        );
    },
});