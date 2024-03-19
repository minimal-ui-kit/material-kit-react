import { Helmet } from 'react-helmet-async';

import { EmployeeView } from 'src/sections/employee/view';

// ----------------------------------------------------------------------

export default function EmployeePage() {
    return (
        <>
            <Helmet>
                <title> Employee | Minimal UI </title>
            </Helmet>

            <EmployeeView />
        </>
    );
}