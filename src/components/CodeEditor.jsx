import { Box, HStack } from "@chakra-ui/react"
import {Editor} from "@monaco-editor/react"
import { useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
    const editorRef = useRef();
    const [value, setValue] = useState(''); //to store the value of code editor i create a state
    const [language, setLanguage] = useState("javascript");

    const onMount = (editor) => {

        editorRef.current = editor;
        editor.focus();

    };

    const onSelect = (language) => {
        setLanguage(language);
        setValue(
            CODE_SNIPPETS[language]
        )
    };
    
    return (
        <Box>
            <HStack spacing={4}>
                <Box w='50%'>

                    <LanguageSelector language={language} onSelect={onSelect} />

                    <Editor 
                        height="75vh"
                        theme="vs-dark"
                        language={language}
                        defaultValue= {CODE_SNIPPETS[language]}
                        onMount={onMount}
                        value={value} // I pass the current value to the editor
                        onChange={(value) => setValue(value)} // to update the value of state on change
                    />
                </Box>
                <Output editorRef={editorRef} language={language}/>
            </HStack>

        </Box>
    );
};

export default CodeEditor;