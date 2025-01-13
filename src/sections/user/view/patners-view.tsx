import { useEffect, useState } from 'react';
import UserService from 'src/services/user';
import { User } from 'src/services/user/user.dto';
import { UserView } from './user-view';

const PartnersView = () => {
  const [data, setData] = useState<User[]>();

  const init = async () => {
    const list = await UserService.list();
    console.log(list);
    setData(list);
  };

  useEffect(() => {
    init();
  }, []);

  return <UserView data={data} />;
};

export default PartnersView;
