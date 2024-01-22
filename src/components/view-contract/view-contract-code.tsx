import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust';

// Register the language you need
SyntaxHighlighter.registerLanguage('rust', rust);

interface CodeNode {
    lang: string;
    value: string;
}

interface CodeViewerProps {
    code: CodeNode;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code }) => {
    const style = {
        
        fontSize: '1.6rem',
        overflow: 'auto', // Enables scrolling
        maxHeight: '400px', // Maximum height before scrolling, adjust as needed
        maxWidth: '100%', // Maximum width, adjust as needed
    };
    return (
        <div style={style}>
            <SyntaxHighlighter style={vscDarkPlus} language={code.lang}>
                {code.value}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeViewer;
