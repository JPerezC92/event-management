interface PaginationProps {
    pages: number;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
}

export class Pagination implements PaginationProps {
    pages;
    currentPage;
    previousPage;
    nextPage;

    constructor(props: PaginationProps) {
        this.pages = props.pages;
        this.currentPage = props.currentPage;
        this.previousPage = props.previousPage;
        this.nextPage = props.nextPage;
    }

    static create(
        props: Pick<PaginationProps, 'pages' | 'currentPage'>,
    ): Pagination {
        const { pages, currentPage } = props;

        const previousPage = currentPage > 1 ? currentPage - 1 : null;
        const nextPage = currentPage < pages ? currentPage + 1 : null;

        return new Pagination({
            pages,
            currentPage,
            previousPage,
            nextPage,
        });
    }
}
