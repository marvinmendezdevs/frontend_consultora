import { useState } from "react";

type UsePaginationType<T> = {
    data: T[] | [];
    perPage: number;
    fn: (item: T, searchTerm: string) => boolean;
}

type UsePaginationReturnType<T> = {
    handleSetSearchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void
    totalPage: number
    itemsPage: T[]
    setPage: React.Dispatch<React.SetStateAction<number>>
    page: number
}

export const usePagination = <T>({
    data,
    perPage,
    fn
}: UsePaginationType<T>): UsePaginationReturnType<T> => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSetSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(1);
    }

    const itemsFiltered = data.filter((item) => fn(item, searchTerm));

    const totalPage = Math.ceil(itemsFiltered.length / perPage)
    const pageStart = (page - 1) * perPage;
    const pageEnd = page * perPage;

    const itemsPage = itemsFiltered.slice(pageStart, pageEnd)

    return {
        handleSetSearchTerm,
        totalPage,
        itemsPage,
        setPage,
        page,
    };
}