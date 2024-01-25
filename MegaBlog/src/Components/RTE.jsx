import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
import { Controller } from 'react-hook-form';

function RTE({name, control, label, defaultvalue  = ""}) {
  return (
      <div>
          <div className='w-full'>
              {label && <label className=''>{label}</label>}
              <Controller
                  name={name || 'content'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                      <Editor 
                      apiKey='et5auu1b0ioa9pk6m8hqcfd1d6hsxurt9njus4qzlz9qe888'
                          initialValue={defaultvalue}
                          init={{
                              height: 500,
                              menubar: true,
                              plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                              ],
                              toolbar: 'undo redo | formatselect | ' +
                              'bold italic backcolor | alignleft aligncenter ' +
                              'alignright alignjustify | bullist numlist outdent indent | ' +
                              'removeformat | help',
                              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                          }} 
                          onEditorChange={onChange}
                      />
                  )}


              />
          </div>
      </div>
  )
}

export default RTE