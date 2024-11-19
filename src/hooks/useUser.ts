import { useContext } from 'react';
import { UserContext } from 'src/components/provider';

const useUser = () => {
  const data = useContext(UserContext);
  return data;
};

export default useUser;
