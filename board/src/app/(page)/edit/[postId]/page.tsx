import EditForm from "@/app/(page)/edit/[postId]/_fragments/EditForm/EditForm";
import Header from "@/app/component/Header/Header";
import { serverGet } from "@/app/util/serverFetch";

export default async function Page({ params }: PageParams) {
  const resolvedParams = await params;
  const postId = resolvedParams.postId;

  if (!postId) {
    return <div>ID가 제공되지 않았습니다.</div>;
  }

  const { data, error } = await serverGet<any>(
    "http://localhost:8300/api/edit/" + postId
  );

  const postData = data.post;
  const fileListData = data.fileList;

  // 클라이언트 컴포넌트에 데이터 전달
  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2 className="mb-4">게시글 수정</h2>
        <EditForm
          postData={postData}
          fileListData={fileListData}
          postId={postId}
        />
      </div>
    </>
  );
}
