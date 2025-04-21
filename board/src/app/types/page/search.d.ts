interface SearchParamsType {
    keyword?: string;
  }
  
  interface SearchPageProps {
    searchParams: Promise<SearchParamsType>;
  }