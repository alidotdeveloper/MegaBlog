import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
import { Controller } from 'react-hook-form';

function RTE({name, control, label, defaultvalue  = ""}) {
  return (
      <div>
          <div className='w-full'>
              {label && <label className='text-sm text-gray-600'>{label}</label>}
              <Controller
                  name={name || 'content'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                      <Editor 
                          initialValue={defaultvalue}
                          value={value ?? ''}
                          init={{
                              height: 500,
                              menubar: true,
                              plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
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