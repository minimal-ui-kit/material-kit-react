import { useContext, useEffect, useState } from 'react';
import { UserContext } from 'src/components/provider';

const useUser = () => {
  const data = useContext(UserContext);
  const [userContext, setUserContext] = useState(data);

  useEffect(() => {
    setUserContext(data);
  }, [data]);

  return userContext;
};

export default useUser;
