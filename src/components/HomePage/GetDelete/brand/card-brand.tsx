import classNames from "classnames";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useState } from "react";
import { DeleteBrand } from "./request";
import { IBrand } from "../../types";

const BrandCard = ({ brandName }: { brandName: string }) => {
    const { SetBrands } = useActions();
    const { brands } = useTypedSelector(state => state.home);

    const [isDisabled, SetDisabled] = useState<boolean>(false);

    const onCloseClick = () => {
        SetDisabled(true);
        DeleteBrand(brandName);
        SetBrands(brands?.filter(b => b.name !== brandName) as [IBrand]);
        SetDisabled(false);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-6 bg-light rounded-3 border border-1 border-black shadow-small px-3 py-1 my-1">
                <div className="row">
                    <div className="col-9">
                        {
                            brandName
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

export default BrandCard;