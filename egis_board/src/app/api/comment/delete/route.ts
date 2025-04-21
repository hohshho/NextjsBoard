import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { commentId, postId } = await request.json();

    if (!commentId || !postId) {
      return NextResponse.json(
        { success: false, message: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // FormData 생성
    const formData = new FormData();
    formData.append("commentId", commentId.toString());
    formData.append("postId", postId.toString());

    // 백엔드 API 호출
    const response = await fetch(`http://localhost:8300/deleteComment`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("서버 응답 오류:", response.status);
      return NextResponse.json(
        { success: false, message: "댓글 삭제 실패" },
        { status: response.status }
      );
    }

    const responseText = await response.text();
    
    let responseData = { success: true };
    if (responseText && responseText.trim()) {
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.warn("JSON 파싱 실패, 기본값 사용:", e);
      }
    }

    return NextResponse.json({
      success: true,
      message: "댓글이 삭제되었습니다.",
      ...responseData
    });
  } catch (error) {
    console.error("댓글 삭제 오류:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}