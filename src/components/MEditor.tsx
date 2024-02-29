import React from 'react';
import { Editor, EditorProps } from 'react-draft-wysiwyg';

const MEditor = (props: EditorProps) => {
	return (
		<Editor
			wrapperStyle={{ border: '1px solid #000' }}
			editorStyle={{ padding: '0px 12px', maxHeight: 300 }}
			{...props}
		/>
	);
};

export default MEditor;
