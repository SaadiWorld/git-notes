interface IGistFileProps {
  fileIndex: number;
  fileName?: string;
  content?: string;
  showDeleteBtn: boolean;
  handleFileChange: (filename: string, value: string, index: number) => void;
  handleFileRemoval: (index: number) => void;
}


function GistFile({ fileIndex, fileName, content, showDeleteBtn, handleFileChange, handleFileRemoval }: IGistFileProps) {
  return (
    <div data-testid="file-form" className="p-4 mb-10 rounded-md border-gray-400 border-solid border-[1px]">
      <input
        name="filename"
        role="text"
        type='text'
        placeholder="Filename including extension..."
        className="input input-bordered w-full mb-3"
        value={fileName}
        onChange={(e) => handleFileChange(e.target.name, e.target.value, fileIndex)}
      />
      <textarea
        rows={10}
        name="content"
        placeholder="Content..."
        className="textarea textarea-bordered textarea-md w-full mb-3"
        value={content}
        onChange={(e) => handleFileChange(e.target.name, e.target.value, fileIndex)}
      />
      {showDeleteBtn &&
        <div className='flex justify-end'>
          <button type='button' className='btn btn-sm bg-red-700 text-white border-none' onClick={() => handleFileRemoval(fileIndex)}>Delete</button>
        </div>
      }
    </div>
  )
}

export default GistFile