import { UUID } from "crypto";
import http from '../../../http_common';

export const DeleteCar = (carId: UUID) => {
    http.post<string>('car/delete-car', carId).then(x => {
    }, error => { });
}  