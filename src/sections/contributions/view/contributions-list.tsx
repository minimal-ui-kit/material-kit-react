import { useCallback, useEffect, useRef, useState } from 'react';
import useAdmin from 'src/hooks/useAdmin';
import useUser from 'src/hooks/useUser';
import ContributionService from 'src/services/cont';
import { Contribution, ContributionStatus } from 'src/services/cont/contribute.dto';
import { ContributionProps } from '../contributions-table-row';
import { ContributionsView } from './contributions-view';

const ContributionsList = () => {
  const [data, setData] = useState<ContributionProps[]>();
  const [loading, setLoading] = useState(false);
  const { isAdminMode } = useAdmin();
  const { user } = useUser();

  const pageRef = useRef(new Map<number, string>());

  const getStatus = (status: ContributionStatus): ContributionProps['status'] => {
    if (status === ContributionStatus.Failed) return 'failed';
    if (status === ContributionStatus.Pending) return 'pending';
    return 'success';
  };

  const getContributions = useCallback(
    (result: Contribution[]): ContributionProps[] =>
      result.map((item) => ({
        amount: item.amount,
        id: item.id,
        months: item.months,
        sender: item.donor,
        status: getStatus(item.status),
        timestamp: (item.completedAt || item.createdAt).toDate(),
      })),
    []
  );

  const init = useCallback(async () => {
    setLoading(true);
    const promise = isAdminMode
      ? ContributionService.getList({ count: 20, page: 1 })
      : ContributionService.getByUserId(user?.id!, 20);
    const res = await promise;

    // TODO: Implement pagination
    // pageRef.current.set(res.metadata.page, res.data[res.data.length - 1].id);

    const result = 'metadata' in res ? res.data : res;
    const contributions = getContributions(result);
    setData(contributions);
    setLoading(false);
  }, [getContributions, isAdminMode, user?.id]);

  useEffect(() => {
    init();
  }, [init]);

  return <ContributionsView loading={loading} data={data} noMultiSelect noPagination />;
};

export default ContributionsList;
