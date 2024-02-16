import classNames from "classnames";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useState } from "react";
import { DeleteYear } from "./request";
import { IYear } from "../../types";

const YearCard = ({ year }: { year: number }) => {
    const { SetYears } = useActions();
    const { years } = useTypedSelector(state => state.home);

    const [isDisabled, SetDisabled] = useState<boolean>(false);

    const onCloseClick = () => {
        SetDisabled(true);
        DeleteYear(year);
        SetYears(years?.filter(y => y.yearOfManufacture !== year) as [IYear]);
        SetDisabled(false);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-6 bg-light rounded-3 border border-1 border-black shadow-small px-3 py-1 my-1">
                <div className="row">
                    <div className="col-9">
                        {
                            year
                        }
                    </div>
                    <div className="col-3 text-end">
                        <div className={classNames("btn p-0 m-0 border-0 align-text-top", isDisabled && "disable")} onClick={onCloseClick}>
                            <i className="fa fa-close text-danger" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YearCard;