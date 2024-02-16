import { useEffect } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import BrandCard from "./card-brand";

const BrandsPage = () => {
    const { GetBrands } = useActions();
    const { brands } = useTypedSelector(state => state.home);

    useEffect(() => {
        GetBrands();
    }, []);

    return (
        <div className="my-5 container">
            {
                brands?.map(brand => <BrandCard key={brand.name} brandName={brand.name} />)
            }
        </div>
    );
}

export default BrandsPage;