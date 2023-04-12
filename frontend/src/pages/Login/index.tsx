import{ useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { attemptLogin } from '../../store/thunks/auth';

function LoginPage() {
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code');

  useEffect(() => {
    if (code) {
      dispatch(attemptLogin(code))
    }
  }, [])

  return null
}

export default LoginPage