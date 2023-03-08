import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { getAppPage, getGists } from "../store/selectors/app";
import { getToken } from "../store/selectors/auth";
import { fetchGists } from "../store/thunks/app";
import { GIST_TYPE } from "../types/common";
import Table from "./common/Table";

function HomePage() {
  const dispatch = useAppDispatch();
  const gists = useSelector(getGists);
  const token = useSelector(getToken);
  const page = useSelector(getAppPage);

  useEffect(() => {
    dispatch(fetchGists({ gistType: GIST_TYPE.PUBLIC, page }))  
  }, [token, page])
  
  return (
    <>
      <Table />
    </>
  )
}

export default HomePage