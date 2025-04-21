import EditForm from "@/app/component/editForm/editForm";
import Header from "@/app/component/header/header";

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const resolvedParams = await params;
  const postId = resolvedParams.postId;

  if (!postId) {
    return <div>ID가 제공되지 않았습니다.</div>;
  }

  const response = await fetch(`http://localhost:8300/api/edit/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`서버 응답 오류: ${response.status}`);
  }

  const responseText = await response.text();
  const data = JSON.parse(responseText);

  const postData = data.post;
  const fileListData = data.fileList;

  // 클라이언트 컴포넌트에 데이터 전달
  return;
  <>
    <Header active={"write"} />
    <EditForm postData={postData} fileListData={fileListData} postId={postId} />
    ;
  </>;
}
