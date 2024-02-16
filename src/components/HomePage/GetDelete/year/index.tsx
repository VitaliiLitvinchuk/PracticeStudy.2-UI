import { useEffect } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import YearCard from "./card-year";

const YearsPage = () => {
    const { GetYears } = useActions();
    const { years } = useTypedSelector(state => state.home);

    useEffect(() => {
        GetYears();
    }, []);

    return (
        <div className="my-5 container">
            {
                years?.map(year => <YearCard key={year.yearOfManufacture} year={year.yearOfManufacture} />)
            }
        </div>
    );
}

export default YearsPage;