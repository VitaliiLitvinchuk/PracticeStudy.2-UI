import classNames from "classnames";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useState } from "react";
import { DeleteProperty } from "./request";
import { IPropery } from "../../types";
import { useNavigate } from "react-router-dom";

const YearCard = ({ property }: { property: IPropery }) => {
    const { SetProperties } = useActions();
    const { properties } = useTypedSelector(state => state.home);
    const navigate = useNavigate();
    const [isDisabled, SetDisabled] = useState<boolean>(false);

    const onCloseClick = () => {
        SetDisabled(true);
        DeleteProperty(property.name);
        SetProperties(properties?.filter(p => p.name !== property.name) as [IPropery]);
        SetDisabled(false);
    }

    const onEditClick = () => {
        SetDisabled(true);
        navigate(`/property?name=${property.name}&description=${property.description}`);
        SetDisabled(false);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-6 bg-light rounded-3 border border-1 border-black shadow-small px-3 py-1 my-1">
                <div className="row">
                    <div className="col-9">
                        <div className="row">
                            {
                                property.name
                            }
                        </div>
                        <div className="row">
                            {
                                property.description
                            }
                        </div>
                    </div>
                    <div className="col-3 text-end">
                        <div className={classNames("btn border-0 p-0 me-2", isDisabled && "disabled")} onClick={onEditClick}>
                            <i className="fa fa-edit text-warning"></i>
                        </div>
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