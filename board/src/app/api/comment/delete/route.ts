import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 클라이언트로부터 받은 JSON 데이터
    const body = await request.json();
    const { commentId, postId } = body;
    
    if (!postId) {
      return NextResponse.json(
        { success: false, message: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // FormData 객체 생성 (Spring의 @RequestParam으로 받기 위해)
    const formData = new FormData();
    formData.append("commentId", commentId.toString());
    formData.append("postId", postId.toString());

    // 백엔드 API 호출
    const response = await fetch(`http://localhost:8300/deleteComment`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      console.error("서버 응답 오류:", response.status);
      return NextResponse.json(
        { success: false, message: "댓글 삭제 실패" },
        { status: response.status }
      );
    }

    // 응답 텍스트로 받아서 안전하게 처리
    const responseText = await response.text();
    
    // 응답이 비어있지 않은 경우에만 JSON 파싱 시도
    let responseData = { success: true, redirectUrl: `/detail?id=${postId}` };
    if (responseText && responseText.trim()) {
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.warn("JSON 파싱 실패, 기본값 사용:", e);
      }
    }

    // 백엔드에서 받은 redirectUrl로 리다이렉트
    if (responseData.redirectUrl) {
      return NextResponse.redirect(new URL(responseData.redirectUrl, request.url));
    }
    
    // redirectUrl이 없는 경우 성공 응답 반환
    return NextResponse.json({
      success: true,
      message: "댓글이 삭제되었습니다."
    });
  } catch (error) {
    console.error("댓글 삭제 오류:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}