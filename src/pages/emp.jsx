import { Helmet } from 'react-helmet-async';
import { EmpView } from 'src/sections/empLeaderboard/view';

// ----------------------------------------------------------------------

export default function EmpLeaderboardPage() {
  return (
    <>
      <Helmet>
        <title> Employee | Minimal UI </title>
      </Helmet>

      <EmpView />
    </>
  );
}
