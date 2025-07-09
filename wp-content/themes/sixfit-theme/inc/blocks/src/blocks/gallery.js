const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InspectorControls, URLInputButton, useBlockProps } = wp.blockEditor;
const { Button, PanelBody } = wp.components;

registerBlockType('namespace/sixfit-gallery', {
    title: 'Sixfit gallery',
    icon: 'smiley',
    category: 'sixfit',
    attributes: {
        content: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
        images: {
            type: 'array',
            default: [],
            selector: '.sixfit-gallery img',
            query: {
                url: { type: 'string', source: 'attribute', attribute: 'src'},
                alt: { type: 'string', source: 'attribute', attribute: 'alt'}
            },
        },

    },

    edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({className: 'sixfit-gallery'});
        const { content, images } = attributes;

        const onSelectImages = (media) => {
            const imageList = media.map((img) => ({
                url: img.url,
                alt: img.alt,
            }));
            setAttributes({ images: imageList});
        };

        return (
            <div {...blockProps}>
                <MediaUpload
                    onSelect={onSelectImages}
                    allowedTypes={['image']}
                    multiple
                    gallery
                    render={({ open }) => (
                        <Button onClick={open} variant="secondary">
                            {images.length ? 'Edit Gallery' : 'Add Gallery'} 
                        </Button>
                    )}
                />
                <RichText
                    tagName="p"
                    value={content}
                    onChange={(content) => setAttributes({content})}
                    placeholder="add a description..."
                />
            </div>
        );
    },

    save({ attributes }) {
        const blockProps = useBlockProps.save({className: 'sixfit-gallery'});
        const { content, images } = attributes;

        return (
            <div {...blockProps}>
                <RichText.Content tagName="p" value={content} />
                {images.map((img, i) => (
                    <img key={i} src={img.url} alt={img.alt} />
                ))}
            </div>
        );
    }
});
