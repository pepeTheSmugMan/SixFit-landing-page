const { registerBlockType } = wp.blocks;
const { RichText, useBlockProps } = wp.blockEditor;
const { Button, TextControl } = wp.components;

registerBlockType('sixfit/footer-info-block', {
    title: 'Footer info block',
    icon: 'info',
    category: 'sixfit',
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
            <div {...blockProps}>
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