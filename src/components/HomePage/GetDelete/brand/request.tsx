import http from "../../../../http_common";

export const DeleteBrand = (name: string) => {
    http.post<string>("car/delete-brand", name);
} 