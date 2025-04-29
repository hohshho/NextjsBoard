interface FetchResult<T> {
  data: T | null;
  error: string | null;
}

function buildFullUrl(url: string): string {
  const isAbsolute = /^https?:\/\//.test(url); // http:// 또는 https://로 시작하는지 체크
  if (isAbsolute) {
    return url;
  }
  return new URL(
    url,
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"
  ).toString();
}

export async function serverGet<T>(
  url: string,
  queryParams?: Record<string, any>
): Promise<FetchResult<T>> {
  try {
    const fullUrl = new URL(buildFullUrl(url));

    if (queryParams) {
      Object.keys(queryParams).forEach(key =>
        fullUrl.searchParams.append(key, queryParams[key])
      );
    }

    const res = await fetch(fullUrl.toString(), { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return { data: json, error: null };
  } catch (err: any) {
    return { data: null, error: err.message };
  }
}

export async function serverPostJson<T>(
  url: string,
  body: any
): Promise<FetchResult<T>> {
  try {
    const fullUrl = buildFullUrl(url);

    const res = await fetch(fullUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return { data: json, error: null };
  } catch (err: any) {
    return { data: null, error: err.message };
  }
}

export async function serverPostForm<T>(
  url: string,
  formData: FormData
): Promise<FetchResult<T>> {
  try {
    const fullUrl = buildFullUrl(url);

    const res = await fetch(fullUrl, {
      method: "POST",
      body: formData,
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return { data: json, error: null };
  } catch (err: any) {
    return { data: null, error: err.message };
  }
}

// 예시

// 1. get
// const { data, error } = await serverGet<any>("/api/hello", { search: "test" });

// 2. form data
// const formData = new FormData();
// formData.append("username", "CodeGPT");
// formData.append("role", "developer");

// const { data, error } = await serverPostForm<any>("/api/upload", formData);

// 3. json
// const body = { username: "CodeGPT", role: "developer" };
// const { data, error } = await serverPostJson<any>("/api/save", body);
