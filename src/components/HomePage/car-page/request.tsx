import { UUID } from "crypto";
import http from "../../../http_common"

export const DeletePhoto = (name: string) => {
    http.post<string>("car/delete-photo", name);
}

export const DeleteCharacteristic = (id: UUID) => {
    http.post<string>("car/delete-characteristic", id);
}