import axios from 'axios'
import{ useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { getClientId, getRedirectUri } from '../store/selectors/app';
import { attemptLogin } from '../store/thunks/auth';

function LoginPage() {
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code');

  useEffect(() => {
    if (code) {
      dispatch(attemptLogin(code))
    }
  }, [])

  return (
    <div>
      Login Page
    </div>
  )
}

export default LoginPage