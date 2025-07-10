const { registerBlockType } = wp.blocks;
const { MediaUpload, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
import { useState } from '@wordpress/element';

registerBlockType('namespace/sixfit-gallery', {
    title: 'Sixfit gallery',
    icon: 'smiley',
    category: 'sixfit',
    attributes: {
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
        const { images } = attributes;

        const [currentIndex, setCurrentIndex] = useState(0);

        const onSelectImages = (media) => {
            const imageList = media.map((img) => ({
                url: img.url,
                alt: img.alt,
            }));
            setAttributes({ images: imageList});
        };

        return (
            <div {...blockProps} data-gallery>
                <div className="sixfit-gallery-inner">
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
                </div>
            </div>
        );
    },

    save({ attributes }) {
        const blockProps = useBlockProps.save({className: 'sixfit-gallery'});
        const { images } = attributes;

        return (
            <div {...blockProps} data-gallery>
                <div className="sixfit-gallery-inner">
                    {images.map((img, i) => (
                    <img
                        key={i}
                        src={img.url}
                        alt={img.alt}
                        className={i === 0 ? 'active' : ''}
                        data-index={i}
                    />
                    ))}
                </div>
                <button className="sixfit-gallery-prev" aria-label="Previous">‹</button>
                <button className="sixfit-gallery-next" aria-label="Next">›</button>
            </div>
        );
    }
});