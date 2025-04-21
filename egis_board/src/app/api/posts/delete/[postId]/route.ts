import { NextRequest, NextResponse } from "next/server";

// 파일 위치: app/api/comment/delete/[postId]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    // params를 await로 처리
    const resolvedParams = await params;
    const postId = resolvedParams.postId;
    
    if (!postId) {
      return NextResponse.json(
        { success: false, message: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 백엔드 API 호출 (commentId 없이 postId만 사용)
    const response = await fetch(`http://localhost:8300/api/delete/${postId}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.error("서버 응답 오류:", response.status);
      NextResponse.redirect(new URL('/', request.url));
    }

    // 응답 텍스트로 받아서 안전하게 처리
    const responseText = await response.text();
    
    // 응답이 비어있지 않은 경우에만 JSON 파싱 시도
    let responseData = { success: true };
    if (responseText && responseText.trim()) {
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.warn("JSON 파싱 실패, 기본값 사용:", e);
      }
    }

    // return NextResponse.json({
    //   success: true,
    //   message: "삭제되었습니다.",
    //   redirectUrl: `/detail?id=${postId}`,
    // });
    // 루트 경로로 리디렉션
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error("삭제 오류:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
