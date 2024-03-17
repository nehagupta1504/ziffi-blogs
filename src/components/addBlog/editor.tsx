import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { IBlog, Post } from '@/interfaces/blogs.interface';

// Todo change props type to actual type
export default function PostEditor(props:any) {
    const {handleChange, content} = props;
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const log = () => {
    if (editorRef.current) {
    {/* @ts-ignore*/}
      console.log((editorRef.current as Editor)?.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey='2dzb8f8putu2708mzsl5er2tlir114cw36r1eag9oyj2jhgg'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue=""
        init={{
          height: "100%",
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          
        }}
        onEditorChange={(content, editor) => handleChange("content", content)}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}