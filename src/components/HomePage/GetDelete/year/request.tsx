import http from "../../../../http_common";

export const DeleteYear = (year: number) => {
    http.post<string>("car/delete-year", year);
} 