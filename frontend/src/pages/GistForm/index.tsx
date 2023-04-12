import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../../components/Alerts/GenericAlert';
import GistFile from '../../components/GistFile';
import Loader from '../../components/Loader';
import useScrollPosition from '../../hooks/useScrollPosition';
import { useAppDispatch } from '../../store';
import { getAppMessage, getIsAppError, getIsAppLoading, getSelectedGistDescription, getSelectedGistFiles, getSelectedGistFilesArray, getSelectedGistId } from '../../store/selectors/app';
import { resetSelectedGist } from '../../store/slices/app';
import { createGist, fetchSingleGist, updateGist } from '../../store/thunks/app';
import { IContent, IFiles } from '../../store/types/app';
import { ALERT_VARIANTS } from '../../types/common';
import { getRandomFileName, isEverythingUnique } from '../../utils/functions';

export interface ICreateGistLocalState {
  description?: string;
  public: boolean;
  files: IContent[];
}

function GistForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const selectedGistId = useSelector(getSelectedGistId);
  const selectedGistDescription = useSelector(getSelectedGistDescription);
  const selectedGistFiles = useSelector(getSelectedGistFiles);
  const selectedGistFilesArray = useSelector(getSelectedGistFilesArray);
  const isAppLoading = useSelector(getIsAppLoading);
  const isAppError = useSelector(getIsAppError);
  const appMessage = useSelector(getAppMessage);
  const [isValidGist, setIsValidGist] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFileAdded, setIsFileAdded] = useState(false);
  const [description, setDescription] = useState<string | undefined>();
  const [filesMap, setFilesMap] = useState<{[key: string]: IContent | null}>({})
  const [groups, setGroups] = useState<ICreateGistLocalState>({
    public: true,
    files: [{
      filename: '',
      content: ''
    }]
  })
  const [setScrollPosition] = useScrollPosition();

  useEffect(() => {
    dispatch(resetSelectedGist())
  }, [])

  useEffect(() => {
    setIsValidGist(false)
    id && dispatch(fetchSingleGist(id))
  }, [id])

  useEffect(() => {
    if (!id || (selectedGistId=== id && !isAppError)) setIsValidGist(true);
    else setIsValidGist(false);
  }, [selectedGistId])

  useEffect(() => {
    setDescription(selectedGistDescription)
  }, [selectedGistDescription])

  useEffect(() => {
    if (id && selectedGistFilesArray.length > 0) {
      setGroups({
        ...groups,
        files: selectedGistFilesArray
      })
    }
  }, [selectedGistFilesArray])
  

  const handleFileChange = (filename: string, value: string, index: number) => {
    const newFiles = [...groups.files];
    newFiles[index][filename as keyof IContent] = value;
    setGroups(state => {
      const stateCopy = {
        ...state,
        files: newFiles
      };
      return stateCopy;
    });
  }

  const handleFileRemoval = (index: number) => {
    if (groups.files.length === 1) return;
    const newFiles = [...groups.files];
    const removed = newFiles.splice(index, 1).pop();
    if (removed?.name && selectedGistFiles && removed?.name in selectedGistFiles) {
      setFilesMap({
        ...filesMap,
        [removed.name]: null
      })
    }
    setGroups(state => {
      const stateCopy = {
        ...state,
        files: newFiles
      };
      return stateCopy;
    });
    setIsFileAdded(false)
  }

  const handleFileAddition = () => {
    const newFiles = [...groups.files];
    newFiles.push({
      filename: '',
      content: ''
    });
    setGroups(state => {
      const stateCopy = {
        ...state,
        files: newFiles
      };
      return stateCopy;
    });
    setIsFileAdded(true)
  }

  const validateForm = () => {
    if (!(groups.files.every(file => file.content))) {
      setErrorMessage("Contents can't be empty");
      return false;
    }
    if (!(isEverythingUnique(groups.files, 'filename'))) {
      setErrorMessage("Contents must have unique filenames");
      return false;
    }
    return true;
  }

  const handleGistAction = () => {
    if (validateForm()) {
      setIsError(false)
      setErrorMessage('')

      let filesObj: IFiles = {}
      for (const item of groups.files) {
        if (!item.filename) {
          item.filename = getRandomFileName();
        }
        const key = id && item.name ? item.name : item.filename
        filesObj[key] = { filename: item.filename, content: item.content };
      }

      const payload = {
        description,
        public: groups.public,
        files: { ...filesObj, ...filesMap }
      }
      if (id) {
        dispatch(updateGist({ payload, gistId: id })).then(() => navigate(`/gist/${id}`))  
      } else {
        dispatch(createGist(payload)).then(() => navigate('/my-gists'))
      }
    } else {
      isError ? setScrollPosition('alert', 'start') : setIsError(true)
    }
  }

  useEffect(() => {
    isError && setScrollPosition('alert', 'start')
  }, [isError])

  useEffect(() => {
    isFileAdded && setScrollPosition('add-file-btn', 'end')
  }, [isFileAdded, groups.files])


  return (
    <div className='h-full relative'>
      {isAppLoading && <Loader />}
      {isValidGist ?
        <div className='my-5 mx-10'>
          <div id="alert">
            {isError && errorMessage && 
              <Alert 
                message={errorMessage} 
                variant={ALERT_VARIANTS.ERROR}
                onClose={() => {
                  setIsError(false);
                  setErrorMessage('');
                }} 
              />
            }
          </div>
          <h2 className="text-lg font-bold mb-3">{`${id ? 'Edit' : 'Create'} Gist`}</h2>
          <input
            name="description"
            type="text"
            placeholder="Gist description..."
            className="input input-bordered w-full mb-10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {groups.files.map(({ filename, content }, index) => (
            <GistFile
              fileIndex={index}
              fileName={filename}
              content={content}
              showDeleteBtn={groups.files.length > 1}
              handleFileChange={handleFileChange}
              handleFileRemoval={handleFileRemoval}
            />
          ))}

          <div className='flex justify-between pb-10'>
            <button id='add-file-btn' type='button' className='btn btn-sm bg-blue-900 text-white border-none' onClick={handleFileAddition}>Add File</button>
            <button type='button' className='btn btn-sm bg-green-900 text-white border-none' onClick={handleGistAction}>{!id ? 'Create' : 'Update'}</button>
          </div>
        </div> :
        <div className="flex h-10 justify-center items-center">{appMessage}</div>
      }
    </div>
  )
}

export default GistForm