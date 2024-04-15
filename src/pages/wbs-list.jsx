import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { WBSView } from '../sections/wbs/view';

// ----------------------------------------------------------------------

export default function WBSPage() {
  // const { fetchUser } = useContext(AppContext);
  const { fileId } = useParams();
  const file = useSelector((state) => state.files.find((item) => item._id === fileId));
  return (
    <>
      <Helmet>
        <title> {file ? file.name : 'WBS List'} </title>
      </Helmet>

      <WBSView />
    </>
  );
}
