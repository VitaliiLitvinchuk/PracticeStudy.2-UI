import { useEffect } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import PropertyCard from "./card-property";

const PropertiesPage = () => {
    const { GetProperties } = useActions();
    const { properties } = useTypedSelector(state => state.home);

    useEffect(() => {
        GetProperties();
    }, []);

    return (
        <div className="my-5 container">
            {
                properties?.map(property => <PropertyCard key={property.name} property={property} />)
            }
        </div>
    );
}

export default PropertiesPage;