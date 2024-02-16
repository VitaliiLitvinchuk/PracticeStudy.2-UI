import http from "../../../../http_common";

export const DeleteProperty = (name: string) => {
    http.post<string>("car/delete-property", name);
}
