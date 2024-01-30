import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/theme-monokai';
const EditableCodeViewer = ({ initialCode,onCodeChange }) => {
    const [code, setCode] = useState(initialCode);
    useEffect(()=>{
        handleChange(initialCode)
    },[initialCode])
    const handleChange = (newCode) => {
        setCode((newCode));
        if (onCodeChange) {
            onCodeChange(newCode); // Call the callback function with the new code
        }
    };

    return (
        <AceEditor
            mode="rust"
            theme="monokai"
            value={code}
            width='100%'
            height='100%'
            onChange={handleChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: false }}
            fontSize={12}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 4,
            }}
        />
    );
};

export default EditableCodeViewer;
